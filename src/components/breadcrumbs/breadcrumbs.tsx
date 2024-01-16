import React, { forwardRef } from 'react'
import classNames from 'classnames'

import { Container } from '../container'
import { Icon } from '../icon'
import { IBreadcrumbsProps } from './types'
import './breadcrumbs.scss'

export const Breadcrumbs = forwardRef<HTMLDivElement, IBreadcrumbsProps>(
  ({ className, breadcrumbs, onClick }, ref) => {
    if (!breadcrumbs.length) return null

    return (
      <Container
        ref={ref}
        className={classNames('breadcrumbs-container', className)}
        gap={6}
        align="center"
        justify="flex-start"
      >
        {breadcrumbs.map((breadcrumb, idx) => (
          <>
            <span
              key={idx}
              className={classNames('bread-crumb', {
                current: idx === breadcrumbs.length - 1,
              })}
              onClick={() =>
                idx < breadcrumbs.length - 1
                  ? onClick?.(breadcrumb.value)
                  : null
              }
            >
              {breadcrumb.label}
            </span>
            <Icon name="chevron-right" />
          </>
        ))}
      </Container>
    )
  },
)

export default Breadcrumbs
