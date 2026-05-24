import datetime
from arrow import now
from django.db import models
from django.utils import timezone
# Create your models here.

class Pergunta(models.Model):
    def __str__(self):
        return self.texto_pergunta
    
    def publicado_recentemente(self):
        hoje = timezone.now()
        return hoje - datetime.timedelta(days=1) <= self.data_publicacao <= hoje

    texto_pergunta = models.CharField(max_length=200)
    data_publicacao = models.DateTimeField("data de publicação")

class Opcao(models.Model):
    def __str__(self):
        return self.texto_opcao
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE, related_name='opcoes')
    texto_opcao = models.CharField(max_length=200)
    votos = models.IntegerField(default=0)