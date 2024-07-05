from rest_framework import serializers
from .models import User, Journal


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'email', 'phone_number', 'picture', 'password']
        read_only_fields = ['password']

class JournalEntrySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Journal
        fields = ['id', 'title', 'content', 'category', 'date', 'user']