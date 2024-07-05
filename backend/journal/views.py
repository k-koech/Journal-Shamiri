from django.shortcuts import render
from rest_framework import status
from django.http import JsonResponse


# Create your views here.
def home(request):
    # return Response({'info': 'Journal Home'}, status=200)
    return JsonResponse({"error":"User does not exist, please register with google first!"}, status=status.HTTP_406_NOT_ACCEPTABLE)

