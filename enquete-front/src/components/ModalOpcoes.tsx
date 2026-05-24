import { Dialog } from 'primereact/dialog'
import { ProgressBar } from 'primereact/progressbar'
import { Card } from 'primereact/card'
import { usePerguntaById } from '../hooks/usePerguntaById'

interface Props {
  perguntaId: number | null
  onClose: () => void
}

function ModalOpcoes({ perguntaId, onClose }: Props) {
  const { pergunta, loading } = usePerguntaById(perguntaId)

  const totalVotos = pergunta?.opcoes.reduce((acc, o) => acc + o.votos, 0) ?? 0

  return (
    <Dialog
      header={pergunta?.texto_pergunta ?? 'Carregando...'}
      visible={perguntaId !== null}
      onHide={onClose}
      style={{ width: '1000px' }}
    >
      {loading && <p>Carregando...</p>}

      {!loading && pergunta?.opcoes.length === 0 && (
        <p>Nenhuma opção cadastrada.</p>
      )}

      {!loading && pergunta?.opcoes.map(opcao => (
        <Card key={opcao.id} className="mb-3" title={opcao.texto_opcao}>
          <p>{opcao.votos} voto(s)</p>
          <ProgressBar
            value={totalVotos > 0 ? Math.round((opcao.votos / totalVotos) * 100) : 0}
          />
        </Card>
      ))}
    </Dialog>
  )
}

export default ModalOpcoes