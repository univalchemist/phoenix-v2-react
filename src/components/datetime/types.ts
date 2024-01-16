export interface IDateTimeProps {
  value: string | number | Date | undefined | null
  format?: string
  mode?: 'diff' | 'humanize' | null
  className?: string
  placeholder?: string
  WrapEl?: React.ElementType<any>
}
