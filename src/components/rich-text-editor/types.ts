export interface IRichTextEditorProps {
  className?: string
  label?: string
  initialValue?: string
  placeholder?: string
  error?: string
  required?: boolean
  disabled?: boolean
  minHeight?: number
  maxHeight?: number
  onChange?: (_value: string) => void
}
