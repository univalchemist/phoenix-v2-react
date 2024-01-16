import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { mockNotifications } from '@/utils/mock'
import { INotification } from '@/types'

interface INotificationContext {
  notifications: INotification[]
  totalUnread: number
  onReadNotification: (_id?: string) => void
  onRemoveNotification: (_id: string) => void
}

export const NotificationContext = createContext<INotificationContext>({
  notifications: [],
  totalUnread: 0,
  onReadNotification: () => null,
  onRemoveNotification: () => null,
})

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<INotification[]>([])

  // Mock only
  useEffect(() => {
    if (!notifications.length) {
      const _notifications: INotification[] = mockNotifications()
      _notifications.sort(a => (a.read ? 1 : -1))
      setNotifications(_notifications)
    }
  }, [notifications.length])

  const totalUnread = useMemo(() => {
    return notifications.filter(n => !n.read).length
  }, [notifications])

  const onReadNotification = useCallback((id?: string) => {
    if (id) {
      setNotifications(prev =>
        prev.map(item => (item.id === id ? { ...item, read: true } : item)),
      )
    } else {
      setNotifications(prev => prev.map(item => ({ ...item, read: true })))
    }
  }, [])

  const onRemoveNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id))
  }, [])

  const value = useMemo(
    () => ({
      notifications,
      totalUnread,
      onReadNotification,
      onRemoveNotification,
    }),
    [notifications, onReadNotification, onRemoveNotification, totalUnread],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}
