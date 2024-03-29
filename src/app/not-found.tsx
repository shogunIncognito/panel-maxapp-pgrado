import Link from 'next/link'
import { FaSadTear } from 'react-icons/fa'
import sideImage from '@/assets/maxautosicon.webp'
import Image from 'next/image'

export default function NotFound (): JSX.Element {
  return (
    <div className='flex flex-col items-center justify-center w-full relative min-h-screen text-center space-y-4 dark:bg-[#171923]'>
      <Link
        href='/panel'
        className='absolute top-4 left-4'
      >
        <Image src={sideImage} alt='MaxAutos' className='lg:w-24 w-20 dark:text-gray-500' />
      </Link>
      <div className='space-y-2 m-1'>
        <FaSadTear className='text-8xl text-white/80 mx-auto invert dark:invert-0' />
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl dark:text-white/80'>Ups.</h1>
        <p className='text-gray-500 dark:text-gray-300 text-xl'>Parece que estás perdido e intentas acceder a una página que no existe.</p>
      </div>
      <Link
        className='inline-flex dark:text-white h-10 items-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
        href='/panel'
      >
        Volver
      </Link>
    </div>
  )
}
