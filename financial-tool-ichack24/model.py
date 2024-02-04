import time
import requests

class Model:
    def __init__(self):
        time.sleep(10)
        self.API_URL = "https://api-inference.huggingface.co/models/DillanScott/ichack24-sentiment-analysis"
        self.headers = {"Authorization": "Bearer "}

    def query(self, payload):
        response = requests.post(self.API_URL, headers=self.headers, json=payload)
        return response.json()
    
    #LABEL_0 is negative
    #LABEL_2 is positive
    def run_model(self, sentences):
        output = self.query({"inputs": sentences})
        scores = []
        for (line, out) in zip(sentences, output):
            # Take dictionary with highest score
            out = out[0]
            #print(out)
            label = out['label']
            val = {"text": line}
            if label == 'LABEL_0':
                val["score"] = -out['score']
            elif label == 'LABEL_1':
                val["score"] = 0
            elif label == 'LABEL_2':
                val["score"] = out['score']
            scores.append(val)
        
        return scores


if __name__ == "__main__":
    model = Model()
    sentences = ["While the external environment remains challenging in the near-term, I am confident that our strategy, our people and our product offering will create long-term growth and value for our stakeholders",
            "In the fourth quarter of 2009 , Orion 's net profit went down by 33.8 % year-on-year to EUR33m .",
            "During the first five months of the year, Saga has made good progress in what has been a particularly challenging external environment and we are pleased that we are on-track to return to an underlying profit for the 2022/23 financial year",
            "At our full year results, in March, we set out an evolution of our strategic approach, to convert the foundations laid over the past two years into sustainable growth."]

    output = model.run_model(sentences)
    print(output)