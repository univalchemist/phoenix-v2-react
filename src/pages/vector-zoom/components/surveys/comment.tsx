import React from 'react'

import { Button, Icon, Text, Popover, Container, Avatar } from '@/components'
import { IVectorSurvey } from '@/types'
import { t } from '@/i18n'
import { formatDateTime, fullName } from '@/utils'

interface Props {
  survey: IVectorSurvey
}

const Comment: React.FC<Props> = ({ survey }) => {
  return (
    <Popover
      placement="bottom-end"
      positioning="fixed"
      WrapEl="div"
      className="comments-wrapper"
      button={
        <Button variant="pure" className="comment-btn">
          <Icon name="message-2" />
          <Text font="regular" size={14} lineHeight={20} color="--blue-default">
            {survey.comments.length}
          </Text>
        </Button>
      }
    >
      {onClose => (
        <Container col className="comments-container">
          <Container
            align="center"
            justify="space-between"
            className="comments-header"
          >
            <Text
              font="medium"
              size={16}
              color="--primary-dark"
              lineHeight={20}
            >
              {t('vectorZoomPage.comments')}
            </Text>
            <Button variant="pure" className="comments-close" onClick={onClose}>
              <Icon name="x-close" width={20} height={20} />
            </Button>
          </Container>
          <Container col className="comments-list-container custom-scrollbar">
            {survey.comments.map(c => (
              <Container
                key={c.id}
                align="flex-start"
                gap={12}
                className="comment-item"
              >
                <Avatar size={40} imageUrl={c.user.profilePicture} />
                <Container col gap={4} className="flex-1">
                  <Container align="center" gap={12} justify="space-between">
                    <Text
                      font="medium"
                      size={14}
                      color="--primary-dark"
                      lineHeight={20}
                    >
                      {fullName(c.user.firstName, c.user.lastName)}
                    </Text>
                    <Text
                      font="medium"
                      size={12}
                      color="--secondary"
                      lineHeight={16}
                    >
                      {formatDateTime(c.createdAt, 'HH:mm')}
                    </Text>
                  </Container>
                  <Text
                    noWrap={false}
                    font="regular"
                    size={14}
                    color="--primary-light"
                    lineHeight={20}
                  >
                    {c.comment}
                  </Text>
                </Container>
              </Container>
            ))}
          </Container>
        </Container>
      )}
    </Popover>
  )
}

export default Comment
