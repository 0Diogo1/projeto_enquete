import api from './api'

export const getPergunta = async () => {
  const response = await api.get('/perguntas/')
  return response.data;
}

export const getPerguntaById = async (id: number) => {
    const response = await api.get(`/perguntas/${id}/`);
    return response.data;
}