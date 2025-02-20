from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pickle as pkl
from util.process_text import process_text

# Open model
with open('backend/model.pkl', 'rb') as file:
    model = pkl.load(file)


# Create your views here.
@api_view(["POST"])
def predict(request):
    
    input_data = request.data.get("input")
    print(input_data)
    vectorized_input_data = process_text(input_data)
    prediction = model.predict(vectorized_input_data)
    
    
    return Response({
        "input_data": input_data, 
        "isFakeNews": prediction[0]
    })
