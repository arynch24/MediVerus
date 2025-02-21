
class NewsCollector:
    def __init__(self, url ,api_key):
        self.url = url
        self.api_key = api_key
        
    def collect_news(self):
        params = {
            "apiKey": API_KEY,
            "country": "us",
            "category": "general",
            "pageSize": 100
        }