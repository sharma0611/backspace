import graphene
from graphene import relay
from .models.viewer import Viewer

# import mutations
# ... 

# Define Schema
class Query(graphene.ObjectType):
    viewer = graphene.Field(Viewer,  required=True, description='Root of all queries, logged out and logged in')
    node = relay.Node.Field()  # required by Relay specification
    def resolve_viewer(self, info):
        return {}  # always return something at the root level


class Mutations(graphene.ObjectType):
    pass
    # token auth

schema = graphene.Schema(query=Query, mutation=Mutations)

