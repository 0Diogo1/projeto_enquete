import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { ProgressBar } from 'primereact/progressbar'
import { useState } from 'react'
import { usePerguntaById } from '../hooks/usePerguntaById'
import { votar } from '../services/enqueteService'
import { useAuth } from '../context/AuthContext'

interface Props {
  perguntaId: number | null
  onClose: () => void
}

function ModalOpcoes({ perguntaId, onClose }: Props) {
  const { pergunta, loading, recarregar } = usePerguntaById(perguntaId)
  const { usuario } = useAuth()
  const [votando, setVotando] = useState<number | null>(null)

  const totalVotos = pergunta?.opcoes.reduce((acc, o) => acc + o.votos, 0) ?? 0
  const isDono = pergunta?.criado_por === usuario

  async function handleVotar(opcaoId: number) {
    setVotando(opcaoId)
    try {
      await votar(opcaoId)
      recarregar()
    } finally {
      setVotando(null)
    }
  }

  return (
    <Dialog
      header={pergunta?.texto_pergunta ?? 'Carregando...'}
      visible={perguntaId !== null}
      onHide={onClose}
      style={{ width: '500px' }}
    >
      {loading && <p>Carregando...</p>}

      {!loading && pergunta?.opcoes.length === 0 && (
        <p>Nenhuma opção cadastrada.</p>
      )}

      {!loading && pergunta?.opcoes.map(opcao => {
        const percentual = totalVotos > 0 ? Math.round((opcao.votos / totalVotos) * 100) : 0

        return (
          <div key={opcao.id} className="mb-3">
            <div className="flex justify-content-between align-items-center mb-1">
              <span>{opcao.texto_opcao}</span>
              <span className="text-sm">{opcao.votos} voto(s) — {percentual}%</span>
            </div>
            <ProgressBar value={percentual} className="mb-2" />
            {!isDono && (
              <Button
                label="Votar"
                size="small"
                outlined
                loading={votando === opcao.id}
                onClick={() => handleVotar(opcao.id)}
              />
            )}
          </div>
        )
      })}

      {isDono && (
        <small className="text-color-secondary">Você não pode votar na sua própria pergunta.</small>
      )}
    </Dialog>
  )
}

export default ModalOpcoes