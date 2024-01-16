import React from 'react'

import { Button, Container, Popover } from '@/components'
import { IVectorAction } from '@/types'
import { t } from '@/i18n'

interface Props {
  action: IVectorAction
  onMarkCompleted: (_id: string) => void
  onRemove: (_id: string) => void
}

const Action: React.FC<Props> = ({ action, onMarkCompleted, onRemove }) => {
  return (
    <Popover
      arrow
      placement="bottom-end"
      WrapEl="div"
      className="vector-action"
      button={<Button size="sm" variant="pure" iconRight="3-dots" />}
    >
      {onClose => (
        <Container col gap={2} className="action-menu-container">
          <div className="menu-item hoverable">
            <Button variant="pure" size="sm" iconLeft="copy" onClick={onClose}>
              {t('vectorZoomPage.copy')}
            </Button>
          </div>
          {action.status !== 'completed' && (
            <div className="menu-item hoverable">
              <Button
                variant="pure"
                size="sm"
                iconLeft="tick-square"
                onClick={() => {
                  onMarkCompleted(action.id)
                  onClose()
                }}
              >
                {t('vectorZoomPage.markAsCompleted')}
              </Button>
            </div>
          )}
          <div className="menu-item hoverable">
            <Button
              variant="pure"
              size="sm"
              iconLeft="trash-dark"
              onClick={() => {
                onRemove(action.id)
                onClose()
              }}
            >
              {t('vectorZoomPage.delete')}
            </Button>
          </div>
        </Container>
      )}
    </Popover>
  )
}

export default Action
