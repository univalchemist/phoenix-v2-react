import { useContext } from 'react'

import { PopoverContext } from '@/contexts'

export const usePopover = () => useContext(PopoverContext)
