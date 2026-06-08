from rest_framework import serializers
from .models import Pergunta, Opcao
from django.contrib.auth.models import User

class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ['id', 'texto_opcao', 'votos', 'pergunta']

class PerguntaSerializer(serializers.ModelSerializer):
    opcoes = OpcaoSerializer(many=True, read_only=True)
    criado_por = serializers.ReadOnlyField(source='criado_por.username')

    class Meta:
        model = Pergunta
        fields = ['id', 'texto_pergunta','data_publicacao', 'opcoes', 'criado_por']

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user