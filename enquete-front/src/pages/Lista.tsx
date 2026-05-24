import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { usePerguntas } from '../hooks/usePerguntas'
import ModalOpcoes from '../components/ModalOpcoes'

function Lista() {
  const { perguntas, loading } = usePerguntas()
  const [perguntaSelecionadaId, setPerguntaSelecionadaId] = useState<number | null>(null)

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Enquetes</h1>
      <DataTable
        value={perguntas}
        loading={loading}
        emptyMessage="Nenhuma pergunta encontrada"
        selectionMode="single"
        onRowClick={(e) => setPerguntaSelecionadaId(e.data.id)}
        style={{ cursor: 'pointer' }}
      >
        <Column field="id" header="ID" style={{ width: '5%' }} />
        <Column field="texto_pergunta" header="Pergunta" />
        <Column field="data_publicacao" header="Data de Publicação" />
      </DataTable>

      <ModalOpcoes
        perguntaId={perguntaSelecionadaId}
        onClose={() => setPerguntaSelecionadaId(null)}
      />
    </div>
  )
}

export default Lista