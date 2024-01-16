import { Control } from 'react-hook-form'

export interface IUserSettingsProps {
  onClose: () => void
}

export type TControl = Control<
  {
    companyName: string
    language: string
    surveySenders: string[] | undefined
    apiKey: string | undefined
    primaryColor: string | undefined
    useBackgroundColor: boolean | undefined
    fontHeadline: string | undefined
    fontStandard: string | undefined
    fontMenu: string | undefined
    upperCaseHeader: boolean | undefined
    customerNumber: string | undefined
    owner: string | undefined
    calculationModel: string | undefined
    businessTemplate: string | undefined
  },
  any
>
