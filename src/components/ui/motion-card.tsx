"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"

const MotionCard = motion(Card)

export interface MotionCardProps extends React.ComponentProps<typeof Card> {
  whileHover?: any
  whileTap?: any
  initial?: any
  animate?: any
  transition?: any
  variants?: any
}

const CustomMotionCard = React.forwardRef<HTMLDivElement, MotionCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <MotionCard
        ref={ref}
        className={cn("overflow-hidden", className)}
        {...props}
      >
        {children}
      </MotionCard>
    )
  }
)
CustomMotionCard.displayName = "CustomMotionCard"

export {
  CustomMotionCard as MotionCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
}
