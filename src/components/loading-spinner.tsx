export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}
const cn = (...classes: (string | false | null | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}

import { Ship } from 'lucide-react'

export const LoadingSpinner = ({
  size = 48, // Make it larger for better visibility
  className,
  ...props
}: ISVGProps) => {
  return (
    <div
      className={cn('flex min-h-screen items-center justify-center', className)} // Ensures centering of the spinner on the screen
    >
      <Ship
        size={size}
        className={cn('animate-wave ', className)} // Adds wave animation and color
        {...props}
      />
    </div>
  )
}
