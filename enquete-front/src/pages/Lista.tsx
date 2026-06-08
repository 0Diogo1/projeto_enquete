import { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { usePerguntas } from '../hooks/usePerguntas'
import ModalOpcoes from '../components/ModalOpcoes'
import { formatarData } from '../utils/formatarData'

function Lista() {
  const { perguntas, loading } = usePerguntas()
  const [perguntaSelecionadaId, setPerguntaSelecionadaId] = useState<number | null>(null)

  return (
    <div className="p-4">
      <div className="flex justify-content-between align-items-center mb-4">
      </div>
      <DataTable
        value={perguntas}
        loading={loading}
        emptyMessage="Nenhuma pergunta encontrada"
        selectionMode="single"
        onRowClick={(e) => setPerguntaSelecionadaId(e.data.id)}
        style={{ cursor: 'pointer' }}
      >
        <Column field="texto_pergunta" header="Pergunta" />
        <Column field="criado_por" header="Autor" />
        <Column field="data_publicacao" header="Data de Publicação"
          body={(row) => formatarData(row.data_publicacao)}
        />
      </DataTable>

      <ModalOpcoes
        perguntaId={perguntaSelecionadaId}
        onClose={() => setPerguntaSelecionadaId(null)}
      />
    </div>
  )
}

export default Lista