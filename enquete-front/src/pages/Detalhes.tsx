import { useParams, useNavigate } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { usePerguntaById } from '../hooks/usePerguntaById'

function Detalhes() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { pergunta, loading } = usePerguntaById(Number(id))

  if (loading) return <p className="p-4">Carregando...</p>
  if (!pergunta) return <p className="p-4">Pergunta não encontrada.</p>

  const totalVotos = pergunta.opcoes.reduce((acc, o) => acc + o.votos, 0)

  return (
    <div className="p-4">
      <Button
        label="Voltar"
        icon="pi pi-arrow-left"
        className="mb-4"
        onClick={() => navigate('/')}
      />
      <h1 className="text-2xl font-bold mb-4">{pergunta.texto_pergunta}</h1>
      <div className="flex flex-column gap-3">
        {pergunta.opcoes.map(opcao => (
          <Card key={opcao.id} title={opcao.texto_opcao}>
            <p>{opcao.votos} voto(s)</p>
            <ProgressBar
              value={totalVotos > 0 ? Math.round((opcao.votos / totalVotos) * 100) : 0}
            />
          </Card>
        ))}
        {pergunta.opcoes.length === 0 && <p>Nenhuma opção cadastrada.</p>}
      </div>
    </div>
  )
}

export default Detalhes