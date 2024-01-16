import { useForm, Controller, FieldValues, UseFormProps } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { type ObjectSchema } from 'yup'

export const useHookForm = <
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TTransformedValues extends FieldValues | undefined = undefined,
>(
  schema: ObjectSchema<TFieldValues>,
  props?: UseFormProps<TFieldValues, TContext>,
) => {
  const handler = useForm<TFieldValues, TContext, TTransformedValues>({
    ...props,
    resolver: yupResolver(schema),
  })

  return { Controller, handler }
}
