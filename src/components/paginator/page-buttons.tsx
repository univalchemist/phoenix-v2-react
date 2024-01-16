import React from 'react'
import classNames from 'classnames'

import { IPageButtonsProps } from './types'

const PageButtons: React.FC<IPageButtonsProps> = ({
  range,
  currentPage,
  disabled,
  onPageChange,
}) => {
  return (
    <>
      {range.map((page: string | number, idx: number) => {
        const previousPage = range?.[idx - 1] || 0
        return (
          <React.Fragment key={idx}>
            {+page - +previousPage > 1 && <li>...</li>}
            <li
              key={idx}
              className={classNames('page-button', {
                disabled,
                active: currentPage === page,
              })}
              onClick={() => {
                !isNaN(+page) && onPageChange?.(+page)
              }}
            >
              <span>{page}</span>
            </li>
          </React.Fragment>
        )
      })}
    </>
  )
}

export default PageButtons
