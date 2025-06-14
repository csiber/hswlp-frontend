import React from 'react'

import { MotionBox, MotionBoxProps } from './box'

export const FallInPlace: React.FC<MotionBoxProps & { delay?: number }> = (
  props,
) => {
  const { children, delay: delayProp, ...rest } = props
  const delay: number = delayProp ?? 0.2
  return (
    <MotionBox
      initial={{ scale: 1, opacity: 0, translateY: '20px' }}
      animate={{ scale: 1, opacity: 1, translateY: 0 }}
      transition={{
        type: 'tween',
        ease: 'easeOut',
        duration: 2,
        delay,
      } as any}
      {...rest}
    >
      {children}
    </MotionBox>
  )
}
