from django.shortcuts import render
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view
from journal.models import User
from django.contrib.auth.hashers import make_password
from journal.serializer import UserSerializer


# Create your views here.
def home(request):
    # return Response({'info': 'Journal Home'}, status=200)
    return JsonResponse({"error":"User does not exist, please register with google first!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

# Sign Up
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        phone_number = request.data.get('phone_number')
        picture = request.data.get('picture')
        email = request.data.get('email')
        password = make_password( request.data.get('password') )
        
        email_exists = User.objects.filter(email=email).exists()
        username_exists = User.objects.filter(username=username).exists()
        if email_exists:
            return JsonResponse({"error": "Email is already in use"}, status=status.HTTP_400_BAD_REQUEST)
        
        elif username_exists:
            return JsonResponse({"error": "Username is already in use"}, status=status.HTTP_400_BAD_REQUEST)
       
 
        if not username or not email or not password:
            return JsonResponse({"error": "Please provide all fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(username=username,phone_number=phone_number,picture=picture,  email=email, password=password)
        user.save()
        return JsonResponse({"success":"User Created Successfully"}, status=status.HTTP_201_CREATED)
