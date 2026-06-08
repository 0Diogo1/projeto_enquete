from rest_framework import viewsets, permissions, generics
from .models import Pergunta, Opcao
from .serializers import PerguntaSerializer, OpcaoSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import BasePermission
from rest_framework.decorators import action
from rest_framework.response import Response

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.criado_por == request.user

class PerguntaViewSet(viewsets.ModelViewSet):
    queryset = Pergunta.objects.all()
    serializer_class = PerguntaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return Pergunta.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(criado_por=self.request.user)

    def get_permissions(self):
        if self.action in ['update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated(), IsOwner()]
        return super().get_permissions()
    
    @action(detail=False, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def minhas(self, request):
        perguntas = Pergunta.objects.filter(criado_por=request.user)
        serializer = self.get_serializer(perguntas, many=True)
        return Response(serializer.data)

class OpcaoViewSet(viewsets.ModelViewSet):
    queryset = Opcao.objects.all()
    serializer_class = OpcaoSerializer

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def votar(self, request, pk=None):
        opcao = self.get_object()
        opcao.votos += 1
        opcao.save()
        return Response({'votos': opcao.votos})

class RegistroView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]