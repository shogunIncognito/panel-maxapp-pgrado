import { twMerge } from 'tailwind-merge'
import Spinner from './Spinner'

type ButtonProps = {
  children: React.ReactNode
  loading?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button ({ children, loading, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      disabled={loading}
      {...props}
      className={twMerge('bg-sky-600 hover:bg-sky-700 disabled:bg-sky-800 font-semibold rounded disabled:pointer-events-none text-white px-6 py-3 text-sm md:text-md transition-all duration-200 ease-in-out', className)}
    >
      {(loading ?? false) ? <Spinner className='p-0' color='text-white/75' size={24} /> : children}
    </button>
  )
}
