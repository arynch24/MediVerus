# Necessary imports
import re
import nltk
import pickle
nltk.download('stopwords')
nltk.download('wordnet') 
nltk.download('punkt') 
nltk.download('punkt_tab')
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
stpwrds = list(stopwords.words('english'))

with open('backend/vector.pkl', 'rb') as file:
    tfidf_v = pickle.load(file)
    
def process_text(news):
    review = news
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    review = nltk.word_tokenize(review)
    corpus = []
    lemmatizer = WordNetLemmatizer()
    for y in review :
        if y not in stpwrds :
            corpus.append(lemmatizer.lemmatize(y))
    input_data = [' '.join(corpus)]
    vectorized_input_data = tfidf_v.transform(input_data)
    return vectorized_input_data
    
    
def process_text_for_retraining(news):
    if isinstance(news, list):
        review = ' '.join(map(str, news))
    else:
        review = str(news)  # Convert to string to handle any other type
        
    review = re.sub(r'[^a-zA-Z\s]', '', review)
    review = review.lower()
    review = nltk.word_tokenize(review)
    corpus = []
    lemmatizer = WordNetLemmatizer()
    for y in review:
        if y not in stpwrds:
            corpus.append(lemmatizer.lemmatize(y))
    return ' '.join(corpus)
    
