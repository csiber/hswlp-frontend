import {
  ChakraProps,
  chakra,
  shouldForwardProp,
} from '@chakra-ui/react'
import { HTMLMotionProps, isValidMotionProp, motion } from 'framer-motion'

export interface MotionBoxProps
  extends Omit<HTMLMotionProps<'div'>, 'children' | 'style'>,
    Omit<ChakraProps, 'transition' | 'color'> {
  children?: React.ReactNode
}

// Chakra elemet kombináljuk a Framer Motionnal
export const MotionBox = chakra(motion.div, {
  // Csak a Framer Motion által használt propokat továbbítjuk
  shouldForwardProp: (prop) => isValidMotionProp(prop) || shouldForwardProp(prop),
})

