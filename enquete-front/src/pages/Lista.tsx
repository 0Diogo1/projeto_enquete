import { useNavigate } from 'react-router-dom'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { usePerguntas } from '../hooks/usePerguntas'

function Lista() {
  const { perguntas, loading } = usePerguntas()
  const navigate = useNavigate()

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Enquetes</h1>
      <DataTable
        value={perguntas}
        loading={loading}
        emptyMessage="Nenhuma pergunta encontrada"
        selectionMode="single"
        onRowClick={(e) => navigate(`/detalhes/${e.data.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <Column field="id" header="ID" style={{ width: '5%' }} />
        <Column field="texto_pergunta" header="Pergunta" />
        <Column field="data_publicacao" header="Data de Publicação" />
      </DataTable>
    </div>
  )
}

export default Lista