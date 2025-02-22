from django.apps import AppConfig
import threading  # ✅ Ensures APScheduler runs on a separate thread
from backend.cron import start_scheduler
import os

class BackendConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "backend"

    def ready(self):
        if os.environ.get('RUN_MAIN') != 'true':
            return
        """Start the scheduler in a separate thread when Django starts"""
        if not hasattr(self, 'scheduler_started'):  # Prevent duplicate start
            self.scheduler_started = True
            thread = threading.Thread(target=start_scheduler, daemon=True)
            thread.start()
