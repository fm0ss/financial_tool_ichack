import os
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def get_company(page):
    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": """Say the company which is the topic of this page and only this give no reference to the content following this and only return 1 answer of the company name""" + page,
            }
        ],
        model="gpt-3.5-turbo",
    )

    return chat_completion.choices[0].message.content

