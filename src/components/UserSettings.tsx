/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import useDisclosure from '@/hooks/useDisclosure'
import { IoMdSettings } from 'react-icons/io'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import ModalBackdrop from './ModalBackdrop'
import Button from './Button'
import Input from './Input'
import { useState } from 'react'
import { objectHasEmptyValues } from '@/utils/functions'
import toast from 'react-hot-toast'
import { updateUser } from '@/services/api'
import { updatePasswordCodes, updateUsernameCodes } from '@/utils/statusCodes'
import { TypeUserUpdate } from '@/enums'
import { useSession } from 'next-auth/react'

interface FormValues {
  toPassword: {
    currentPassword: string
    password: string
    confirmPassword: string
  }
  toUsername: {
    username: string
  }
}

const initialFormValues = {
  toPassword: {
    currentPassword: '',
    password: '',
    confirmPassword: ''
  },
  toUsername: {
    username: ''
  }
}

export default function UserSettings (): JSX.Element {
  const { open, handleClose, handleOpen } = useDisclosure()
  const { data: session } = useSession()
  const [values, setValues] = useState<FormValues>(initialFormValues)
  const [settingsView, setSettingsView] = useState<'username' | 'password'>('username')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement))
    const formType = e.currentTarget.name as TypeUserUpdate

    if (objectHasEmptyValues(data)) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    // target -> currentTarget
    if (formType === TypeUserUpdate.toPassword) {
      const { password, confirmPassword, currentPassword } = data

      if (password !== confirmPassword) {
        toast.error('Confirmar contraseña no coinciden')
        return
      }

      if (password === currentPassword) {
        toast.error('La nueva contraseña no puede ser igual a la actual')
        return
      }
    }

    if (session === null) return

    setLoading(true)
    updateUser(session.user._id, data, formType, session.user.token)
      .then(res => {
        toast.success('Usuario actualizado')
        toast.success('Inicia sesión nuevamente para ver los cambios')

        setValues(initialFormValues)
        handleClose()
      })
      .catch(err => {
        console.log(err)

        if (formType === TypeUserUpdate.toPassword) {
          toast.error(updatePasswordCodes[err.response.status] || 'Error al actualizar contraseña')
          return
        }

        toast.error(updateUsernameCodes[err.response.status] || 'Error al actualizar nombre de usuario')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, form } = e.target as HTMLInputElement

    if (!form) return

    setValues(prev => ({
      ...prev,
      [form.name]: { ...prev[form.name as keyof FormValues], [name]: value }
    }))
  }

  return (
    <>
      <div className='relative flex justify-end'>
        <div>
          <IoMdSettings size={25} className='hover:text-gray-400 dark:hover:text-gray-400 dark:text-white text-black transition-colors cursor-pointer' onClick={handleOpen} />
        </div>
      </div>

      <ModalBackdrop open={open} className='p-0 overflow-visible max-w-[480px] w-[480px] mx-5 ring-1 rounded-lg dark:ring-slate-600'>
        <div className='flex flex-col gap-6 flex-1 p-3.5'>
          <header className='w-full dark:bg-gray-700/30 rounded-lg text-center flex p-1.5 relative'>
            <span onClick={() => setSettingsView('username')} className={`flex-1 cursor-pointer opacity-80 rounded-md p-0.5 ${settingsView === 'username' ? 'dark:bg-black/80 bg-gray-700 text-white' : ''}`}>Cuenta</span>
            <span onClick={() => setSettingsView('password')} className={`flex-1 cursor-pointer opacity-80 rounded-md p-0.5 ${settingsView === 'password' ? 'dark:bg-black/80 bg-gray-700 text-white' : ''}`}>Contraseña</span>
          </header>
          {settingsView === 'username'
            ? (
              <section className='flex h-full flex-col'>
                <h2 className='mb-2 capitalize text-md'>Nombre de usuario</h2>
                <p className='normal-case opacity-80'>Haz cambios en tu nombre y guardalo cuando termines</p>

                <form name='toUsername' onSubmit={handleSubmit} className='flex h-full gap-5 flex-col'>
                  <div className='flex flex-1 mt-6 gap-2 flex-col'>
                    <label className='text-sm opacity-75'>Nuevo nombre de usuario</label>
                    <Input value={values.toUsername.username} onChange={handleChange} className='w-fit' name='username' />
                  </div>

                  <div className='flex w-full gap-2 my-2 items-center'>
                    <Button disabled={loading} loading={loading} type='submit' className='bg-purple-600 flex-1 hover:bg-purple-800'>Guardar</Button>
                    <Button type='reset' className='flex-1' onClick={handleClose}>Cancelar</Button>
                  </div>
                </form>
              </section>
              )
            : (
              <section className='flex h-full flex-col'>
                <h2 className='mb-2 capitalize text-md'>Cambiar contraseña</h2>

                <form name='toPassword' onSubmit={handleSubmit} className='flex h-full gap-5 flex-col'>
                  {showPassword
                    ? (
                      <AiFillEyeInvisible onClick={() => setShowPassword(false)} size={33} className='cursor-pointer self-start p-1 rounded bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-900' />
                      )
                    : (
                      <AiFillEye onClick={() => setShowPassword(true)} size={33} className='cursor-pointer self-start p-1 rounded bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-900' />
                      )}
                  <div className='flex flex-col flex-1 justify-center items-center gap-2'>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                      <label>Contraseña actual</label>
                      <Input value={values.toPassword.currentPassword} onChange={handleChange} name='currentPassword' type={showPassword ? 'text' : 'password'} />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                      <label>Nueva contraseña</label>
                      <Input value={values.toPassword.password} onChange={handleChange} name='password' type={showPassword ? 'text' : 'password'} />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2'>
                      <label>Confirmar contraseña</label>
                      <Input value={values.toPassword.confirmPassword} onChange={handleChange} name='confirmPassword' type={showPassword ? 'text' : 'password'} />
                    </div>
                  </div>

                  <div className='flex gap-2 w-full my-2 items-center'>
                    <Button loading={loading} type='submit' className='bg-purple-600 flex-1 hover:bg-purple-800'>Guardar</Button>
                    <Button type='reset' className='flex-1' onClick={handleClose}>Cancelar</Button>
                  </div>
                </form>
              </section>
              )}

        </div>
      </ModalBackdrop>
    </>
  )
}
