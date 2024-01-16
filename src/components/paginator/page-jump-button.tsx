import React from 'react'

import { t } from '@/i18n'
import { Button } from '../button'
import { IPageJumpButtonProps } from './types'
import classNames from 'classnames'

const PageJumpButton: React.FC<IPageJumpButtonProps> = ({
  visible,
  disabled,
  toNext,
  defaultBtn,
  onClick,
}) => {
  if (defaultBtn) {
    return <>{defaultBtn(() => (visible ? onClick() : null))}</>
  }

  return (
    <Button
      className={classNames('page-jump-btn', { invisible: !visible })}
      disabled={disabled}
      iconLeft={toNext ? undefined : 'arrow-left'}
      iconRight={toNext ? 'arrow-right' : undefined}
      variant="pure"
      onClick={() => visible && onClick()}
    >
      {toNext ? t('common.next') : t('common.previous')}
    </Button>
  )
}

export default PageJumpButton
