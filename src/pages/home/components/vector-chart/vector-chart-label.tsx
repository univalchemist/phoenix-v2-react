import React, { CSSProperties, useMemo } from 'react'
import { useNavigate, NavigateFunction } from 'react-router-dom'

import LabelLine1 from '@/assets/images/chat-label-line-1.png'
import LabelLine2 from '@/assets/images/chat-label-line-2.png'
import LabelLine3 from '@/assets/images/chat-label-line-3.png'
import LabelLine4 from '@/assets/images/chat-label-line-4.png'
import { Container, Icon, Text } from '@/components'
import { generatePath, vectorZoomPath } from '@/utils'
import { IVectorChartLabelProps } from './types'
import classNames from 'classnames'

const VectorChartLabel: React.FC<IVectorChartLabelProps> = ({ position }) => {
  const navigate: NavigateFunction = useNavigate()

  const [className, style]: [string, CSSProperties] = useMemo(() => {
    const { index, total, top, right, left } = position
    const inverseIndex = total - index - 1
    let _className = ''
    const _style: CSSProperties = {}
    if (index === 0) {
      _className = 'top'
      _style.top = top
      _style.left = left
    } else if (index <= Math.floor(total / 2) - 1) {
      _className = 'right'
      _style.top = top
      _style.left = left
    } else if (inverseIndex < Math.floor(total / 2) - 1) {
      _className = 'left'
      _style.top = top
      _style.left = left
    } else {
      _className = 'bottom'
      _style.top = top
      _style.right = right
    }

    return [_className, _style]
  }, [position])

  return (
    <div className={classNames('chart-label-wrapper', className)} style={style}>
      <div className="line-wrapper">
        <img src={LabelLine1} />
        <img src={LabelLine2} />
        <img src={LabelLine3} />
        <img src={LabelLine4} />
      </div>
      <Container
        align="center"
        gap={6}
        className="chart-label"
        onClick={() =>
          navigate(generatePath(vectorZoomPath, { id: position.vectorId }))
        }
      >
        <Text
          ellipsis
          font="medium"
          size={16}
          lineHeight={20}
          color="--primary-default"
        >
          {position.text}
        </Text>
        <Icon name="arrow-o-right" />
      </Container>
    </div>
  )
}

export default VectorChartLabel
