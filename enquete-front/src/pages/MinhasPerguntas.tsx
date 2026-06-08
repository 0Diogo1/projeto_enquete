import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { useMinhasPerguntas } from '../hooks/useMinhasPerguntas'
import { deletarPergunta } from '../services/enqueteService'
import type { Pergunta } from '../types/Pergunta'
import ModalCriarPergunta from '../components/ModalCriarPergunta'
import Navbar from '../components/Navbar'
import { formatarData } from '../utils/formatarData'

function MinhasPerguntas() {
    const { perguntas, loading, carregar } = useMinhasPerguntas()
    const [modalCriarVisivel, setModalCriarVisivel] = useState(false)
    const [perguntaParaEditar, setPerguntaParaEditar] = useState<Pergunta | null>(null)

    function confirmarDelecao(pergunta: Pergunta) {
        confirmDialog({
            message: `Deseja deletar a pergunta "${pergunta.texto_pergunta}"?`,
            header: 'Confirmar exclusão',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sim, deletar',
            rejectLabel: 'Cancelar',
            acceptClassName: 'p-button-danger',
            accept: async () => {
                await deletarPergunta(pergunta.id)
                carregar()
            }
        })
    }

    function acoesTemplate(pergunta: Pergunta) {
        return (
            <div className="flex gap-2">
                <Button
                    icon="pi pi-pencil"
                    severity="warning"
                    outlined
                    rounded
                    tooltip="Editar"
                    onClick={() => {
                        setPerguntaParaEditar(pergunta)
                        setModalCriarVisivel(true)
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    outlined
                    rounded
                    tooltip="Deletar"
                    onClick={() => confirmarDelecao(pergunta)}
                />
            </div>
        )
    }

    return (
        <>
            <ConfirmDialog />
            <div className="p-4">
                <DataTable
                    value={perguntas}
                    loading={loading}
                    emptyMessage="Você ainda não criou nenhuma pergunta"
                    header={
                        <div className="flex justify-content-between align-items-center">
                            <span className="text-xl font-bold">Minhas Perguntas</span>
                            <Button
                                label="Nova Pergunta"
                                icon="pi pi-plus"
                                onClick={() => setModalCriarVisivel(true)}
                            />
                        </div>
                    }
                >
                    <Column field="texto_pergunta" header="Pergunta" />
                    <Column field="data_publicacao" header="Data de Publicação"
                        body={(row) => formatarData(row.data_publicacao)}
                    />
                    <Column body={acoesTemplate} header="Ações" style={{ width: '10%' }}
        
                    />
                </DataTable>
            </div>

            <ModalCriarPergunta
                visible={modalCriarVisivel}
                onClose={() => {
                    setModalCriarVisivel(false)
                    setPerguntaParaEditar(null)
                }}
                onSucesso={carregar}
                perguntaParaEditar={perguntaParaEditar}
            />
        </>
    )
}

export default MinhasPerguntas