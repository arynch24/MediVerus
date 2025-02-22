# collect news -> df to csv 
import os
from util.news_collector import NewsCollector
from util.model_trainer import ModelTrainer
from datetime import datetime
import logging
from dotenv import load_dotenv
load_dotenv()
from backend import settings
from apscheduler.schedulers.background import BackgroundScheduler

logger = logging.getLogger("cron")

def start_scheduler():
    """Starts the APScheduler background job"""
    
    if os.environ.get("RUN_MAIN") != "true":  # Avoid duplicate schedulers
        return
    
    scheduler = BackgroundScheduler()
    scheduler.add_job(retrain_model, "cron", hour=7, minute=00)
    scheduler.start()
    logger.info("Scheduler started successfully")
    

def retrain_model():
    """Cron job to retrain the model"""
    
    try:
        start_time = datetime.now()
        logger.info(f"Starting model retraining at {start_time}")
        
        # Collect new news data
        collector = NewsCollector(os.getenv("URL"), os.getenv("API_KEY"))
        new_data = collector.collect_news()
        data_path = collector.dataframe_to_csv(new_data)
        
        # Retrain the model
        trainer = ModelTrainer()
        trainer.train_model(data_path)
            
            
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds() / 60
        
        logger.info(f"Model retraining completed. Duration: {duration:.2f} minutes")        
        
        cleanup_data_directory()
        logger.info("Cleanup completed successfully")
        return True
        
    except Exception as e:
        logger.error(f"Error in model retraining: {str(e)}")
        return False
    
    
def cleanup_data_directory():
    """Clean up the data directory by removing CSV files"""
    try:
        BASE_DIR = settings.BASE_DIR
        data_dir = os.path.join(BASE_DIR, 'data')
        if os.path.exists(data_dir):    
            # Remove all CSV files in the directory
            for file in os.listdir(data_dir):
                if file.endswith('.csv'):
                    file_path = os.path.join(data_dir, file)
                    os.remove(file_path)
                    logger.info(f"Deleted file: {file_path}")
    except Exception as e:
        logger.error(f"Error during cleanup: {str(e)}")