import React from 'react'
import classNames from 'classnames'

import { Icon, TextInput } from '@/components'
import { useSearch } from '@/hooks'

import { type ISearchInputProps } from './types'
import './search-input.scss'

export const SearchInput: React.FC<ISearchInputProps> = ({
  initial,
  debounce = 300,
  className,
  placeholder,
  onSearch,
  ...rest
}) => {
  const { text, onChangeText } = useSearch(debounce, initial, onSearch)

  return (
    <div className={classNames('search-input', className)}>
      <Icon name="search" />
      <TextInput
        {...rest}
        type="text"
        placeholder={placeholder}
        value={text ?? ''}
        onChange={e => onChangeText(e.target.value)}
      />
    </div>
  )
}
