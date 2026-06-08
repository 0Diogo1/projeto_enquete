export interface Opcao {
    id: number
    texto_opcao: string
    votos:number
    pergunta?: number
}

export interface Pergunta {
    id:number
    texto_pergunta: string
    data_publicacao: string
    opcoes: Opcao[]
    criado_por: string
}