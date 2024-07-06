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
    return JsonResponse({"success":"Deleted successfully"},status=status.HTTP_204_NO_CONTENT)



# Summary between Dates
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def summary_between_dates(request):
    start_date = request.GET.get('start_date')
    end_date= request.GET.get('end_date')

    print("start_date",start_date)
    print("end_date",end_date)

    if not start_date or not end_date:
        return JsonResponse({"error": "Both start_date and end_date parameters are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
        if start_date > end_date:
            return JsonResponse({"error":"start_date cannot be after end_date."})
    except (ValueError, TypeError) as e:
        return JsonResponse({"error": f"Dates must be in the format YYYY-MM-DD and start_date must be before or equal to end_date. Details: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


    # Fetch journal entries within the date range
    entries = Journal.objects.filter(user=request.user, date__range=(start_date, end_date))

    # Compute the total number of entries and entries by category
    total_entries = entries.count()
    entries_by_category = entries.values('category').annotate(total=models.Count('category'))

    entries_list = list(entries.values('id', 'title', 'content', 'category', 'date'))

    summary = {
        "start_date": start_date,
        "end_date": end_date,
        "total_entries": total_entries,
        "entries_by_category": list(entries_by_category),  
        "entries": entries_list  
    }

    return JsonResponse(summary, status=status.HTTP_200_OK)