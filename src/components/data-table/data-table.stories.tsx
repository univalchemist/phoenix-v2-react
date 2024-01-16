import { useCallback, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { ISharePoint } from '@/types'
import { Icon } from '../icon'
import { Checkbox } from '../checkbox'
import {
  ISortableTableAction,
  ISortableTableHeader,
  ISortableTableProps,
} from './types'
import { DataTable } from '.'

const data: ISharePoint[] = [
  {
    id: 1,
    name: 'Catalog',
    type: 13,
    lastModified: 'December 19, 2013',
    uploadedBy: 'Bessie Cooper',
    active: true,
  },
  {
    id: 2,
    name: 'Circooles',
    type: 1,
    lastModified: 'February 9, 2015',
    uploadedBy: 'Dianne Russell',
    active: true,
  },
  {
    id: 3,
    name: 'Hourglass',
    type: 3,
    lastModified: 'August 7, 2017',
    uploadedBy: 'Theresa Webb',
    active: true,
  },
  {
    id: 4,
    name: 'Command+R',
    type: 10,
    lastModified: 'May 29, 2017',
    uploadedBy: 'Albert Flores',
    active: true,
  },
]

const headers: ISortableTableHeader<ISharePoint>[] = [
  {
    key: 'name',
    label: 'Name',
    sortable: true,
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
  },
  {
    key: 'lastModified',
    label: 'Last modified',
    sortable: true,
  },
  {
    key: 'uploadedBy',
    label: 'Uploaded by',
    sortable: false,
  },
]

const actions: ISortableTableAction[] = [
  {
    key: 'action',
    label: 'Action',
  },
]

const meta = {
  title: 'Component/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  argTypes: {
    className: { control: { type: 'text' } },
    WrapEl: { control: { type: 'text' } },
    showCheck: { options: [true, false], control: { type: 'radio' } },
    allSelected: { options: [true, false], control: { type: 'radio' } },
  },
  args: {
    showCheck: true,
    headers,
    actions,
    data,
    children: () => null,
  },
} satisfies Meta<typeof DataTable<ISharePoint>>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  render: (props: ISortableTableProps<any>) => {
    const [allChecked, setAllChecked] = useState<boolean>(false)
    const [selected, setSelected] = useState<number[]>([])

    const onToggleSelect = useCallback(
      (id: number) => {
        let _selected = [...selected]
        if (_selected.includes(id)) {
          _selected = _selected.filter(s => s !== id)
        } else {
          _selected = [..._selected, id]
        }
        setAllChecked(_selected.length === data.length)
        setSelected(_selected)
      },
      [selected],
    )

    return (
      <div className="data-table-stories">
        <DataTable<ISharePoint>
          {...props}
          allSelected={allChecked}
          onSelectAll={(_val: boolean) => {
            setAllChecked(_val)
            if (!_val) setSelected([])
          }}
        >
          {sortedData => (
            <>
              {sortedData.map(item => (
                <tr key={item.id}>
                  <td>
                    <Checkbox
                      checked={allChecked || selected.includes(item.id)}
                      onChange={() => onToggleSelect(item.id)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.lastModified}</td>
                  <td>{item.uploadedBy}</td>
                  <td>
                    <Icon name="3-dots" />
                  </td>
                </tr>
              ))}
            </>
          )}
        </DataTable>
      </div>
    )
  },
}
