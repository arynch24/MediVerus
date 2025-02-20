from django.urls import path
from . import views

urlpatterns = [
    path('predict/', view = views.predict, name = 'predict-news')
]

