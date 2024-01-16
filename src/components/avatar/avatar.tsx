import React, { forwardRef, useMemo } from 'react'
import classNames from 'classnames'

import placeholder from '@/assets/images/avatar.png'
import { getInitial } from '@/utils'
import { Container } from '../container'
import { Text } from '../text'
import { IAvatarProps } from './types'
import './avatar.scss'

export const Avatar = forwardRef<HTMLDivElement, IAvatarProps>(
  ({ className, size = 20, imageUrl, initials, status, onClick }, ref) => {
    const url = useMemo(() => {
      if (imageUrl) return imageUrl
      if (initials?.length) return null
      return placeholder
    }, [imageUrl, initials?.length])

    return (
      <Container
        ref={ref}
        className={classNames('avatar-container', className)}
        gap={8}
        align="center"
        justify="center"
        style={{ width: size, height: size }}
        onClick={onClick}
      >
        {!!url && <img src={url} alt="Avatar" />}
        {!!initials && !url && (
          <Text
            font="medium"
            size={14}
            lineHeight={20}
            fontWeight={500}
            color="--primary-dark"
          >
            {getInitial(initials)}
          </Text>
        )}
        {!!status && <div className={classNames('status', status)} />}
      </Container>
    )
  },
)

export default Avatar
