import { useCallback, useEffect, useState } from 'react'
import { getPerguntaById } from '../services/enqueteService'
import type { Pergunta } from '../types/Pergunta'

export function usePerguntaById(id: number | null) {
    const [pergunta, setPergunta] = useState<Pergunta | null>(null)
    const [loading, setLoading] = useState(true)

    const recarregar = useCallback(() => {
        if (!id) return
        setLoading(true)
        getPerguntaById(id)
            .then(setPergunta)
            .finally(() => setLoading(false))
    }, [id])

    useEffect(() => {
        recarregar()
    }, [recarregar])

    return { pergunta, loading, recarregar }

}
