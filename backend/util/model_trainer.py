import os
import pickle
from pathlib import Path
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import PassiveAggressiveClassifier
from .process_text import process_text_for_retraining
from backend import settings


# BASE_DIR = Path(__file__).resolve().parent.parent
BASE_DIR = settings.BASE_DIR
class ModelTrainer:
    def __init__(self):
        self.model_path = os.path.join(BASE_DIR, 'backend', 'model.pkl')
        self.vector_path = os.path.join(BASE_DIR, 'backend', 'vector.pkl')

    def load_existing_model(self):
        try:
            # Open model
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
                
            # Open vectorizer
            with open(self.vector_path, 'rb') as f:
                self.vectorizer = pickle.load(f)
                
            print("Loaded existing model....")
            return True
    
        except Exception as e:
            print(f"Error loading existing model: {str(e)}")
            return False
        
    def train_model(self, new_data_path, retrain_full=False):
        """Train/retrain the model with new data"""
        
        try:
            print("Re training of model started..")
            # Load new data
            new_data = pd.read_csv(new_data_path)
            
            
            # Preprocess the text
            new_data['text'] = new_data['text'].apply(process_text_for_retraining)
            
            if retrain_full or not self.load_existing_model():
                # Train new model from scratch
                self.vectorizer = TfidfVectorizer()
                X = self.vectorizer.fit_transform(new_data['text'])
                self.model = PassiveAggressiveClassifier()
            else:
                # Update existing model with new data
                X = self.vectorizer.transform(new_data['text'])
                
            # Train the model
            self.model.partial_fit(X, new_data['label'], classes=[0, 1])
            print("Model training completed")
            
            # Save updated model and vectorizer
            with open(self.model_path, 'wb') as f:
                pickle.dump(self.model, f)
            with open(self.vector_path, 'wb') as f:
                pickle.dump(self.vectorizer, f)
                
            print("Saved model successfully")
            return True
        
        except Exception as e:
            print(f"Model training failed {str(e)}")
            return False