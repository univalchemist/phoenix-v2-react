import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

import {
  ICustomer,
  INotification,
  IProject,
  IProjectType,
  ISurveyComment,
  IUser,
  IVector,
  IVectorAction,
  IVectorGoal,
  IVectorSurvey,
  TActionStatus,
  TPriority,
  TProjectStatus,
  TProjectSurveyInterval,
  TQuestionModeling,
  TSurveyStatus,
  TUserStatus,
} from '@/types'
import { formatDateTime } from './date-time'

const getActionTime = (isPast?: boolean, defaultDay?: Date) => {
  if (isPast) {
    const base = defaultDay
      ? moment(defaultDay)
      : moment().subtract(faker.number.int({ min: 0, max: 2 }), 'days')
    return base
      .subtract(faker.number.int({ min: 0, max: 2 }), 'hours')
      .format('YYYY-MM-DD HH:mm')
  }

  const base = defaultDay
    ? moment(defaultDay)
    : moment().add(faker.number.int({ min: 0, max: 2 }), 'days')

  return base
    .add(faker.number.int({ min: 0, max: 2 }), 'hours')
    .format('YYYY-MM-DD HH:mm')
}

const pickRandomValue = <T extends string>(data: T[]): T => {
  return data[faker.number.int({ min: 0, max: data.length - 1 })]
}

export const mockNotifications = (): INotification[] => {
  const createNotifications = () => {
    return {
      id: uuid(),
      title: faker.lorem.sentence(5),
      content: faker.lorem.sentences(2),
      read: faker.number.int({ min: 0, max: 15 }) % 3 === 0,
      time: getActionTime(true),
    }
  }
  const _notifications: INotification[] = faker.helpers.multiple(
    createNotifications,
    {
      count: 30,
    },
  )

  return _notifications
}

export const mockUser = (): IUser => ({
  id: uuid(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  customer: mockCustomer(),
  status: pickRandomValue<TUserStatus>(['active', 'pending', 'in-active']),
  profilePicture: faker.image.url({ width: 50, height: 50 }),
  createdAt: getActionTime(true),
  updatedAt: getActionTime(true),
})

export const mockSurveyComments = (date: Date): ISurveyComment[] => {
  const _date = moment(date)
    .add(faker.number.int({ min: 0, max: 17 }), 'days')
    .toDate()
  const createComment = (): ISurveyComment => ({
    id: uuid(),
    comment: faker.lorem.sentence(14),
    user: mockUser(),
    createdAt: getActionTime(true, _date),
    updatedAt: getActionTime(true, _date),
  })

  return faker.helpers.multiple(createComment, {
    count: faker.number.int({ min: 10, max: 15 }),
  })
}

export const mockProjectVectorSurveys = (count = 3): IVectorSurvey[] => {
  return Array(count)
    .fill(0)
    .map((_, idx) => {
      const date = moment(new Date()).subtract(idx, 'days').toDate()
      return {
        id: uuid(),
        question: faker.lorem.sentence(5),
        answer: faker.lorem.sentence(5),
        value: faker.number.int({ min: 40, max: 73 }),
        respondents: faker.number.int({ min: 40, max: 73 }),
        customer: mockCustomer(),
        vectors: faker.number.int({ min: 40, max: 73 }),
        comments: mockSurveyComments(date),
        status: pickRandomValue<TSurveyStatus>([
          'active',
          'pending',
          'in-active',
        ]),
        createdAt: getActionTime(true, date),
        updatedAt: getActionTime(true, date),
      }
    })
}

export const mockVectorSurveys = (): IVectorSurvey[] => {
  return Array(+formatDateTime(new Date(), 'M'))
    .fill(0)
    .map((_, idx) => {
      const date = moment(new Date())
        .startOf('year')
        .add(idx, 'months')
        .add(faker.number.int({ min: 0, max: 12 }), 'days')
        .add(4, 'hours')
        .toDate()
      return {
        id: uuid(),
        question: faker.lorem.sentence(5),
        answer: faker.lorem.sentence(5),
        value: faker.number.int({ min: 40, max: 73 }),
        customer: mockCustomer(),
        vectors: faker.number.int({ min: 40, max: 73 }),
        respondents: faker.number.int({ min: 40, max: 73 }),
        comments: mockSurveyComments(date),
        status: pickRandomValue<TSurveyStatus>([
          'active',
          'pending',
          'in-active',
        ]),
        createdAt: getActionTime(true, date),
        updatedAt: getActionTime(true, date),
      }
    })
}

export const mockVectorGoal = (): IVectorGoal => ({
  id: uuid(),
  name: faker.lorem.sentence(2),
  target: faker.number.int({ min: 75, max: 99 }),
  createdAt: getActionTime(true),
  updatedAt: getActionTime(true),
})

export const mockVectorAction = (): IVectorAction => ({
  id: uuid(),
  name: faker.lorem.sentence(2),
  priority: pickRandomValue<TPriority>(['high', 'medium', 'low', 'crucial']),
  status: pickRandomValue<TActionStatus>([
    'completed',
    'pending',
    'in-progress',
    'not-started',
    'on-hold',
    'overdue',
  ]),
  due: getActionTime(false),
  assignee: mockUser(),
  createdAt: getActionTime(true),
  updatedAt: getActionTime(true),
})

export const mockVector = (name: string, idx?: number): IVector => ({
  id: uuid(),
  name,
  surveys: mockVectorSurveys(),
  goal: mockVectorGoal(),
  value: faker.number.int({ min: 50, max: 88 }),
  vision: faker.lorem.sentence(5),
  actions: faker.helpers.multiple(mockVectorAction, {
    count: faker.number.int({ min: 6, max: 12 }),
  }),
  status: pickRandomValue<TProjectStatus>([
    'completed',
    'pending',
    'in-progress',
  ]),
  createdAt:
    idx !== undefined
      ? getActionTime(true, moment(new Date()).subtract(idx, 'days').toDate())
      : moment()
          .startOf('year')
          .add(faker.number.int({ min: 1, max: 9 }), 'days')
          .format('YYYY-MM-DD HH:mm'),
  updatedAt:
    idx !== undefined
      ? getActionTime(true, moment(new Date()).subtract(idx, 'days').toDate())
      : moment()
          .startOf('year')
          .add(faker.number.int({ min: 1, max: 9 }), 'days')
          .format('YYYY-MM-DD HH:mm'),
})

export const mockVectors = (): IVector[] => {
  return [
    'NPS',
    'Diversity',
    'Growth Opportunities',
    'Work Life Balance',
    'Wages',
    'Culture',
  ].map(vector => mockVector(vector))
}

export const mockProjectVectors = (idx: number): IVector[] => {
  const createVector = (name: string): IVector => {
    const time = getActionTime(
      true,
      moment(new Date()).subtract(idx, 'days').toDate(),
    )
    return {
      id: uuid(),
      name,
      vision: faker.lorem.sentence(5),
      surveys: mockProjectVectorSurveys(),
      goal: mockVectorGoal(),
      value: faker.number.int({ min: 50, max: 88 }),
      actions: faker.helpers.multiple(mockVectorAction, {
        count: faker.number.int({ min: 2, max: 4 }),
      }),
      status: pickRandomValue<TProjectStatus>([
        'completed',
        'pending',
        'in-progress',
      ]),
      createdAt: time,
      updatedAt: time,
    }
  }
  return [
    'NPS',
    'Diversity',
    'Growth Opportunities',
    'Work Life Balance',
    'Wages',
    'Culture',
  ].map(vector => createVector(vector))
}

export const mockProjectType = (): IProjectType => ({
  id: uuid(),
  name: faker.lorem.sentence(4),
  description: faker.lorem.paragraph(3),
  createdAt: getActionTime(true),
  updatedAt: getActionTime(true),
})

export const mockProjectTypes = (count?: number): IProjectType[] => {
  return faker.helpers.multiple(mockProjectType, {
    count: count || faker.number.int({ min: 6, max: 12 }),
  })
}

export const mockProjects = (): IProject[] => {
  const createProject = (idx: number): IProject => ({
    id: uuid(),
    title: faker.lorem.sentence(3),
    status: pickRandomValue<TProjectStatus>([
      'completed',
      'pending',
      'in-progress',
    ]),
    vectors: mockProjectVectors(idx),
    customer: mockCustomer(),
    type: uuid(),
    from: getActionTime(false),
    to: getActionTime(false),
    purpose: faker.lorem.sentence(4),
    goal: faker.lorem.sentence(4),
    goalLinked: faker.lorem.paragraph(3),
    challenge: faker.lorem.paragraph(3),
    surveyInterval: pickRandomValue<TProjectSurveyInterval>([
      'every-month',
      '2-months',
      '3-months',
      'days',
    ]),
    baselineDate: getActionTime(false),
    questionModeling: pickRandomValue<TQuestionModeling>([
      'straight',
      'partly-random',
      'random',
    ]),
    createdAt: getActionTime(true, moment().subtract(idx, 'days').toDate()),
    updatedAt: getActionTime(true, moment().subtract(idx, 'days').toDate()),
  })

  return [0, 1, 2, 3, 4].map(idx => createProject(idx))
}

export const mockUsers = (count?: number): IUser[] => {
  return faker.helpers.multiple(mockUser, {
    count: count || faker.number.int({ min: 6, max: 12 }),
  })
}

export const mockCustomer = (): ICustomer => ({
  id: uuid(),
  email: faker.internet.email(),
  companyName: faker.company.name(),
  customerNumber: faker.number.int({ min: 100000, max: 999999 }).toString(),
  language: 'English',
  profilePicture: faker.image.url({ width: 50, height: 50 }),
  industry: faker.company.name(),
  foundedYear: faker.number.int({ min: 2000, max: 2023 }).toString(),
  numberOfEmployees: faker.number.int({ min: 10, max: 35 }).toString(),
  numberOfBusinessUnits: faker.number.int({ min: 100, max: 500 }).toString(),
  customerPosition: faker.company.name(),
  representatives: Array(faker.number.int({ min: 1, max: 20 })).fill(uuid()),
  projects: faker.number.int({ min: 3, max: 15 }),
  createdAt: getActionTime(true),
  updatedAt: getActionTime(true),
})

export const mockCustomers = (): ICustomer[] => {
  return faker.helpers.multiple(mockCustomer, {
    count: faker.number.int({ min: 50, max: 80 }),
  })
}

export const meMock: IUser = {
  id: uuid(),
  firstName: 'Erik',
  lastName: 'Grensma',
  email: 'erik.grensma@gmail.com',
  profilePicture: 'https://picsum.photos/200',
  status: 'active',
  customer: mockCustomer(),
  createdAt: getActionTime(true),
  updatedAt: getActionTime(true),
}
