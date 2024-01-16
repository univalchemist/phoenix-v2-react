import type { Meta, StoryObj } from '@storybook/react'

import { useToggle } from '@/hooks'
import { Button } from '../button'
import { Container } from '../container'
import { Modal } from '.'
import { IModalProps } from './types'

const meta = {
  title: 'Component/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
    },
    subTitle: { control: { type: 'text' } },
    isOpen: { options: [true, false], control: { type: 'radio' } },
    closeOnBackdrop: { options: [true, false], control: { type: 'radio' } },
    showCloseButton: { options: [true, false], control: { type: 'radio' } },
  },
  args: {
    closeOnBackdrop: true,
    header: 'Project Information',
    subTitle: 'This is description',
    children: null,
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IModalProps) => {
    const [show, toggleShow] = useToggle(props.isOpen)

    return (
      <>
        <Button className="main-btn" onClick={() => toggleShow()}>
          Open modal
        </Button>
        <Modal {...props} isOpen={show} onClose={() => toggleShow()}>
          <div>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </div>
        </Modal>
      </>
    )
  },
}

export const WithHeader: Story = {
  render: (props: IModalProps) => {
    const [show, toggleShow] = useToggle(props.isOpen)

    return (
      <>
        <Button className="main-btn" onClick={() => toggleShow()}>
          Open modal
        </Button>
        <Modal
          {...props}
          isOpen={show}
          onClose={() => toggleShow()}
          header={
            <Container col gap={6}>
              <h3 className="modal-title">Create a new customer</h3>
              <span>
                Fields marked with * are required and must be filled out.
              </span>
            </Container>
          }
        >
          <div>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </div>
        </Modal>
      </>
    )
  },
}

export const WithFooter: Story = {
  render: (props: IModalProps) => {
    const [show, toggleShow] = useToggle(props.isOpen)

    return (
      <>
        <Button className="main-btn" onClick={() => toggleShow()}>
          Open modal
        </Button>
        <Modal
          {...props}
          isOpen={show}
          onClose={() => toggleShow()}
          footer={
            <>
              <Button variant="outline" onClick={() => toggleShow()}>
                Cancel
              </Button>
              <Button variant="main" onClick={() => toggleShow()}>
                Confirm
              </Button>
            </>
          }
        >
          <div>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </div>
        </Modal>
      </>
    )
  },
}

export const WithLongContent: Story = {
  render: (props: IModalProps) => {
    const [show, toggleShow] = useToggle(props.isOpen)

    return (
      <>
        <Button className="main-btn" onClick={() => toggleShow()}>
          Open modal
        </Button>
        <Modal
          {...props}
          isOpen={show}
          onClose={() => toggleShow()}
          footer={
            <>
              <Button variant="outline" onClick={() => toggleShow()}>
                Cancel
              </Button>
              <Button variant="main" onClick={() => toggleShow()}>
                Confirm
              </Button>
            </>
          }
        >
          <div>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </div>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
          <p>
            Write any custom instructions you would like to include. If
            instructions override previously selected parameters, these
            instructions will be used.
          </p>
        </Modal>
      </>
    )
  },
}
