import React from 'react'

export const Form: React.FC<React.HTMLAttributes<HTMLFormElement>> = ({
  onSubmit,
  children,
  ...rest
}) => (
  <form
    onSubmit={e => {
      e.preventDefault()
      e.stopPropagation()
      onSubmit?.(e)
    }}
    {...rest}
  >
    {children}
  </form>
)

export default Form
