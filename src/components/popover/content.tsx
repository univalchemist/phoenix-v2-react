import React, { useLayoutEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import {
  usePopover,
  useOnClickOutside,
  useFocusTrapping,
  useCombinedRefs,
} from '@/hooks'
import { Placement } from '@/types'
import { getPopoverCoords } from './utils'

interface Props {
  positioning: 'absolute' | 'fixed'
  arrow?: boolean
  children: React.ReactNode
}

const Content: React.FC<Props> = ({ positioning, arrow, children }) => {
  const { triggerRect, placement, closeOnOutside, distance, onClose } =
    usePopover()
  const ref = useRef<HTMLDialogElement>(null)
  const [pos, setPos] = useState<Placement | undefined>()
  const [coords, setCoords] = useState<
    { left: number; top: number } | undefined
  >(undefined)

  useLayoutEffect(() => {
    setTimeout(() => {
      const element = ref.current
      if (element == null) return

      const rect = element.getBoundingClientRect()

      const [coords, _pos] = getPopoverCoords(
        triggerRect,
        rect,
        placement,
        distance,
        positioning,
      )
      setCoords(coords)
      setPos(_pos)
    }, 50)
  }, [distance, placement, triggerRect, positioning])

  const refFocusTrapping = useFocusTrapping()
  const mergedRef = useCombinedRefs(ref, refFocusTrapping)
  useOnClickOutside(mergedRef, closeOnOutside, onClose)

  return (
    <div
      className={classNames('popover', {
        arrow,
        [pos || '']: !!pos,
      })}
      ref={mergedRef}
      style={{
        opacity: coords ? 1 : 0,
        position: positioning,
        left: `${coords?.left || 0}px`,
        top: `${coords?.top || 0}px`,
        margin: 0,
        zIndex: 1999,
      }}
    >
      <div className="popover-content">{children}</div>
    </div>
  )
}

export default Content
