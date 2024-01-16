import React from 'react'

import { INotification } from '@/types'
import { Button, Container, DateTime, Icon, Popover, Text } from '@/components'
import { t } from '@/i18n'

interface Props {
  data: INotification
  onRead: (_id: string) => void
  onRemove: (_id: string) => void
}

const Notification: React.FC<Props> = ({ data, onRead, onRemove }) => {
  return (
    <Container align="flex-start" gap={20} className="notification-container">
      <Icon name="clock" />
      <Container col gap={4} className="flex-1 notification-content">
        <Text ellipsis font="medium" size={16} lineHeight={24}>
          {data.title}
        </Text>
        <Text font="regular" size={14} color="--primary-light">
          <DateTime value={data.time} mode="humanize" />
        </Text>
      </Container>
      <Container align="center" gap={6}>
        {!data.read && <div className="unread" />}
        <div className="action-btn">
          <Popover
            arrow
            placement="bottom-end"
            button={
              <Button
                variant="pure"
                iconRight="3-dots"
                className="notification-action-btn"
              />
            }
          >
            {onClose => (
              <Container col gap={12} className="notification-action-menu">
                <Button
                  variant="pure"
                  size="md"
                  className="action-menu hoverable"
                  iconLeft="tick-square"
                  onClick={() => {
                    onRead(data.id)
                    onClose()
                  }}
                >
                  <Text font="medium" size={14} color="--primary-default">
                    {t('header.markAsRead')}
                  </Text>
                </Button>
                <Button
                  variant="pure"
                  size="md"
                  className="action-menu hoverable"
                  iconLeft="trash-dark"
                  onClick={() => {
                    onRemove(data.id)
                    onClose()
                  }}
                >
                  <Text font="medium" size={14} color="--primary-default">
                    {t('header.removeNotification')}
                  </Text>
                </Button>
              </Container>
            )}
          </Popover>
        </div>
      </Container>
    </Container>
  )
}

export default Notification
