import { memo, ReactNode } from 'react'
import { AppBar } from './AppBar'

interface Props {
  children: ReactNode
}

export const Harness = memo(({ children }: Props) => {
  return (
    <div className="w-screen h-screen flex justify-center overflow-auto">
      <AppBar />
      <div className="mt-10 m-auto">{children}</div>
    </div>
  )
})

Harness.displayName = 'Harness'
