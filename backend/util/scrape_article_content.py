import requests
from bs4 import BeautifulSoup

def scrape_article_content(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Raises HTTPError for bad responses (4xx, 5xx)

        soup = BeautifulSoup(response.content, 'html.parser')
        # Extracting text from common article tags
        paragraphs = soup.find_all('p')
            
        content = ' '.join([para.get_text() for para in paragraphs])

        return content.strip() if content else ""
    
    except requests.exceptions.RequestException as e:
        return f"Error fetching article: {e}"
