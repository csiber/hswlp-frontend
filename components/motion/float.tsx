import { MotionBox, MotionBoxProps } from './box'
import React from 'react'

export const Float: React.FC<
  MotionBoxProps & { delay?: number; steps?: number[] }
> = (props) => {
  const { children, delay: delayProp, steps = [10, -10, 10], ...rest } = props
  const delay: number = delayProp ?? 0.2
  return (
    <MotionBox
      animate={{ translateY: steps }}
      transition={{
        delay,
        duration: 5,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 0,
        repeatType: 'reverse',
      } as any}
      {...rest}
    >
      {children}
    </MotionBox>
  )
}
