'use client'

import sideImage from '@/assets/maxautoslogoblanco.png'
import useDisclosure from '@/hooks/useDisclosure'
import { CloseIcon, MenuIcon } from '@/libs/Icons'
import { AiFillHome } from 'react-icons/ai'
import { FaCarAlt } from 'react-icons/fa'
import { BiSolidUser } from 'react-icons/bi'
import { RiLogoutBoxRLine as RxExit } from 'react-icons/ri'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { useEffect, useState } from 'react'
import UserSettings from '@/components/UserSettings'
import { BsMoon, BsSun } from 'react-icons/bs'
import UserImage from '@/components/UserImage'
import { signOut, useSession } from 'next-auth/react'
import Spinner from '@/components/Spinner'

export default function Layout ({ children }: { children: React.ReactNode }): JSX.Element {
  const { open, handleOpen, handleClose } = useDisclosure()
  const { data: session, status } = useSession()

  const [theme, setTheme] = useState('dark')

  const path = usePathname()

  const closeSession = (): void => {
    signOut()
      .then(() => {
        toast('Sesión cerrada', {
          icon: '👋'
        })
      })
      .catch(() => {
        toast.error('Ha ocurrido un error')
      })
  }

  const changeTheme = (): void => {
    const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark'
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'

    document.documentElement.classList.remove(currentTheme)
    document.documentElement.classList.add(newTheme)

    window.localStorage.setItem('panelTheme', newTheme)
    setTheme(newTheme)
  }

  useEffect(() => {
    const panelTheme = window.localStorage.getItem('panelTheme')

    if (panelTheme === null) {
      window.localStorage.setItem('panelTheme', 'dark')
      setTheme('dark')
      return
    }

    document.documentElement.classList.add(panelTheme)
    document.documentElement.classList.remove(panelTheme === 'dark' ? 'light' : 'dark')
    setTheme(panelTheme)
  }, [])

  if (status === 'loading') {
    return (
      <div className='flex justify-center bg-neutral-950 items-center w-full h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <main className='flex-col max-w-full max-h-screen md:flex-row flex h-screen w-full dark:bg-[#171923]'>
      {/* Mobile Layout */}
      <section className='overflow-hidden md:hidden flex flex-col flex-1 text-white'>
        <header className='relative min-h-[8%] h-[8%] dark:text-white dark:bg-[#171923] bg-slate-100 text-black border-b justify-between items-center border-gray-600/60 flex w-full'>
          <div onClick={handleOpen} className='ml-3 z-20'>
            <MenuIcon className='w-8 border rounded-lg invert dark:invert-0 border-gray-700/70' />
          </div>
          <h2 className='text-center absolute w-full m-auto mt-0 text-2xl -z-0 font-bold'>Max<span className='text-blue-500'>Autos</span></h2>
          <div className='flex items-center gap-2 mr-3 z-20'>
            <UserImage image={session?.user.image} />
            <UserSettings />
          </div>
        </header>

        {children}
      </section>

      <aside
        style={{
          transform: `translateX(-${open ? 0 : 200}%)`,
          zIndex: '200'
        }}
        className='top-0 md:hidden transition-all duration-500 w-full flex flex-col absolute z-50
        h-screen shadow-xl dark:bg-[#171923] bg-slate-100 text-black dark:text-white'
      >
        <CloseIcon onClick={handleClose} className='w-12 m-2 self-end cursor-pointer' />
        <Image src={sideImage} width={140} priority alt='sideimage' className='pointer-events-none invert dark:invert-0 select-none m-auto my-0 mb-2 object-cover h-auto' />

        <nav className='flex flex-col p-4'>
          <Link onClick={handleClose} className={`p-4 px-6 rounded-md hover:bg-gray-900 text-black dark:text-white flex gap-2 items-center transition-colors ${path === '/panel' ? 'bg-gray-700 text-white' : ''}`} href='/panel'>
            <AiFillHome size={28} className='opacity-75' />
            <p className=''>Inicio</p>
          </Link>
          <Link onClick={handleClose} className={`p-4 px-6 rounded-md hover:bg-gray-900 text-black dark:text-white flex gap-2 items-center transition-colors ${path === '/panel/cars' ? 'bg-gray-700 text-white' : ''}`} href='/panel/cars'>
            <FaCarAlt size={28} className='opacity-75' />
            <p className=''>Autos</p>
          </Link>
          <Link onClick={handleClose} className={`p-4 px-6 hover:bg-gray-900 text-black dark:text-white flex gap-2 items-center transition-colors ${path === '/panel/users' ? 'bg-gray-700 text-white' : ''}`} href='/panel/users'>
            <BiSolidUser size={28} className='opacity-75' />
            <p className=''>Usuarios</p>
          </Link>
          <button onClick={closeSession} className='p-4 px-6 rounded-md flex items-center gap-2 hover:bg-red-700/80 transition-colors'>
            <RxExit size={28} className='opacity-75' />
            <p className=''>Cerrar sesión</p>
          </button>
        </nav>

        <div className='min-h-fit absolute pointer-events-none bottom-5 self-center'>
          <p className='text-center text-xs opacity-50'>Max<span className='text-blue-500'>Autos</span></p>
        </div>
      </aside>

      {/* Desktop Layout */}
      <aside className='lg:w-1/6 border-gray-200/10 border-r-2 dark:bg-[#171923] bg-slate-100 md:w-1/3 hidden relative md:flex md:flex-col h-screen px-3 shadow-xl dark:text-white'>

        <Image src={sideImage} width={140} priority alt='sideimage' className='pointer-events-none invert dark:invert-0 select-none m-auto h-auto my-8 object-cover' />

        <nav className='flex flex-col gap-2'>

          <Link className={`p-4 px-6 rounded-md lg:p-4 md:p-3 hover:bg-[#0987A0] hover:text-white dark:text-white flex gap-2 items-center transition-colors ${path === '/panel' ? 'bg-sky-700/60' : ''}`} href='/panel'>
            <AiFillHome size={20} className='opacity-75' />
            <p className=''>Inicio</p>
          </Link>
          <Link className={`p-4 px-6 rounded-md lg:p-4 md:p-3 hover:bg-[#0987A0] hover:text-white dark:text-white flex gap-2 items-center transition-colors ${path === '/panel/cars' ? 'bg-sky-700/60' : ''}`} href='/panel/cars'>
            <FaCarAlt size={20} className='opacity-75' />
            <p className=''>Autos</p>
          </Link>
          <Link className={`p-4 px-6 rounded-md lg:p-4 md:p-3 hover:bg-[#0987A0] hover:text-white dark:text-white flex gap-2 items-center transition-colors ${path === '/panel/users' ? 'bg-sky-700/60' : ''}`} href='/panel/users'>
            <BiSolidUser size={20} className='opacity-75' />
            <p className=''>Usuarios</p>
          </Link>
          <button onClick={closeSession} className='p-4 px-6 lg:p-4 md:p-3 rounded-md hover:text-white flex items-center gap-2 hover:bg-red-700/80 transition-colors'>
            <RxExit size={20} className='opacity-75' />
            <p className=''>Cerrar sesión</p>
          </button>

        </nav>

        <div className='min-h-fit absolute pointer-events-none bottom-5 self-center'>
          <p className='text-center text-xs opacity-50'>Max<span className='text-blue-500'>Autos</span></p>
        </div>
      </aside>

      <section className='md:flex flex-1 pb-32 md:pb-0 flex-col hidden h-auto overflow-hidden text-white'>
        <header className='border-b-2 h-min border-gray-200/10 shadow-lg flex items-center gap-3 capitalize p-4 bg-slate-100 dark:text-black dark:bg-[#171923] justify-end'>
          <span className='w-9 h-9 flex items-center justify-center cursor-pointer bg-slate-300 text-black dark:text-white dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-600 transition-colors p-1.5 rounded-md' onClick={changeTheme}>
            {theme === 'dark' ? <BsSun /> : <BsMoon />}
          </span>
          <UserImage image={session?.user.image} />
          <h2 className='opacity-80 capitalize text-black dark:text-white'>{(session !== null) ? session.user.username : 'Cargando...'}</h2>
          <UserSettings />
        </header>

        {children}
      </section>
    </main>
  )
}
