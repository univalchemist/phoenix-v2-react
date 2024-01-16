import React from 'react'
import { Text } from '@/components'

import './coming-soon.scss'

export const ComingSoonPage: React.FC = () => {
  return (
    <div className="coming-soon-container">
      <Text font="medium" size={32}>
        Coming soon
      </Text>
    </div>
  )
}

export default ComingSoonPage
