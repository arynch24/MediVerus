from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pickle as pkl
from util.process_text import process_text

# Open model
with open('backend/model.pkl', 'rb') as file:
    model = pkl.load(file)


# Create your views here.
@api_view(["POST"])
def predict(request):
    try:
        input_data = request.data.get("input")
        if input_data is None:
                return Response(
                    {"error": "Input is required"}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
        if not isinstance(input_data, str) or input_data.strip() == "":
                return Response(
                    {"error": "Invalid input format"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
        try:
            vectorized_input_data = process_text(input_data)
        except ValueError as e:
                return Response(
                    {"error": str(e)},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        try:
            prediction = model.predict(vectorized_input_data)
        except Exception as e:
                return Response(
                    {"error": f"Model prediction error: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        
        
        return Response({
                "input_data": input_data, 
                "isFakeNews": prediction[0]
            }, status = status.HTTP_200_OK)
        
    except Exception as e:
        return Response(
            {"error": f"Unexpected error: {str(e)}"},
            status = status.HTTP_500_INTERNAL_SERVER_ERROR
        )