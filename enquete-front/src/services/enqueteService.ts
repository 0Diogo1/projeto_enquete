import api from './api'

export const getPergunta = async () => {
  const response = await api.get('/enquete/perguntas/')
  return response.data;
}

export const getPerguntaById = async (id: number) => {
    const response = await api.get(`/enquete/perguntas/${id}/`);
    return response.data;
}

export const getMinhasPerguntas = async () => {
    const response = await api.get('/enquete/perguntas/minhas/');
    return response.data;
}

export const criarPergunta = async (textoPergunta: string, dataPublicacao:string, opcoes:string[]) => {
  const response = await api.post('/enquete/perguntas/', {
    texto_pergunta: textoPergunta,
    data_publicacao: dataPublicacao,
  })
  const perguntaId = response.data.id

  // Criar as opções para a pergunta
  for (const textoOpcao of opcoes) {
    await api.post('/enquete/opcoes/', {
      texto_opcao: textoOpcao,
      pergunta: perguntaId,
      votos:0
    })
  }
  return response.data
}

export const editarPergunta = async (id: number, textoPergunta: string, dataPublicacao: string) => {
  const response = await api.put(`/enquete/perguntas/${id}/`, {
    texto_pergunta: textoPergunta,
    data_publicacao: dataPublicacao,
  })
  return response.data
}

export const editarOpcao = async (id: number, textoOpcao: string) => {
  await api.patch(`/enquete/opcoes/${id}/`, {
    texto_opcao: textoOpcao,
  })
}

export const deletarOpcao = async (id: number) => {
  await api.delete(`/enquete/opcoes/${id}/`)
}

export const criarOpcao = async (perguntaId: number, textoOpcao: string) => {
  await api.post('/enquete/opcoes/', {
    texto_opcao: textoOpcao,
    pergunta: perguntaId,
    votos: 0
  })
}

export const deletarPergunta = async (id: number) => {
  await api.delete(`/enquete/perguntas/${id}/`)
}

export const votar = async (opcaoId: number) => {
  const response = await api.post(`/enquete/opcoes/${opcaoId}/votar/`)
  return response.data
}