import re

class OutputPage:
    def __init__(self, highlighted_sentences, text, further_links = []):
        self.highlighted_sentences = highlighted_sentences
        self.text = text
        self.further_links = further_links
    
    def highlightSentence(self, sentence, line):
        line_insensitive = re.compile(re.escape(sentence), re.IGNORECASE)
        return line_insensitive.sub("<span style=\"background-color: #FFFF00\">" + sentence + "</span>", line)
        #return line.replace(sentence, "<span style=\"background-color: #FFFF00\">" + sentence + "</span>")
    
    def createHTMLPage(self):
        html = "<html><head><title>Output</title></head><body>"
        for line in self.text:
            for sentence in self.highlighted_sentences:
                if sentence.lower() in line.lower():
                    line = self.highlightSentence(sentence, line)
            html += "<p>" + line + "</p>"       

        html += "<br>"
        html += "<h2>Further Sources</h2>"
        for link in self.further_links:
            html += "<a href=\"" + link + "\">" + link + "</a><br>"
        html += "</body></html>"

        return html

    def saveHTMLPage(self, filename):
        with open(filename, "w") as file:
            file.write(self.createHTMLPage())
        print("Output saved to " + filename)
    

if __name__ == "__main__":
    highlighted_sentences = {"This is a highlighted sentence.": "This is an explanation for the highlighted sentence.", "This is an explanation for the highlighted sentence.": "This is a further link."}
    
    # make a big text example
    text = [
    "This is a highlighted sentence. And this is an explanation for the highlighted sentence. This is not a highlighted sentence.",
    "This is not a highlighted sentence.",
    "This is a highlighted sentence.",
    "This is not a highlighted sentence.",
    "This is a highlighted sentence.",
    ]

    further_links = ["www.google.com", "www.wikipedia.com"]
    output = OutputPage(highlighted_sentences, text, further_links)
    # save in download folder
    output.saveHTMLPage("./output2.html")

