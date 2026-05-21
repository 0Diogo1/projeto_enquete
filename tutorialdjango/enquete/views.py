from rest_framework import viewsets
from .models import Pergunta, Opcao
from .serializers import PerguntaSerializer, OpcaoSerializer

class PerguntaViewSet(viewsets.ModelViewSet):
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer

class OpcaoViewSet(viewsets.ModelViewSet):
    queryset = Opcao.objects.all()
    serializer_class = OpcaoSerializer