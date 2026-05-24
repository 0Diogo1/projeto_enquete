import {useEffect, useState} from 'react'
import {getPerguntaById} from '../services/enqueteService'
import type {Pergunta} from '../types/Pergunta'

export function usePerguntaById(id: number | null) {
    const [pergunta, setPergunta] = useState<Pergunta | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return 
        getPerguntaById(id)
        .then(setPergunta)
        .finally(() => setLoading(false))
    },[id])

    return {pergunta, loading}
}
