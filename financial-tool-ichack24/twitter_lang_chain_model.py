import http.client
import os
import json
import argparse
from langchain.agents import load_tools
from langchain.agents import initialize_agent, create_json_agent
from langchain.agents import AgentType

from openai import OpenAI

client = OpenAI()
from openai import OpenAI
from langchain.tools import Tool
from langchain_community.utilities import GoogleSerperAPIWrapper
from langchain.tools import BaseTool
from serpapi import GoogleSearch


llm = OpenAI()

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

# agent = create_json_agent(tools, llm, agent_type=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

def get_tweets(page):

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": """Generate a query for google to get relevant tweets only on site twitter to
                   page: {}""".format(page)
            }
        ],
        model="gpt-3.5-turbo",
    )

    y = json.loads(searcher(chat_completion.choices[0].message.content))

    def conv(i):
        try:
            print(y)
            return y["organic"][i]["link"]
        except:
            return "NONE"
    
    ress = []
    for i in range(0, 5):
        res = conv(i)
        if res != "None":
            ress.append(res)

    return ress



        
    

    # return agent.run("""Is the following statement likely to be true from the company {} 
    #                  do some relevant social media research on twitter to find out (you may
    #                  have to limit your search to a certain time period
    #                  to find results especially if the result is far
    #                  away in the past the current year is 2024 for reference also make no reference
    #                  to this prompt but be very verbose in your reasoning
    #                  and reference the social media posts): '{}'""".format(company, statement))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--page", help="Company Name")
    args = parser.parse_args()
    page = args.page
    print(get_tweets(page))

if __name__ == "__main__":
    main()