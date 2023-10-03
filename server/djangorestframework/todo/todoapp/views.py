from rest_framework.decorators import action
from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework import renderers


from .models import Todo
from .serializers import TodoSerializer


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'todos': reverse('todo-list', request=request, format=format),
    })


class TodoViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
