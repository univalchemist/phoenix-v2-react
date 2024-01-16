import React from 'react'

import ActionModal from '@/pages/vector-zoom/components/action-modal/action-modal'
import { useProjectPlan } from '@/hooks'

interface Props {
  modal: 'vector' | 'goal' | 'action' | null
  onClose: () => void
}

const Modals: React.FC<Props> = ({ modal, onClose }) => {
  const { onAddAction } = useProjectPlan()

  if (modal === 'action') {
    return <ActionModal isOpen onClose={onClose} onAdd={onAddAction} />
  }

  return null
}

export default Modals
