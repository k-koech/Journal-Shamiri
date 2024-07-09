from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
from django.http import JsonResponse
from journal.models import Journal
from journal.serializer import UserSerializer, JournalSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from django.db import models



# Create Journal 
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_journal_entry(request):
    serializer = JournalSerializer(data=request.data)

    valid_categories = [choice[0] for choice in Journal.CATEGORY_CHOICES]

    if request.data.get('category') not in valid_categories:
        return JsonResponse(
            {"error": "Invalid category. Choose from: Personal, Work, Travel, Other."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if serializer.is_valid():
        serializer.save(user=request.user)
        return JsonResponse({"success":"Added successfully"}, status=status.HTTP_201_CREATED)
    return JsonResponse({"error":"Error creating the journal"}, status=status.HTTP_400_BAD_REQUEST)


# Fetch Journal 
@api_view(['GET'])
@permission_classes([IsAuthenticated])  
def list_journal_entries(request):
    entries = Journal.objects.filter(user=request.user)
    serializer = JournalSerializer(entries, many=True)
    return JsonResponse(serializer.data, safe=False)

# Edit Journal Entry
@api_view(['PUT'])
@permission_classes([IsAuthenticated])  
def edit_journal_entry(request, entry_id):
    current_user = request.user
    try:
        entry = Journal.objects.get(id=entry_id, user=request.user)
    except Journal.DoesNotExist:
        return JsonResponse({"error": "Entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if entry.user != current_user:
        return JsonResponse({"error": "You are not authorized to delete this entry"}, status=status.HTTP_401_UNAUTHORIZED)
   

    valid_categories = [choice[0] for choice in Journal.CATEGORY_CHOICES]
    if request.data.get('category') not in valid_categories:
        return JsonResponse(
            {"error": "Invalid category. Choose from: Personal, Work, Travel, Other."},
            status=status.HTTP_400_BAD_REQUEST
        )

    serializer = JournalSerializer(entry, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({"success":"Updated successfully"})
    return JsonResponse({"error":"Error updating journal"}, status=status.HTTP_400_BAD_REQUEST)



# Delete Journal Entry
@api_view(['DELETE'])
def delete_journal_entry(request, entry_id):
    current_user = request.user
    
    try:
        entry = Journal.objects.get(id=entry_id, user=request.user)
    except Journal.DoesNotExist:
        return JsonResponse({"error": "Entry not found"}, status=status.HTTP_404_NOT_FOUND)
    
    if entry.user != current_user:
        return JsonResponse({"error": "You are not authorized to delete this entry"}, status=status.HTTP_401_UNAUTHORIZED)

    entry.delete()
    return JsonResponse({"success":"Deleted successfully"},status=status.HTTP_200_OK)



# Summary between Dates
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def summary(request):
    user = request.user
    period = request.query_params.get('period', 'daily')  
    batch = int(request.query_params.get('batch', '0')) 
    
    now = timezone.now()
    
    if period == 'daily':
        start_date = now - timezone.timedelta(days=1 * batch)
        end_date = now - timezone.timedelta(days=1 * (batch - 1))
    elif period == 'weekly':
        start_date = now - timezone.timedelta(weeks=1 * batch)
        end_date = now - timezone.timedelta(weeks=1 * (batch - 1))
    elif period == 'monthly':
        current_month = now.month - batch
        current_year = now.year
        while current_month <= 0:
            current_month += 12
            current_year -= 1
        start_date = timezone.datetime(current_year, current_month, 1)
        end_date = start_date + timezone.timedelta(days=calendar.monthrange(current_year, current_month)[1])
    else:
        return Response({"error": "Invalid period parameter"}, status=400)
    
    summary = Journal.objects.filter(user=user, date__gte=start_date, date__lt=end_date).values('category').annotate(count=Count('id'))
    
    return Response(summary)