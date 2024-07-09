from rest_framework import serializers
from .models import User, Journal


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        extra_kwargs = {'password': {'write_only': True}}
        fields = ['username', 'email', 'name', 'picture', "password"]


class JournalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Journal
        fields = ['id', 'title', 'content', 'category', 'date', 'user']

