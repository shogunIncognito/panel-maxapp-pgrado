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
      className={twMerge('bg-[#0987A0] hover:bg-sky-500 disabled:bg-sky-900 font-semibold rounded disabled:pointer-events-none text-white px-6 py-3 text-sm md:text-md transition-all duration-200 ease-in-out', className)}
    >
      {(loading ?? false) ? <Spinner className='p-0' size={24} /> : children}
    </button>
  )
}
