import { useCallback, useMemo, useEffect, useState, createRef } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button, Container } from '@/components'
import { Accordion, IAccordionProps } from '.'

type TExpanded = Record<string, boolean | undefined>

type TAccordion = React.ElementRef<typeof Accordion>
interface IMockData {
  name: string
  title: string
  content: string[]
}

const meta = {
  title: 'Component/Accordion',
  component: Accordion,
  argTypes: {
    disabled: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    expanded: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    preExpanded: {
      options: [true, false, undefined],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    shadowOnExpand: {
      options: [true, false],
      defaultValue: undefined,
      control: { type: 'radio' },
    },
    subtitle: {
      control: { type: 'text' },
    },
    title: {
      control: { type: 'text' },
    },
    width: {
      defaultValue: '100%',
      control: { type: 'text' },
    },
  },
  args: {
    width: 'max-content',
  },
} as Meta<IAccordionProps>

export default meta
type Story = StoryObj<IAccordionProps>

export const Primary: Story = {
  render: (props: IAccordionProps) => {
    const [expanded, setExpanded] = useState<TExpanded | undefined>()

    useEffect(() => {
      if (expanded === undefined) {
        setExpanded({
          accordion1: props.expanded,
          accordion2: props.expanded,
        })
      }
    }, [expanded, props.expanded])

    const onToggle = useCallback((name: string, isExpanded: boolean) => {
      setExpanded(e => ({ ...(e || {}), [name]: isExpanded }))
    }, [])

    const accordionData: IMockData[] = useMemo(
      () => [
        {
          name: 'accordion1',
          title: 'Accordion 1',
          content: [
            'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
            'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium',
            'Nam libero tempore, cum soluta nobis est eligendi',
          ],
        },
        {
          name: 'accordion2',
          title: 'Accordion 2',
          content: [
            'Ut enim ad minima veniam, quis nostrum exercitationem',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          ],
        },
      ],
      [],
    )

    const refs = useMemo(
      () =>
        Array.from({ length: accordionData.length }).map(() =>
          createRef<TAccordion>(),
        ),
      [accordionData.length],
    )

    const onManualToggle = useCallback(
      (index: number) => {
        refs?.[index]?.current?.toggle()
      },
      [refs],
    )

    return (
      <Container col className="accordion-stories">
        {accordionData.map((datum, index) => (
          <Container gap={30} align="flex-start" key={datum.name}>
            <Accordion
              {...props}
              ref={refs[index]}
              title={props.title || datum.title}
              width={
                Number.isNaN(+(props.width || ''))
                  ? props.width
                  : +(props.width || '')
              }
              expanded={expanded?.[datum.name]}
              onToggle={(isExpanded: boolean) =>
                onToggle(datum.name, isExpanded)
              }
            >
              {datum.content.map(content => (
                <div
                  key={`${datum.name}-${content.length}`}
                  className="content-wrapper"
                >
                  {content}
                </div>
              ))}
            </Accordion>
            <div>
              <Button
                title="Control toggle out side of the accordion"
                onClick={() => onManualToggle(index)}
              >
                Toggle
              </Button>
            </div>
          </Container>
        ))}
      </Container>
    )
  },
}
