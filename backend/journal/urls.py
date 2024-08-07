from .views import signup, update_user, delete_user,current_user, create_journal_entry, list_journal_entries, edit_journal_entry, delete_journal_entry,summary, update_user, delete_user, logout

from django.urls import path
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView, TokenVerifyView, TokenBlacklistView)
from rest_framework_simplejwt.views import TokenBlacklistView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("user/register", signup, name="signup"),

    path("token/", TokenObtainPairView.as_view(), name="login"),
    path("user/verify", TokenVerifyView.as_view(), name="verify"),
    path("user/refresh", TokenRefreshView.as_view(), name="refresh"),
    path('user/logout', logout, name='token_blacklist'),
    

    path('user/delete', delete_user, name='delete_user'),
    path('user/update', update_user, name='update_user'),
    path("user/current_user", current_user, name="current_user" ), 



    path('journal-entry', create_journal_entry, name='create_journal_entry'),
    path('journal-entries', list_journal_entries, name='list_journal_entries'),
    path('journal-entry/<int:entry_id>', edit_journal_entry, name='edit_journal_entry'),
    path('journal-entry/<int:entry_id>/delete', delete_journal_entry, name='delete_journal_entry'),
    path('journals/summary', summary, name='summary_between_dates'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
