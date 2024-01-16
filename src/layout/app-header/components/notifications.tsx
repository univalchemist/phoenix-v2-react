import React from 'react'

import { Button, Container, Icon, Popover, Text } from '@/components'
import { useNotification } from '@/hooks'
import { t } from '@/i18n'
import Notification from './notification'

const Notifications: React.FC = () => {
  const {
    totalUnread,
    notifications,
    onReadNotification,
    onRemoveNotification,
  } = useNotification()

  return (
    <Popover
      placement="bottom-end"
      WrapEl="div"
      distance={4}
      positioning="fixed"
      className="notifications-popup"
      button={
        <div className="notification-button">
          {!!totalUnread && <div className="unread" />}
          <Icon name="notification" />
        </div>
      }
    >
      <Container col className="notifications-wrapper">
        <Container
          align="center"
          justify="space-between"
          className="notifications-header"
        >
          <Text font="medium" size={16}>
            {t('header.notification')}
          </Text>
          <Button
            variant="pure"
            className="mark-read-btn"
            onClick={() => onReadNotification()}
          >
            <Text font="regular" size={12}>
              {t('header.markAllAsRead')}
            </Text>
          </Button>
        </Container>
        <Container col className="notifications-container custom-scrollbar">
          {notifications.map(notification => (
            <Notification
              key={notification.id}
              data={notification}
              onRead={onReadNotification}
              onRemove={onRemoveNotification}
            />
          ))}
        </Container>
      </Container>
    </Popover>
  )
}

export default Notifications
