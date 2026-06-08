import { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import {
    criarPergunta, editarPergunta,
    criarOpcao, editarOpcao, deletarOpcao
} from '../services/enqueteService'
import type { Pergunta } from '../types/Pergunta'

interface OpcaoForm {
    id?: number
    texto: string
    removida?: boolean
}

interface Props {
    visible: boolean
    onClose: () => void
    onSucesso: () => void
    perguntaParaEditar?: Pergunta | null
}

function ModalCriarPergunta({ visible, onClose, onSucesso, perguntaParaEditar }: Props) {
    const [textoPergunta, setTextoPergunta] = useState('')
    const [dataPublicacao, setDataPublicacao] = useState<Date | null>(null)
    const [opcoes, setOpcoes] = useState<OpcaoForm[]>([{ texto: '' }, { texto: '' }])
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState('')

    const modoEdicao = !!perguntaParaEditar

    useEffect(() => {
        if (perguntaParaEditar) {
            setTextoPergunta(perguntaParaEditar.texto_pergunta)
            setDataPublicacao(new Date(perguntaParaEditar.data_publicacao))
            setOpcoes(perguntaParaEditar.opcoes.map(o => ({ id: o.id, texto: o.texto_opcao })))
        } else {
            setTextoPergunta('')
            setDataPublicacao(null)
            setOpcoes([{ texto: '' }, { texto: '' }])
        }
        setErro('')
    }, [perguntaParaEditar, visible])

    function adicionarOpcao() {
        setOpcoes([...opcoes, { texto: '' }])
    }

    function atualizarOpcao(index: number, valor: string) {
        const novasOpcoes = [...opcoes]
        novasOpcoes[index] = { ...novasOpcoes[index], texto: valor }
        setOpcoes(novasOpcoes)
    }

    function removerOpcao(index: number) {
        const ativas = opcoes.filter(o => !o.removida)
        if (ativas.length <= 2) return

        const novasOpcoes = [...opcoes]
        if (novasOpcoes[index].id) {
            // opção já existe no banco → marca como removida
            novasOpcoes[index] = { ...novasOpcoes[index], removida: true }
        } else {
            // opção nova → remove do array
            novasOpcoes.splice(index, 1)
        }
        setOpcoes(novasOpcoes)
    }

    async function handleSalvar() {
        setErro('')
        const opcoesAtivas = opcoes.filter(o => !o.removida)

        if (!textoPergunta.trim()) return setErro('O texto da pergunta é obrigatório.')
        if (!dataPublicacao) return setErro('A data de publicação é obrigatória.')
        if (opcoesAtivas.some(o => !o.texto.trim())) return setErro('Preencha todas as opções.')

        setLoading(true)
        try {
            if (modoEdicao && perguntaParaEditar) {
                // edição
                await editarPergunta(perguntaParaEditar.id, textoPergunta, dataPublicacao.toISOString())

                for (const opcao of opcoes) {
                    if (opcao.removida && opcao.id) {
                        await deletarOpcao(opcao.id)
                    } else if (opcao.id) {
                        await editarOpcao(opcao.id, opcao.texto)
                    } else if (!opcao.removida) {
                        await criarOpcao(perguntaParaEditar.id, opcao.texto)
                    }
                }
            } else {
                // criação
                await criarPergunta(textoPergunta, dataPublicacao.toISOString(), opcoesAtivas.map(o => o.texto))
            }

            onSucesso()
            onClose()
        } catch {
            setErro('Erro ao salvar. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }


    return (
        <Dialog
            header={modoEdicao ? 'Editar Pergunta' : 'Nova Pergunta'}
            visible={visible}
            onHide={onClose}
            style={{ width: '500px' }}
        >
            <div className="flex flex-column gap-3">
                <div>
                    <label className="block mb-1">Pergunta</label>
                    <InputText
                        className="w-full"
                        placeholder="Digite sua pergunta..."
                        value={textoPergunta}
                        onChange={(e) => setTextoPergunta(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block mb-1">Data de Publicação</label>
                    <Calendar
                        className="w-full"
                        value={dataPublicacao}
                        onChange={(e) => setDataPublicacao(e.value as Date)}
                        showIcon
                        dateFormat="dd/mm/yy"
                    />
                </div>
                <div>
                    <label className="block mb-2">Opções</label>
                    <div className="flex flex-column gap-2">
                        {opcoes.filter(o => !o.removida).map((opcao, index) => (
                            <div key={index} className="flex gap-2">
                                <InputText
                                    className="w-full"
                                    placeholder={`Opção ${index + 1}`}
                                    value={opcao.texto}
                                    onChange={(e) => atualizarOpcao(opcoes.indexOf(opcao), e.target.value)}
                                />
                                <Button
                                    icon="pi pi-trash"
                                    severity="danger"
                                    outlined
                                    onClick={() => removerOpcao(opcoes.indexOf(opcao))}
                                    disabled={opcoes.filter(o => !o.removida).length <= 2}
                                />
                            </div>
                        ))}
                    </div>
                    <Button label="Adicionar opção" icon="pi pi-plus" text className="mt-2" onClick={adicionarOpcao} />
                </div>
                {erro && <small className="p-error">{erro}</small>}
                <Button
                    label={modoEdicao ? 'Salvar Alterações' : 'Criar Pergunta'}
                    loading={loading}
                    onClick={handleSalvar}
                />
            </div>
        </Dialog>
    )
}

export default ModalCriarPergunta