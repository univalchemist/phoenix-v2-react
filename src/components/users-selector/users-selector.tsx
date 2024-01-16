import { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'

import { fullName } from '@/utils'
import { Popover } from '../popover'
import { Container } from '../container'
import { Icon } from '../icon'
import { FormError } from '../form-error'
import { Text } from '../text'
import { Avatar } from '../avatar'
import UserItem from './user-item'
import { IUsersSelectorProps } from './types'
import './users-selector.scss'

export const UsersSelector = <T extends 'multi' | 'single' = 'multi'>({
  value,
  data,
  type,
  disabled,
  className,
  placeholder,
  label,
  error,
  required,
  placement,
  positioning,
  onChange,
}: IUsersSelectorProps<T>) => {
  const [selected, setSelected] = useState<string[] | undefined>()

  useEffect(() => {
    if (!selected && value) {
      setSelected(typeof value === 'string' ? [value] : value)
    }
  }, [selected, value])

  const [displayLabel, isPlaceholder]: [string | undefined, boolean] =
    useMemo(() => {
      if (!selected) return [placeholder, true]

      if (type === 'multi') {
        return [placeholder, true]
      }

      const _selected = data.find(({ id }) => selected.includes(id))
      return [
        selected
          ? fullName(_selected?.firstName, _selected?.lastName)
          : placeholder,
        !_selected,
      ]
    }, [data, placeholder, selected, type])

  const onSelect = useCallback(
    (id: string) => {
      let _selected = [id]
      if (type === 'single') {
        _selected = [id]
      } else {
        _selected = [...(selected || []), id]
      }
      setSelected(_selected)
      // @ts-ignore
      onChange(type === 'multi' ? _selected : _selected[0])
    },
    [onChange, selected, type],
  )

  const onRemove = useCallback(
    (id: string) => {
      const _selected = (selected || []).filter(d => d !== id)
      setSelected(_selected)
      // @ts-ignore
      onChange(type === 'multi' ? _selected : _selected[0])
    },
    [onChange, selected, type],
  )

  return (
    <div
      className={classNames('custom-users-select', className, {
        disabled: !!disabled,
        error: !!error,
      })}
    >
      {!!label && (
        <span className="form-label name">
          {label}
          {!!required && <sup>*</sup>}
        </span>
      )}
      <Popover
        className="select-container"
        WrapEl="div"
        disabled={disabled}
        distance={10}
        placement={placement}
        positioning={positioning}
        button={
          <div
            className={classNames('select-field', {
              placeholder: isPlaceholder,
            })}
          >
            <Text
              ellipsis
              className="flex-1"
              font="medium"
              size={14}
              lineHeight={20}
              fontWeight={isPlaceholder ? 400 : 500}
              color={isPlaceholder ? '--primary-light' : '--primary-default'}
            >
              {displayLabel}
            </Text>
            <Icon name="chevron-down" width={16} height={16} />
          </div>
        }
      >
        {onClose => (
          <Container col className="options-container custom-scrollbar">
            {data.map((datum, idx) => {
              return (
                <Container
                  key={`${idx} - ${datum.id}`}
                  gap={12}
                  align="center"
                  className={classNames('user-item hoverable', {
                    active: selected?.includes(datum.id),
                  })}
                  onClick={() => {
                    if (!selected?.includes(datum.id)) {
                      onSelect(datum.id)
                    }
                    if (type === 'single') {
                      onClose()
                    }
                  }}
                >
                  <Avatar size={20} imageUrl={datum.profilePicture} />
                  <Text
                    font="regular"
                    size={14}
                    lineHeight={20}
                    color="--primary-dark"
                  >
                    {fullName(datum.firstName, datum.lastName)}
                  </Text>
                </Container>
              )
            })}
          </Container>
        )}
      </Popover>
      <FormError error={error} />
      {type === 'multi' && !!selected?.length && (
        <Container align="center" gap={8} className="selected-users">
          {selected.map((s, idx) => (
            <UserItem
              key={`${idx} - ${s}`}
              data={data}
              id={s}
              onRemove={() => onRemove(s)}
            />
          ))}
        </Container>
      )}
    </div>
  )
}

export default UsersSelector
