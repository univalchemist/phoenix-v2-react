import type { Meta, StoryObj } from '@storybook/react'

import { FullScreenLoader } from '.'
import { IFullScreenLoaderProps } from './types'

const meta = {
  title: 'Component/FullScreenLoader',
  component: FullScreenLoader,
  tags: ['autodocs'],
  argTypes: {
    semi: { options: [true, false], control: { type: 'radio' } },
    sectionLoader: { options: [true, false], control: { type: 'radio' } },
    loading: { options: [true, false], control: { type: 'radio' } },
    loadingText: { control: { type: 'text' } },
  },
  args: {
    loading: true,
    loadingText: 'Loading...',
  },
} satisfies Meta<typeof FullScreenLoader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IFullScreenLoaderProps) => (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <p>This is background text</p>
      <FullScreenLoader {...props} />
    </div>
  ),
}
