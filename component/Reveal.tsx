"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

const EASE = [0.22, 1, 0.36, 1] as const

export default function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 28,
  amount = 0.2,
  className,
}: {
  children: ReactNode
  delay?: number
  duration?: number
  x?: number
  y?: number
  amount?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
