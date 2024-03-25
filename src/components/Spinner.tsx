import { ImSpinner2 } from 'react-icons/im'
import { twMerge } from 'tailwind-merge'

type SpinnerTypes = {
  size?: number
  color?: string
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function Spinner ({ size = 50, color = 'text-blue-500', className, ...props }: SpinnerTypes): JSX.Element {
  return (
    <div {...props} className={twMerge('flex h-full pb-32 justify-center items-center', className)}>
      <ImSpinner2 size={size} className={twMerge('animate-spin', color)} />
    </div>
  )
}
