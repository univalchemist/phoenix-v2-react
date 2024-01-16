import React, {
  useMemo,
  useCallback,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'

import { useResizeObserver } from '@/hooks'
import { Text } from '../text'
import { Icon } from '../icon'
import { IAccordionProps, IAccordionControl } from './types'
import './accordion.scss'

export const Accordion = React.forwardRef<IAccordionControl, IAccordionProps>(
  (
    {
      accordionRef,
      disabled,
      preExpanded,
      title,
      expanded,
      shadowOnExpand,
      width = '100%',
      onToggle,
      children,
    },
    controlRef,
  ) => {
    const contentRef = useRef<HTMLDivElement>(null)

    const [isInternalExpanded, setIsInternalExpanded] = useState<
      boolean | undefined
    >()

    const [contentHeight, setContentHeight] = useState<string>(
      isInternalExpanded ? 'auto' : '0',
    )

    useResizeObserver(contentRef, () => {
      setContentHeight(`${contentRef?.current?.scrollHeight || 0}px`)
    })

    useEffect(() => {
      setContentHeight(`${contentRef?.current?.scrollHeight || 0}px`)
    }, [])

    /** Set initial expand status */
    useEffect(() => {
      if (isInternalExpanded === undefined) {
        setIsInternalExpanded(preExpanded)
      }
    }, [isInternalExpanded, preExpanded])

    const isControlled = useMemo(
      () => preExpanded === undefined && expanded !== undefined,
      [expanded, preExpanded],
    )

    const isExpanded = useMemo(
      () => (isControlled ? expanded : isInternalExpanded),
      [expanded, isControlled, isInternalExpanded],
    )

    const onChange = useCallback(() => {
      if (disabled) return

      if (isControlled) {
        if (onToggle) onToggle(!isExpanded)
      } else {
        setIsInternalExpanded(!isInternalExpanded)
      }
    }, [disabled, isControlled, isExpanded, isInternalExpanded, onToggle])

    const onClose = useCallback(() => {
      if (isControlled) {
        if (onToggle) onToggle(false)
      } else {
        setIsInternalExpanded(false)
      }
    }, [isControlled, onToggle])

    const onKeyDown = useCallback(
      (ev: React.KeyboardEvent) => {
        if (disabled) return

        if (ev.key === 'Enter' || ev.key === ' ') {
          onChange()
        } else if (ev.key === 'Escape') {
          onClose()
        }
      },
      [disabled, onChange, onClose],
    )

    useImperativeHandle(
      controlRef,
      () => ({
        toggle() {
          onChange()
        },
      }),
      [onChange],
    )

    return (
      <div
        className={classNames('accordion-container', {
          isExpanded,
          shadow: !!shadowOnExpand,
        })}
        ref={accordionRef}
        style={{ width: typeof width === 'number' ? `${width}px` : width }}
      >
        <div
          className={classNames('accordion-header')}
          onClick={onChange}
          onKeyDown={onKeyDown}
        >
          <Text
            font="medium"
            size={16}
            fontWeight={600}
            lineHeight={20}
            color="--primary-dark"
            className="accordion-title"
          >
            {title}
          </Text>
          <div className="accordion-icon-container">
            <Icon
              name={isExpanded ? 'minus' : 'add-dark'}
              width={24}
              height={24}
            />
          </div>
        </div>
        <div
          ref={contentRef}
          className="accordion-content"
          style={{
            maxHeight: isExpanded ? contentHeight : 0,
            height: isExpanded ? contentHeight : 0,
          }}
        >
          {children}
        </div>
      </div>
    )
  },
)

export default Accordion
