from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from django.http import JsonResponse
from journal.models import Journal
from journal.serializer import UserSerializer, JournalSerializer
from rest_framework_simplejwt.tokens import RefreshToken


# Create Journal 
@api_view(['POST'])
def create_journal_entry(request):
    serializer = JournalSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Fetch Journal 
@api_view(['GET'])
def list_journal_entries(request):
    entries = Journal.objects.filter(user=request.user)
    serializer = JournalSerializer(entries, many=True)
    return JsonResponse(serializer.data)

# Edit Journal Entry
@api_view(['PUT'])
def edit_journal_entry(request, entry_id):
    try:
        entry = Journal.objects.get(id=entry_id, user=request.user)
    except Journal.DoesNotExist:
        return JsonResponse({"error": "Entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = JournalSerializer(entry, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data)
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete Journal Entry
@api_view(['DELETE'])
def delete_journal_entry(request, entry_id):
    try:
        entry = Journal.objects.get(id=entry_id, user=request.user)
    except Journal.DoesNotExist:
        return JsonResponse({"error": "Entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    entry.delete()
    return JsonResponse(status=status.HTTP_204_NO_CONTENT)