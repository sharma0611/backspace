""" Root query
"""
# from silk.profiling.profiler import silk_profile
import graphene
from graphene import relay

VIEWER_ID = 1

class Viewer(graphene.ObjectType):
    #me = graphene.Field(User, description="Root of logged in queries")

    def resolve_me(self, info):
        viewing_user = info.context.user
        if not viewing_user.is_authenticated:
            return None
        return viewing_user

    class Meta:
        interfaces = (relay.Node, )

