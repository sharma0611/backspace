from django.shortcuts import render

# Create your views here.
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from graphql import GraphQLError


class MacchiatoGraphQLView(GraphQLView):
    @staticmethod
    def format_error(error):
        original_error = getattr(error, 'original_error', None) or error
        formatted_error = GraphQLView.format_error(original_error)

        if not isinstance(original_error, GraphQLError):
            if settings.DEBUG:
                formatted_error = {'debug': formatted_error.get('message', '')}
            else:
                formatted_error = {}  # don't send message for non-ui errors to the client
                # sentry.captureException(
                #    exc_info=(type(original_error), original_error, original_error.__traceback__))

        return formatted_error


@csrf_exempt
def graphql(request):
    enable_graphiql = request.user.is_authenticated and request.user.is_staff
    return MacchiatoGraphQLView.as_view(graphiql=enable_graphiql)(request)
