import { Rect, Placement, BasePlacement } from '@/types'

const autoPlacements: BasePlacement[] = ['bottom', 'top', 'right', 'left']

const isSpaceAvailableForPopover = (
  space: number,
  popoverWidth: number,
  popoverHeight: number,
): boolean => {
  return space >= popoverWidth && space >= popoverHeight
}

// Helper function to calculate available space for a given placement
const calculateSpaceForPlacement = (placement: BasePlacement, space: any) => {
  if (placement === 'top') {
    return space.top
  } else if (placement === 'bottom') {
    return space.bottom
  } else if (placement === 'left') {
    return space.left
  } else if (placement === 'right') {
    return space.right
  }
  return 0
}

const calculateAutoPlacement = (
  triggerRect: Rect,
  popoverRect: Rect,
): BasePlacement => {
  const viewportWidth =
    window.innerWidth || document.documentElement.clientWidth
  const viewportHeight =
    window.innerHeight || document.documentElement.clientHeight
  const scrollX = window.scrollX || window.pageXOffset
  const scrollY = window.scrollY || window.pageYOffset

  let bestPlacement = null
  let maxSpace = 0

  const availableSpace = {
    top: triggerRect.top - scrollY,
    bottom: viewportHeight - (triggerRect.bottom - scrollY),
    left: triggerRect.left - scrollX,
    right: viewportWidth - (triggerRect.right - scrollX),
  }

  autoPlacements.forEach(placement => {
    const space = calculateSpaceForPlacement(placement, availableSpace)
    if (
      space > maxSpace &&
      isSpaceAvailableForPopover(space, popoverRect.width, popoverRect.height)
    ) {
      maxSpace = space
      bestPlacement = placement
    }
  })

  return bestPlacement || 'bottom'
}

export const getPopoverCoords = (
  triggerRect: Rect,
  popoverRect: Rect,
  position: Placement,
  distance: number,
  positioning: 'absolute' | 'fixed',
): [{ left: number; top: number }, Placement] => {
  let top = 0
  let left = 0
  const triggerTop = positioning === 'absolute' ? 0 : triggerRect.top
  const triggerLeft = positioning === 'absolute' ? 0 : triggerRect.left

  let _position = position
  if (['top', 'right', 'bottom', 'left'].includes(position)) {
    _position = calculateAutoPlacement(triggerRect, popoverRect)
    _position = `${_position}-center`
  }
  switch (_position) {
    case 'top-start':
      top = triggerTop - popoverRect.height - distance
      left = triggerLeft
      break
    case 'top-end':
      top = triggerTop - popoverRect.height - distance
      left = triggerLeft + triggerRect.width - popoverRect.width
      break
    case 'top-center':
      top = triggerTop - popoverRect.height - distance
      left = triggerLeft + triggerRect.width / 2 - popoverRect.width / 2
      break
    case 'right-start':
      top = triggerTop
      left = triggerLeft + triggerRect.width + distance
      break
    case 'right-end':
      top = triggerTop + triggerRect.height - popoverRect.height
      left = triggerLeft + triggerRect.width + distance
      break
    case 'right-center':
      top = triggerTop - popoverRect.height / 2 + triggerRect.height / 2
      left = triggerLeft + triggerRect.width + distance
      break
    case 'left-start':
      top = triggerTop
      left = triggerLeft - popoverRect.width - distance
      break
    case 'left-end':
      top = triggerTop + triggerRect.height - popoverRect.height
      left = triggerLeft - popoverRect.width - distance
      break
    case 'left-center':
      top = triggerTop - popoverRect.height / 2 + triggerRect.height / 2
      left = triggerLeft - popoverRect.width - distance
      break
    case 'bottom-start':
      top = triggerTop + triggerRect.height + distance
      left = triggerLeft
      break
    case 'bottom-end':
      top = triggerTop + triggerRect.height + distance
      left = triggerLeft + triggerRect.width - popoverRect.width
      break
    case 'bottom-center':
    default:
      top = triggerTop + triggerRect.height + distance
      left = triggerLeft + triggerRect.width / 2 - popoverRect.width / 2
  }

  return [{ top, left }, _position]
}
