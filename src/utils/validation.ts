import * as yup from 'yup'

import { t } from '@/i18n'
import { IImageSize } from '@/types'

export const validateImageSize = (
  file: File,
  size?: IImageSize,
): Promise<boolean> => {
  return new Promise(resolve => {
    if (!size) {
      return resolve(true)
    }
    const img = new Image()
    const _URL = window.URL || window.webkitURL
    const objectUrl = _URL.createObjectURL(file)
    img.onload = function () {
      if (img.width <= size.width && img.width <= size.height) {
        return resolve(true)
      }
      _URL.revokeObjectURL(objectUrl)
      return resolve(false)
    }
    img.src = objectUrl
  })
}

export const loginFormSchema = yup
  .object()
  .shape({
    email: yup.string().email(t('invalidEmail')).required(t('emailRequired')),
    password: yup
      .string()
      .required(t('passwordRequired'))
      .min(6, t('invalidPassword')),
  })
  .required()

export const rteLinkFormSchema = yup
  .object()
  .shape({
    text: yup.string().required(t('fieldRequired')),
    link: yup.string().url(t('invalidValue')).required(t('fieldRequired')),
  })
  .required()

export const rteImageFormSchema = yup
  .object()
  .shape({
    src: yup.string().required(t('fieldRequired')),
    width: yup.string().optional(),
    height: yup.string().optional(),
  })
  .required()

export const vectorActionSchema = yup.object().shape({
  name: yup.string().required(t('fieldRequired')),
  priority: yup
    .string()
    .oneOf(['high', 'medium', 'low', 'crucial'])
    .strict(true)
    .required(t('fieldRequired')),
  due: yup.string().required(t('fieldRequired')),
  assignee: yup.string().required(t('fieldRequired')),
  status: yup
    .string()
    .oneOf([
      'completed',
      'pending',
      'in-progress',
      'not-started',
      'on-hold',
      'overdue',
    ])
    .strict(true)
    .required(t('fieldRequired')),
})

export const customerSchema = yup.object().shape({
  email: yup.string().email(t('invalidEmail')).optional(),
  companyName: yup.string().required(t('fieldRequired')),
  customerNumber: yup.string().optional(),
  language: yup.string().required(t('fieldRequired')),
  industry: yup.string().optional(),
  foundedYear: yup.string().optional(),
  numberOfEmployees: yup.string().optional(),
  numberOfBusinessUnits: yup.string().optional(),
  customerPosition: yup.string().optional(),
  representatives: yup.array().of(yup.string().required()).optional(),
})

export const projectSchema = (linkedToStrategic?: boolean, step = 0) =>
  yup.object().shape({
    title: yup.string().required(t('fieldRequired')),
    from: yup.string().optional(),
    to: yup.string().optional(),
    type:
      step === 1
        ? yup.string().required(t('fieldRequired'))
        : yup.string().optional(),
    purpose: yup.string().required(t('fieldRequired')),
    goal: yup.string().required(t('fieldRequired')),
    goalLinked: linkedToStrategic
      ? yup.string().required(t('fieldRequired'))
      : yup.string().optional(),
    challenge: linkedToStrategic
      ? yup.string().required(t('fieldRequired'))
      : yup.string().optional(),
    vectors: yup.array().of(yup.string().required()).optional(),
    surveyInterval:
      step === 2
        ? yup
            .string()
            .oneOf(['every-month', '2-months', '3-months', 'days'])
            .strict(true)
            .required(t('fieldRequired'))
        : yup
            .string()
            .oneOf(['every-month', '2-months', '3-months', 'days'])
            .optional(),
    baselineDate: yup.string().optional(),
    questionModeling:
      step === 2
        ? yup
            .string()
            .oneOf(['straight', 'partly-random', 'random'])
            .strict(true)
            .required(t('fieldRequired'))
        : yup
            .string()
            .oneOf(['straight', 'partly-random', 'random'])
            .optional(),
  })

export const vectorSchema = yup.object().shape({
  name: yup.string().required(t('fieldRequired')),
  description: yup.string().optional(),
  measurementType: yup.string().optional(),
  vision: yup.string().required(t('fieldRequired')),
  status: yup
    .string()
    .oneOf(['completed', 'pending', 'in-progress'])
    .strict(true)
    .required(t('fieldRequired')),
})

export const userSettingsSchema = (step = 0) =>
  yup.object().shape({
    companyName: yup.string().required(t('fieldRequired')),
    language: yup.string().required(t('fieldRequired')),
    surveySenders: yup.array().of(yup.string().required()).optional(),
    apiKey:
      step > 0
        ? yup.string().required(t('fieldRequired'))
        : yup.string().optional(),
    primaryColor: yup.string().optional(),
    useBackgroundColor: yup.boolean().optional(),
    fontHeadline: yup.string().optional(),
    fontStandard: yup.string().optional(),
    fontMenu: yup.string().optional(),
    upperCaseHeader: yup.boolean().optional(),
    customerNumber:
      step > 1
        ? yup.string().required(t('fieldRequired'))
        : yup.string().optional(),
    owner:
      step > 1
        ? yup.string().required(t('fieldRequired'))
        : yup.string().optional(),
    calculationModel:
      step > 1
        ? yup.string().required(t('fieldRequired'))
        : yup.string().optional(),
    businessTemplate:
      step > 1
        ? yup.string().required(t('fieldRequired'))
        : yup.string().optional(),
  })
