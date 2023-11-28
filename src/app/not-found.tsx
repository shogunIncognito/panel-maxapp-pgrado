import Button from '@/components/Button'
import Link from 'next/link'

export default function NotFound (): JSX.Element {
  return (
    <main className='h-screen w-full flex flex-col justify-center items-center gap-5 bg-neutral-900 text-white'>
      <h1 className='text-6xl font-bold'>404</h1>
      <img src='https://media.tenor.com/y6aKTtCsvjEAAAAC/fine-ok.gif' alt='notfound' className='rounded-b-xl rounded-t-3xl' />
      <h2 className='text-2xl'>¿A donde vas?</h2>
      <Link href='/'>
        <Button className='mt-5 bg-transparent ring-2'>Volver al inicio</Button>
      </Link>
    </main>
  )
}
