'use client'

import Button from '@/components/Button'
import Logo from '@/assets/maxautosicon.png'
import sideImage from '@/assets/maxHero1.jpg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Input from '@/components/Input'
import { signIn, useSession } from 'next-auth/react'
import Spinner from '@/components/Spinner'

export default function Login (): JSX.Element {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { status } = useSession()
  const [values, setValues] = useState({
    username: '',
    password: ''
  })

  const isButtonDisabled = (values.username.length === 0) || (values.password.length === 0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    if (isButtonDisabled) {
      toast.error('Hay campos vacíos')
      return
    }

    setLoading(true)
    signIn('credentials', { ...values, redirect: false })
      .then(res => {
        if (res?.error !== null) throw new Error(String(res?.status))
        toast.success('Bienvenido')
        router.replace('/panel')
      })
      .catch(() => {
        toast.error('Usuario o contraseña incorrectos')
      })
      .finally(() => setLoading(false))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value === ' ') return
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/panel')
    }
  }, [status])

  if (status === 'loading' || status === 'authenticated') {
    return (
      <div className='flex justify-center dark:bg-neutral-900 bg-neutral-200 items-center w-full h-screen'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='w-full text-black h-screen max-h-screen flex-col md:flex-row overflow-hidden flex justify-center items-center'>
      <section className='flex w-full justify-center items-center md:w-1/2 lg:w-1/3 bg-neutral-50 h-full relative'>
        <form onSubmit={handleSubmit} className='w-3/4 lg:w-1/2 text-black relative rounded-md font-bold gap-4 p-6 py-10 mb-10 flex flex-col'>
          <Image className='self-center select-none pointer-events-none object-cover h-auto mb-4' alt='loginLogo' src={Logo} width={170} height={120} />
          <div className='flex flex-col gap-1'>
            <label className='text-md opacity-70' htmlFor='username'>Usuario</label>
            <Input className='bg-white shadow dark:text-black text-gray-700 p-1.5' value={values.username} onChange={handleChange} id='username' type='text' name='username' />
          </div>
          <div className='flex flex-col gap-1'>
            <label className='text-md opacity-70' htmlFor='password'>Contraseña</label>
            <Input className='bg-white shadow dark:text-black text-gray-700 p-1.5' value={values.password} onChange={handleChange} id='password' type='password' name='password' />
          </div>
          <Button loading={loading} disabled={isButtonDisabled || loading} className='mt-3 disabled:bg-blue-400 disabled:bg-opacity-70  disabled:cursor-not-allowed'>
            Iniciar sesión
          </Button>
        </form>
      </section>
      <section className='h-screen w-full md:w-1/2 lg:w-2/3'>
        <Image priority src={sideImage} alt='sideimage' className='w-full pointer-events-none select-none h-full object-cover' />
      </section>
    </div>
  )
}
