from django.shortcuts import render
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from journal.models import User
from django.contrib.auth.hashers import make_password
from journal.serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

# Create your views here.
def home(request):
    # return JsonResponse({'info': 'Journal Home'}, status=200)
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
        print(username, phone_number, picture, email, password)

        email_exists = User.objects.filter(email=email).exists()
        username_exists = User.objects.filter(username=username).exists()
        if email_exists:
            return JsonResponse({"error": "Email is already in use"}, status=status.HTTP_400_BAD_REQUEST)
        
        if username_exists:
            return JsonResponse({"error": "Username is already in use"}, status=status.HTTP_400_BAD_REQUEST)
       
 
        if not username or not email or not password:
            return JsonResponse({"error": "Please provide all fields"}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create(username=username,phone_number=phone_number,picture=picture,  email=email, password=password)
            user.save()
            return JsonResponse({"success":"User Created Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# Update User
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def update_user(request):
    user_id = request.user.id
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Delete User
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])  # Ensure that only authenticated users can delete their own account
def delete_user(request):
    user_id = request.user.id
    if request.user.id != user_id:
        return JsonResponse({"error": "You do not have permission to delete this account"}, status=status.HTTP_403_FORBIDDEN)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    user.delete()
    return JsonResponse(status=status.HTTP_204_NO_CONTENT)