import React from 'react'

import { t } from '@/i18n'
import { ICustomer, TFunc } from '@/types'
import { Avatar, Container, Modal, Text } from '@/components'
import { useAdminCustomer } from '@/hooks'

import './customer-detail.scss'

interface Props {
  isOpen: boolean
  customer: ICustomer | undefined
  onClose: TFunc
}

const CustomerDetail: React.FC<Props> = ({ isOpen, customer, onClose }) => {
  const { projects } = useAdminCustomer()

  return (
    <Modal
      isOpen={!!customer && isOpen}
      className="customer-detail-modal"
      header={
        <Container
          align="center"
          gap={8}
          className="customer-detail-modal-header"
        >
          <Avatar
            className="customer-pic"
            size={40}
            imageUrl={customer?.profilePicture}
            initials={[customer?.companyName]}
          />
          <Text
            font="medium"
            size={14}
            fontWeight={500}
            lineHeight={20}
            color="--primary-dark"
          >
            {customer?.companyName}
          </Text>
        </Container>
      }
      onClose={onClose}
    >
      <Container col className="customer-detail-modal-body">
        <Text
          font="medium"
          size={16}
          fontWeight={500}
          lineHeight={20}
          color="--primary-default"
          className="container-title"
        >
          {t('adminCustomersPage.modal.projects')}
        </Text>
        <Container col className="scroll-container custom-scrollbar">
          {projects.map(p => (
            <a key={p.id} className="project-item">
              <Text
                font="regular"
                size={14}
                fontWeight={400}
                lineHeight={20}
                color="--blue-default"
              >
                {p.title}
              </Text>
            </a>
          ))}
        </Container>
      </Container>
    </Modal>
  )
}

export default CustomerDetail
