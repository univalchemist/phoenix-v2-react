export interface ICheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean
  label?: string
  onChange?: (_val: boolean) => void
  disabled?: boolean
  className?: string
}
