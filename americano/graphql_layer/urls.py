from django.urls import path, re_path
from .views import graphql

urlpatterns = [
    path('graphql/', graphql, name='graphql'),
]
