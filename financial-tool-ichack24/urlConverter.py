import requests
from bs4 import BeautifulSoup
import re
import get_name_of_company

def url_to_api_url(url):
    return f'https://api.londonstockexchange.com/api/v1/pages?path=news-article&parameters=newsId%3D{url.split("/")[-1]}'

# def get_name(text):
#     pattern = r'RNS Number : \d+[A-Z]?\s+([A-Z][A-Za-z&.]+(?: [A-Z][A-Za-z&.]+)*)\b(?=\s*\d{1,4}(?:\s*[A-Za-z]+){0,2})'
#     matches = re.findall(pattern, text)
#     return matches[0]


def get_name(text):
    return get_name_of_company.get_company(text)

def get_text_from_url(url):
    url = url_to_api_url(url)

    r = requests.get(url)

    # Check if the request was successful (status code 200)
    if r.status_code == 200:
        try:
            # Parse the JSON response
            json_data = r.json()

            # Access the desired nested structure to get the 'body' value
            html = json_data.get('components', [])[1].get('content', [])[0].get('value', {}).get('body', '')

            if html:
                # Parse the HTML content using BeautifulSoup
                soup = BeautifulSoup(html, 'html.parser')

                # Remove all <table> tags from the soup
                for table in soup.find_all('table'):
                    table.extract()

                # Find all text content within the HTML
                all_text = soup.get_text()
                #all_text = re.sub(r'\W+', ' ', soup.get_text())

                return (get_name(all_text.strip()), all_text)
            else:
                print("No 'body' key found in the JSON structure.")
        except ValueError as e:
            print("Error decoding JSON:", e)
    else:
        print(f"Failed to fetch the page. Status code: {r.status_code}")

    return ("", "")


#print(get_text_from_url('https://www.londonstockexchange.com/news-article/OCDO/trading-statement/15467668'))
