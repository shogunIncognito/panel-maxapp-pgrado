import Link from 'next/link'
import panelimg1 from '@/assets/panelindeximg1.webp'
import panelimg2 from '@/assets/panelindeximg2.webp'
import Image from 'next/image'

export default function PanelLanding (): JSX.Element | null {
  return (
    <section className='flex flex-col flex-1 w-full justify-center items-center'>

      <div className='flex flex-col md:flex-row w-full h-full'>

        <article className='flex-1 group relative transition-all shadow-md w-full h-full'>
          <div className='hover:bg-black/70 shadow-md transition-all gap-2 z-10 p-3 w-full h-full flex-col flex justify-center items-center bg-black/50 absolute top-0'>
            <h2 className='text-3xl mb-32 opacity-80 font-bold group-hover:scale-125 transition-all text-center'>Autos</h2>
            <Link href='/panel/cars' className='bg-[#0987A0] hover:bg-sky-500 disabled:bg-sky-900 font-semibold rounded disabled:pointer-events-none text-white px-6 py-3   ease-in-out animate__animated animate__fadeInUp absolute bg-black/70 md:hidden group-hover:block transition-all duration-300 my-11'>Administrar autos</Link>
          </div>
          <Image alt='panel imagen' src={panelimg1} className='w-full h-full top-0 object-cover pointer-events-none' />
        </article>

        <article className='flex-1 group relative transition-all shadow-md w-full h-full'>
          <div className='hover:bg-black/70 shadow-md transition-all gap-2 z-10 p-3 w-full h-full flex-col flex justify-center items-center bg-black/50 absolute top-0'>
            <h2 className='text-3xl mb-32 opacity-80 font-bold group-hover:scale-125 transition-all text-center'>Usuarios</h2>
            <Link href='/panel/users' className='bg-[#0987A0] hover:bg-sky-500 disabled:bg-sky-900 font-semibold rounded disabled:pointer-events-none text-white px-6 py-3   ease-in-out animate__animated animate__fadeInUp absolute bg-black/70 md:hidden group-hover:block transition-all duration-300 my-11'>Administrar usuarios</Link>
          </div>
          <Image alt='panel imagen' src={panelimg2} className='w-full h-full top-0 object-cover pointer-events-none' />
        </article>

      </div>

    </section>
  )
}
