import Link from 'next/link'
import panelimg1 from '@/assets/panelindeximg1.webp'
import panelimg2 from '@/assets/panelindeximg2.webp'
import panelimg3 from '@/assets/maxHero1.webp'
import Image from 'next/image'

export default function PanelLanding (): JSX.Element | null {
  return (
    <section className='flex flex-col flex-1 w-full bg-slate-400/40 dark:bg-neutral-950/30'>
      <h1 className='md:text-4xl text-2xl text-center mt-5 font-bold opacity-80 dark:text-neutral-100 text-black'>Bienvenido al panel de administración de MaxAutos</h1>
      <div className='grid md:grid-cols-2 md:grid-rows-2 grid-cols-1 grid-rows-3 h-full place-content-center p-10 gap-6 w-full'>
        <article className='flex flex-col bg-black/60 rounded h-full justify-center items-center relative'>

          <div className='z-30 p-6 bg-black/75 w-full h-full justify-center items-center flex flex-col rounded'>
            <Link className='rounded text-center transition-all bg-black/50 hover:bg-black/80 ring-2 ring-gray-600 duration-1000 w-48 py-3 p-2' href='/panel/cars'>
              Administrar autos
            </Link>
          </div>

          <Image src={panelimg1} alt='panelimg1' layout='fill' className='object-cover rounded' />
        </article>

        <article className='flex flex-col bg-black/60 rounded h-full justify-center items-center relative'>

          <div className='z-30 p-6 bg-black/75 rounded w-full h-full justify-center items-center flex flex-col'>
            <Link className='rounded text-center transition-all bg-black/50 hover:bg-black/80 ring-2 ring-gray-600 duration-1000 w-48 py-3 p-2' href='/panel/users'>
              Administrar usuarios
            </Link>
          </div>

          <Image src={panelimg2} alt='panelimg1' layout='fill' className='object-cover rounded' />
        </article>

        <article className='flex md:col-span-2 col-span-1 max-h-max overflow-hidden bg-black/60 justify-center items-center relative rounded'>

          <div className='z-30 p-6 bg-black/80 rounded w-full h-full justify-center items-center flex flex-col text-center'>
            <h2 className='text-xl'>
              Administra los vehículos de la pagina web de
            </h2>
            <Link href='https://maxautos.vercel.app/' className='text-blue-600 text-2xl'><span className='text-white'>Max</span>Autos</Link>
          </div>

          <Image src={panelimg3} alt='panelimg3' layout='fill' className='object-cover rounded' />

        </article>
      </div>
    </section>
  )
}
