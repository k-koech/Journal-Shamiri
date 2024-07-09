from django.shortcuts import render
from rest_framework import status
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from journal.models import User
from django.contrib.auth.hashers import make_password
from journal.serializer import UserSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import os

# Sign Up
@api_view(['POST'])
def signup(request):
    if request.method == 'POST':
        username = request.data.get('username')
        name = request.data.get('name')
        picture = request.data.get('picture')
        email = request.data.get('email')
        password = make_password( request.data.get('password') )
        print(username, name, picture, email, password)

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
            user = User.objects.create(username=username,name=name,picture=picture,  email=email, password=password)
            user.save()
            return JsonResponse({"success":"User Created Successfully"}, status=status.HTTP_201_CREATED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Current User
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return JsonResponse(serializer.data)

# Logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.views import APIView




class CustomLogoutView(APIView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        access_token = request.headers.get('Authorization', None)
        
        if access_token:
            access_token = access_token.split(' ')[1]  # Extract the token from the "Bearer <token>" format
        
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()  # Blacklist the refresh token
            except TokenError as e:
                return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        if access_token:
            try:
                token = RefreshToken(access_token)
                token.blacklist() 
            except TokenError as e:
                return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return JsonResponse({"error": "Successfully logged out"}, status=status.HTTP_205_RESET_CONTENT)




# Update User
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def update_user(request):
    user_id = request.user.id
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    if user.id != user_id:
        return JsonResponse({"error": "You do not have permission to update this account"}, status=status.HTTP_403_FORBIDDEN)
        
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        if 'oldPassword' in request.data and 'password' in request.data:
            old_password = request.data['oldPassword']
            new_password = request.data['password']
            if user.check_password(old_password):
                user.password = make_password(new_password)
            else:
                return JsonResponse({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)
  
        if 'username' in request.data:
            user.username = request.data['username']

        if 'name' in request.data:
            user.name = request.data['name']

        if 'picture' in request.data and request.data['picture']:
            # Update picture
            old_picture = user.picture            
            user.picture = request.data['picture']

            if old_picture:
                old_image_path = old_picture.path
                if os.path.exists(old_image_path):
                    os.remove(old_image_path)
                    # Check if the folder is now empty and remove it if so
                    folder_path = os.path.dirname(old_image_path)
                    if not os.listdir(folder_path):  # Folder is empty
                        os.rmdir(folder_path)
        user.save()
        return JsonResponse({"success": "User Updated Successfully"}, status=status.HTTP_200_OK)
    
    return JsonResponse({"error": "Error updating"}, status=status.HTTP_400_BAD_REQUEST)

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
    return JsonResponse({"success":"Deleted successfully"},status=200)