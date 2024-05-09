'use client'

import Link from 'next/link'
import panelimg1 from '@/assets/panelindeximg1.webp'
import panelimg2 from '@/assets/panelindeximg2.webp'
import panelimg3 from '@/assets/maxHero1.webp'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function PanelLanding (): JSX.Element | null {
  const { data } = useSession()
  const isAdmin = data?.user.role === 'admin'
  return (
    <section className='flex flex-col overflow-auto flex-1 w-full bg-slate-400/40 dark:bg-neutral-950/30'>
      <h1 className='lg:text-4xl mx-4 text-2xl text-center mt-5 mb-3 font-bold opacity-80 dark:text-neutral-100 text-black'>Bienvenido al panel de administración de CarSellen</h1>
      <div className='grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-3 h-full place-content-center p-4 gap-4 w-full'>
        <article className={`flex flex-col bg-black/60 rounded h-full justify-center items-center relative ${!isAdmin ? 'col-span-2' : ''}`}>

          <div className='z-10 p-6 bg-black/50 dark:bg-black/75 w-full h-full justify-center items-center flex flex-col rounded'>
            <Link className='rounded text-center transition-all bg-black/50 hover:bg-black/80 ring-2 ring-gray-600 hover:ring-gray-400 duration-300 lg:w-48 py-3 p-2' href='/panel/cars'>
              Administrar autos
            </Link>
          </div>

          <Image src={panelimg1} alt='panelimg1' fill sizes='(max-width: 768px) 600px, (max-width: 1200px) 500px' className='object-cover rounded' />
        </article>

        <article className={`flex flex-col bg-black/60 rounded h-full justify-center items-center relative ${!isAdmin ? 'hidden' : ''}`}>

          <div className='z-10 p-6 bg-black/50 dark:bg-black/75 rounded w-full h-full justify-center items-center flex flex-col'>
            <Link className='rounded text-center transition-all bg-black/50 hover:bg-black/80 ring-2 ring-gray-600 hover:ring-gray-400 duration-300 w-48 py-3 p-2' href='/panel/users'>
              Administrar usuarios
            </Link>
          </div>

          <Image src={panelimg2} alt='panelimg1' fill sizes='(max-width: 768px) 600px, (max-width: 1200px) 500px' className='object-cover rounded' />
        </article>

        <article className='flex md:col-span-2 col-span-1 max-h-max overflow-hidden bg-black/60 justify-center items-center relative rounded'>

          <div className='z-10 p-6 bg-black/60 dark:bg-black/75 rounded w-full h-full justify-center items-center flex flex-col text-center'>
            <h2 className='text-2xl'>
              Administra los vehículos de la pagina web de
            </h2>
            <Link href='https://maxautos.vercel.app/' target='_blank' className='text-indigo-500 font-bold text-2xl' rel='noreferrer'><span className='text-white'>Car</span>Sellen</Link>
          </div>

          <Image src={panelimg3} alt='panelimg3' fill sizes='(max-width: 768px) 600px, (max-width: 1200px) 500px' className='object-cover rounded' />

        </article>
      </div>
    </section>
  )
}
