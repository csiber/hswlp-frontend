import { ChakraProps, chakra } from '@chakra-ui/react'
import { HTMLMotionProps, motion } from 'framer-motion'

export interface MotionBoxProps
  extends Omit<HTMLMotionProps<'div'>, 'children' | 'style'>,
    Omit<ChakraProps, 'transition' | 'color'> {
  children?: React.ReactNode
}

// A Chakra-komponens és a Framer Motion komponens kombinálása.
// A Chakra 'chakra()' függvénye itt a motion.div komponensre van alkalmazva,
// így animálható, de megkapja a Chakra stílus propjait is.
export const MotionBox = chakra(motion.div) as React.ComponentType<MotionBoxProps>
