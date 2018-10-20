from django.urls import path, re_path
from finimize_django.core.views import slash_redirect_or_404
from .views import graphql


urlpatterns = [
    path('graphql/', graphql, name='graphql'),

    re_path(r'.*', slash_redirect_or_404),
]

