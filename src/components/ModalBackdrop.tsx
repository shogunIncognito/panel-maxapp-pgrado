import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence } from 'framer-motion'

type ModalBackdropProps = {
  children: React.ReactNode
  open: boolean
  className?: string
} & React.HTMLAttributes<HTMLDivElement>

export default function ModalBackdrop ({ children, open, className, ...props }: ModalBackdropProps): JSX.Element | null {
  return (
    <AnimatePresence
      initial={false}
      mode='wait'
    >
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className='z-40 absolute bg-black/60 backdrop-blur h-screen w-screen top-0 left-0 flex justify-center items-center'
        >
          <div {...props} className={twMerge('max-w-[90%] shadow-md overflow-auto max-h-[90%] w-auto mx-5 flex z-[60] flex-col dark:bg-[#171923] ring-2 ring-purple-400 dark:ring-blue-950 dark:text-white bg-slate-50 text-black p-3 md:p-6 rounded', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
