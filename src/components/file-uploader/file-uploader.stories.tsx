import { useCallback } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { fileTypeMap } from '@/constants'
import { FileAllowedTypes } from '@/types'
import { IFileUploaderProps } from './types'
import { FileUploader } from '.'

const meta = {
  title: 'Component/FileUploader',
  component: FileUploader,
  tags: ['autodocs'],
  argTypes: {
    label: { control: { type: 'text' } },
    required: { options: [true, false], control: { type: 'radio' } },
    allowedTypes: { control: { type: 'array' } },
    allowedSize: { control: { type: 'object' } },
  },
  args: {
    label: 'Profile Picture',
    allowedSize: { width: 800, height: 400 },
    allowedTypes: Object.keys(fileTypeMap) as FileAllowedTypes[],
  },
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IFileUploaderProps) => {
    const onLoadFiles = useCallback((file: File | null) => {
      console.log('File loaded: ', file)
    }, [])

    return (
      <div className="file-upload-stories">
        <FileUploader {...props} onLoad={onLoadFiles} />
      </div>
    )
  },
}
