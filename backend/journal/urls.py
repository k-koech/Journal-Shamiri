from .views import signup 
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [
    path("user/register", signup, name="signup"),

    path("user/login", TokenObtainPairView.as_view(), name="login"),
    path("user/refresh", TokenRefreshView.as_view(), name="refresh"),
]
