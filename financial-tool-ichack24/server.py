from flask import Flask, render_template, request, redirect, url_for
import re
from OutputPage import *
from model import *
from lang_chain_model import *
import os
from urlConverter import *
import time
from twitter_lang_chain_model import get_tweets
from flask_cors import CORS


port = int(os.environ.get("PORT", 5000))

app = Flask(__name__)

CORS(app, origins="*")

path = "files/file.txt"
model = Model()

@app.route('/', methods=["GET"])
def upload_file():
   return render_template('link.html')

@app.route('/', methods=["POST"])
def download_file():
    f = request.form['url']
    (company, text) = get_text_from_url(f)
    time.sleep(1)
    return {"sentences" : run_model(text), "company" : company}

@app.route('/explain', methods=["GET"])
def explain_get():
    return render_template("explain.html")

@app.route('/explain', methods=["POST"])
def explain():
    sentence = request.form['sentence']
    name = request.form['name']

    explanation, links = get_gpt_opinion(name, sentence)
    return {"explanation": explanation, "links": links}

@app.route('/tweets', methods=["POST"])
def tweets():
    page = request.form['page']

    tweets = get_tweets(page)
    return {"tweets": tweets}
        

def formatFile(data):
    sentences = []
    curr = ""

    for word in data.split(" "):
        if word.endswith("\n") or word.endswith("."):
            curr += word
            sentences.append(curr)
            curr = ""
        else:
            curr += word + " "

    return sentences

def run_model(path):
    sentences = formatFile(path)
    # this produces a list of most important sentences
    model_lines = model.run_model(sentences)
    print(model_lines)
    return model_lines

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port, debug=True)
