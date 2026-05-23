import {useEffect, useState} from 'react'
import {getPerguntaById} from '../services/enqueteService'
import type {Pergunta} from '../types/Pergunta'

export function usePerguntaById(id: number) {
    const [pergunta, setPergunta] = useState<Pergunta | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPerguntaById(id)
        .then(setPergunta)
        .finally(() => setLoading(false))
    },[])

    return {pergunta, loading}
}
