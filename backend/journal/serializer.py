from rest_framework import serializers
from .models import User, Journal


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'phone_number', 'picture', 'password']
        read_only_fields = ['password']

class JournalEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = JournalEntry
        fields = ['id', 'title', 'content', 'category', 'date', 'user']