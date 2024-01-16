import React from 'react'

import { t } from '@/i18n'
import { IUser, TFunc } from '@/types'
import { Avatar, Container, Icon, Modal, Text } from '@/components'
import { fullName } from '@/utils'

import './user-detail.scss'

interface Props {
  user: IUser | undefined
  onClose: TFunc
}

const UserDetail: React.FC<Props> = ({ user, onClose }) => {
  return (
    <Modal
      isOpen={!!user}
      className="user-detail-modal"
      header={
        <Container align="center" gap={8} className="user-detail-modal-header">
          <Avatar
            className="user-pic"
            size={40}
            imageUrl={user?.profilePicture}
            initials={[user?.firstName, user?.lastName]}
            status="active"
          />
          <Text
            font="medium"
            size={14}
            fontWeight={500}
            lineHeight={20}
            color="--primary-dark"
          >
            {fullName(user?.firstName, user?.lastName)}
          </Text>
        </Container>
      }
      onClose={onClose}
    >
      <Container col gap={12} className="user-detail-modal-body">
        <Container align="center" gap={8}>
          <Icon name="sms-tracking" />
          <Text
            font="medium"
            fontWeight={500}
            size={14}
            lineHeight={20}
            color="--primary-default"
            className="flex-1"
          >
            {t('adminUsersPage.modal.email')}
          </Text>
          <Text
            font="regular"
            fontWeight={400}
            size={14}
            lineHeight={20}
            color="--primary-default"
            className="flex-1 shrink-0"
          >
            {user?.email}
          </Text>
        </Container>
        <Container align="center" gap={8}>
          <Icon name="call" />
          <Text
            font="medium"
            fontWeight={500}
            size={14}
            lineHeight={20}
            color="--primary-default"
            className="flex-1"
          >
            {t('adminUsersPage.modal.telephone')}
          </Text>
          <Text
            font="regular"
            fontWeight={400}
            size={14}
            lineHeight={20}
            color="--primary-default"
            className="flex-1 shrink-0"
          >
            {user?.phone}
          </Text>
        </Container>
      </Container>
    </Modal>
  )
}

export default UserDetail
