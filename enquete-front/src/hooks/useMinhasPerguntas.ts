import { useEffect, useState, useCallback } from 'react'
import { getMinhasPerguntas } from '../services/enqueteService'
import type { Pergunta } from '../types/Pergunta'

export function useMinhasPerguntas() {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([])
  const [loading, setLoading] = useState(true)

  const carregar = useCallback(() => {
    setLoading(true)
    getMinhasPerguntas()
      .then(setPerguntas)
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

  return { perguntas, loading, carregar }
}