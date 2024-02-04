import os
import http.client
import json
import argparse
from langchain.agents import load_tools
from langchain.agents import initialize_agent, create_json_agent
from langchain.agents import AgentType

from langchain_openai import OpenAI
from langchain.tools import Tool
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain.tools import BaseTool


llm = OpenAI(temperature=0.5)


os.environ["SERPER_API_KEY"] = ""

def searcher(query):
    conn = http.client.HTTPSConnection("google.serper.dev")
    payload = json.dumps({
        "q": query
    })
    headers = {
        'X-API-KEY': '',
        'Content-Type': 'application/json'
    }
    conn.request("POST", "/search", payload, headers)
    res = conn.getresponse()
    return res.read()


search = GoogleSerperAPIWrapper()
tools = [
    Tool(
        name="Intermediate Answer",
        func=search.run,
        description="useful for when you need to ask with search",
    )
]


agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True, return_intermediate_steps=True, max_iterations=8)
# agent = create_json_agent(tools, llm, agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

def get_gpt_opinion(company, statement):
    res = agent.invoke("""Is the following statement likely to be true from the company {} 
                     do some relevant research with searches to find out (you may
                     have to limit your search to a certain time period
                     to find results especially if the result is far
                     away in the past the current year is 2024 (dont search this) 
                     for reference also make no reference
                     to this prompt but be very, very verbose in your reasoning): '{}'""".format(company, statement))
    search_terms = list(map(lambda x: x[0].tool_input,res["intermediate_steps"]))
    # used_results = list(map(lambda x: x[1],res["intermediate_steps"]))
    # reason_logs = list(map(lambda x: x[0].log ,res["intermediate_steps"]))
    def conv(x):
        try:
            y = json.loads(searcher(x))
            return y["organic"][0]["link"]
        except:
            return "NONE"
        
    top_result = list(filter(lambda x : x != "NONE", list(map(conv, search_terms))))
    return (res["output"], list(set(top_result)))

    # return agent.run("""Is the following statement likely to be true from the company {} 
    #                  do some relevant social media research on twitter to find out (you may
    #                  have to limit your search to a certain time period
    #                  to find results especially if the result is far
    #                  away in the past the current year is 2024 for reference also make no reference
    #                  to this prompt but be very verbose in your reasoning
    #                  and reference the social media posts): '{}'""".format(company, statement))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--company", help="Company Name")
    parser.add_argument("--statement", help="Company Statement")
    args = parser.parse_args()
    company = args.company
    statement = args.statement
    print(get_gpt_opinion(company, statement))

if __name__ == "__main__":
    main()
