from .views import signup, update_user, delete_user
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView, TokenVerifyView)


urlpatterns = [
    path("user/register", signup, name="signup"),

    path("token/", TokenObtainPairView.as_view(), name="login"),
    path("user/verify", TokenVerifyView.as_view(), name="verify"),
    path("user/refresh", TokenRefreshView.as_view(), name="refresh"),
    path('user/delete', delete_user, name='delete_user'),
    path('user/update', update_user, name='update_user'),
]
