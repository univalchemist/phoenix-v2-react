import type { Meta, StoryObj } from '@storybook/react'

import { RichTextEditor } from '.'
import { IRichTextEditorProps } from './types'
import { useEffect, useState } from 'react'

const meta = {
  title: 'Component/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  argTypes: {
    label: { defaultValue: 'Message', control: { type: 'text' } },
    required: {
      control: { type: 'radio' },
      options: [true, false],
    },
    initialValue: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    error: { control: { type: 'text' } },
    className: { control: { type: 'text' } },
    minHeight: { control: { type: 'number' } },
    maxHeight: { control: { type: 'number' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
  },
  args: {
    label: 'Describe the strategic goal (that the project is linked to)',
    initialValue: '<p><strong>BOLD</strong> HTML</p>',
  },
} satisfies Meta<typeof RichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: IRichTextEditorProps) => {
    const [value, setValue] = useState<string>('')

    useEffect(() => {
      setValue(props.initialValue || '')
    }, [props.initialValue])

    return (
      <div className="rich-text-editor-stories">
        <div className="form-fields">
          <RichTextEditor {...props} onChange={setValue} />
        </div>
        <div
          className="rte-preview"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
    )
  },
}
