import React from 'react'
import { useNavigate } from 'react-router'

import { t } from '@/i18n'
import { homePath } from '@/utils'
import { Button } from '@/components'

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <div className="container">
        <div className="notice-text">
          <h1>404</h1>
          <h2>{t('notFoundTitle')}</h2>
          <p>{t('notFoundDesc')}</p>
          <Button className="main-btn" onClick={() => navigate(homePath)}>
            {t('goToHomePage')}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
