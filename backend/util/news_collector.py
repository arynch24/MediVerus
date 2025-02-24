import requests
from . import scrape_article_content as sac
import pandas as pd
import os
from pathlib import Path
from backend import settings   # uncomment it when running from server


class NewsCollector:
    def __init__(self, url, api_key):
        self.url = url
        self.api_key = api_key
        
    def collect_news(self):
        print("collecting news....")
        
        ALLOWED_DOMAINS = [
            'reuters.com',
            'apnews.com',
            'bloomberg.com',
            'bbc.co.uk',
            'theguardian.com'
        ]
        params = {
            'apiKey': self.api_key,
            'domains': ','.join(ALLOWED_DOMAINS),
            'sortBy': 'popularity',
            'pageSize': 100,
        }
        
        response = requests.get(self.url, params=params)
        articles = response.json().get('articles', [])
        valid_urls = []

        for article in articles:
            url = article["url"].lower()  # Use article instead of articles
            if 'video' not in url and 'audio' not in url and '/programmes/' not in url:
                valid_urls.append(url)
                
                
        all_articles = {
            "text": [],
            "label": []
        }
        
        for url in valid_urls:
            try:
                content = sac.scrape_article_content(url)
                if content != "":
                    all_articles["text"].append(content)
                    all_articles["label"].append(0)
            except Exception as e:
                print(f"Error occured while scraping {str(e)}")
                
        df = pd.DataFrame(data=all_articles)
        print("News collecting done!")
        return pd.DataFrame(data=all_articles)


    def dataframe_to_csv(self, df, filename = "new_data.csv"):
        # BASE_DIR = Path(__file__).resolve().parent.parent
        BASE_DIR = settings.BASE_DIR
        filepath = os.path.join(BASE_DIR, 'data', filename)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        df.to_csv(filepath, index=False)
        print("Dataframe saved as csv at ./data")
        return filepath        
    
