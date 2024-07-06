import os
import django

# Set up the Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings') 
django.setup()

from journal.models import User, Journal

print("Seed data . . .")

def seed_data():
    # Drop tables and recreate schema
    User.objects.all().delete()
    Journal.objects.all().delete()

    # Seed Users
    users = [
        {'username': 'user1', 'email': 'user1@example.com', 'password': 'password1', 'phone_number': '1234567890'},
        {'username': 'user2', 'email': 'user2@example.com', 'password': 'password2', 'phone_number': '2345678901'},
        {'username': 'user3', 'email': 'user3@example.com', 'password': 'password3', 'phone_number': '3456789012'},
        {'username': 'user4', 'email': 'user4@example.com', 'password': 'password4', 'phone_number': '4567890123'},
        {'username': 'user5', 'email': 'user5@example.com', 'password': 'password5', 'phone_number': '5678901234'},
    ]

    for user_data in users:
        User.objects.create_user(
            username=user_data['username'],
            email=user_data['email'],
            password=user_data['password'],
            phone_number=user_data['phone_number']
        )

    # Seed Journals
    journals = [
        {'user': 'user1', 'title': 'Personal Journal 1', 'content': 'Content for personal journal 1', 'category': 'Personal'},
        {'user': 'user1', 'title': 'Work Journal 1', 'content': 'Content for work journal 1', 'category': 'Work'},
        {'user': 'user2', 'title': 'Travel Journal 1', 'content': 'Content for travel journal 1', 'category': 'Travel'},
        {'user': 'user2', 'title': 'Other Journal 1', 'content': 'Content for other journal 1', 'category': 'Other'},
        {'user': 'user3', 'title': 'Personal Journal 2', 'content': 'Content for personal journal 2', 'category': 'Personal'},
        {'user': 'user3', 'title': 'Work Journal 2', 'content': 'Content for work journal 2', 'category': 'Work'},
        {'user': 'user4', 'title': 'Travel Journal 2', 'content': 'Content for travel journal 2', 'category': 'Travel'},
        {'user': 'user4', 'title': 'Other Journal 2', 'content': 'Content for other journal 2', 'category': 'Other'},
        {'user': 'user5', 'title': 'Personal Journal 3', 'content': 'Content for personal journal 3', 'category': 'Personal'},
        {'user': 'user5', 'title': 'Work Journal 3', 'content': 'Content for work journal 3', 'category': 'Work'},
        {'user': 'user1', 'title': 'Travel Journal 3', 'content': 'Content for travel journal 3', 'category': 'Travel'},
        {'user': 'user1', 'title': 'Other Journal 3', 'content': 'Content for other journal 3', 'category': 'Other'},
        {'user': 'user2', 'title': 'Personal Journal 4', 'content': 'Content for personal journal 4', 'category': 'Personal'},
        {'user': 'user2', 'title': 'Work Journal 4', 'content': 'Content for work journal 4', 'category': 'Work'},
        {'user': 'user3', 'title': 'Travel Journal 4', 'content': 'Content for travel journal 4', 'category': 'Travel'},
        {'user': 'user3', 'title': 'Other Journal 4', 'content': 'Content for other journal 4', 'category': 'Other'},
        {'user': 'user4', 'title': 'Personal Journal 5', 'content': 'Content for personal journal 5', 'category': 'Personal'},
        {'user': 'user4', 'title': 'Work Journal 5', 'content': 'Content for work journal 5', 'category': 'Work'},
        {'user': 'user5', 'title': 'Travel Journal 5', 'content': 'Content for travel journal 5', 'category': 'Travel'},
        {'user': 'user5', 'title': 'Other Journal 5', 'content': 'Content for other journal 5', 'category': 'Other'},
        {'user': 'user1', 'title': 'Personal Journal 6', 'content': 'Content for personal journal 6', 'category': 'Personal'},
        {'user': 'user2', 'title': 'Work Journal 6', 'content': 'Content for work journal 6', 'category': 'Work'},
        {'user': 'user3', 'title': 'Travel Journal 6', 'content': 'Content for travel journal 6', 'category': 'Travel'},
    ]

    for journal_data in journals:
        user = User.objects.get(username=journal_data['user'])
        Journal.objects.create(
            user=user,
            title=journal_data['title'],
            content=journal_data['content'],
            category=journal_data['category']
        )

seed_data()

print("Seed data complete . . .")
