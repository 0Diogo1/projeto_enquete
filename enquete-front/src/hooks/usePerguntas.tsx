import {useEffect, useState} from 'react'
import {getPergunta} from '../services/enqueteService'
import type {Pergunta} from '../types/Pergunta'

export function usePerguntas() {
    const [perguntas, setPerguntas] = useState<Pergunta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPergunta()
        .then(data => setPerguntas(data))
        .finally(() => setLoading(false))
    },[])

    return {perguntas, loading}
}
