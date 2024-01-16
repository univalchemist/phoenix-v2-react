import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Radio } from '.'
import { IRadioProps } from './types'

const meta = {
  title: 'Component/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    checked: { options: [true, false], control: { type: 'radio' } },
    disabled: { options: [true, false], control: { type: 'radio' } },
    label: { control: { type: 'string' } },
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    label: 'Selected',
  },
  render: (props: IRadioProps) => {
    const [checked, setChecked] = useState<boolean>(false)

    useEffect(() => setChecked(!!props.checked), [props.checked])

    return (
      <div className="notifications-settings">
        <div className="settings-wrap">
          <div className="settings-box">
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>
                      <Radio
                        {...props}
                        checked={checked}
                        onChange={() => setChecked(true)}
                      >
                        {props.children}
                      </Radio>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  },
}
