/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import useDisclosure from '@/hooks/useDisclosure'
import { IoMdSettings } from 'react-icons/io'
import { FaExchangeAlt } from 'react-icons/fa'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import ModalBackdrop from './ModalBackdrop'
import Button from './Button'
import Input from './Input'
import { useState } from 'react'
import { objectHasEmptyValues } from '@/utils/functions'
import toast from 'react-hot-toast'
import { updateUser } from '@/services/api'
import useSessionStore from '@/hooks/useSessionStore'
import { updatePasswordCodes, updateUsernameCodes } from '@/utils/statusCodes'
import { TypeUserUpdate } from '@/enums'

interface FormValues {
  toPassword: {
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }
  toUsername: {
    username: string
  }
}

const initialFormValues = {
  toPassword: {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  },
  toUsername: {
    username: ''
  }
}

export default function UserSettings (): JSX.Element {
  const { open, handleClose, handleOpen } = useDisclosure()
  const { session } = useSessionStore()
  const [values, setValues] = useState<FormValues>(initialFormValues)
  const [settingsView, setSettingsView] = useState('username')
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
      const { newPassword, confirmPassword, currentPassword } = data

      if (newPassword !== confirmPassword) {
        toast.error('Confirmar contraseña no coinciden')
        return
      }
      if (newPassword === currentPassword) {
        toast.error('La nueva contraseña no puede ser igual a la actual')
        return
      }
    }

    if (session == null) return

    setLoading(true)
    updateUser(session._id, data, formType)
      .then(res => {
        toast.success('Usuario actualizado')
        toast.success('Inicia sesión nuevamente para ver los cambios')

        setValues(initialFormValues)
        handleClose()
      })
      .catch(err => {
        if (e.currentTarget.name === 'toPassword') {
          toast.error(updatePasswordCodes[err.response.status] || 'Error al actualizar contraseña')
          return
        }

        toast.error(updateUsernameCodes[err.response.status] || 'Error al actualizar nombre de usuario')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleToggleView = (): void => setSettingsView(settingsView === 'username' ? 'password' : 'username')

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

      <ModalBackdrop open={open} className='p-0 overflow-visible w-auto mx-5'>
        <div className='flex flex-col gap-6 p-3 shadow-md'>
          <header className='self-end p-1.5 group relative'>
            <FaExchangeAlt className='cursor-pointer hover:text-purple-600' size={25} onClick={handleToggleView} />
            <span className='animate__animated animate__bounceIn absolute hidden whitespace-nowrap -right-12 z-20 group-hover:block -top-10 dark:bg-neutral-600 bg-slate-300 shadow-2xl 00 rounded p-1.5'>
              Cambiar {settingsView === 'username' ? 'contraseña' : 'nombre'}
            </span>
          </header>
          {settingsView === 'username'
            ? (
              <section className='flex items-center flex-col justify-center mx-8'>
                <h2 className='opacity-80 mb-7 capitalize text-2xl text-center'>Cambiar nombre</h2>

                <form name='toUsername' onSubmit={handleSubmit} className='flex gap-5 flex-col justify-start items-start'>
                  <div className='flex gap-5 flex-col'>
                    <label>Nuevo nombre de usuario</label>
                    <Input value={values.toUsername.username} onChange={handleChange} name='username' />
                  </div>

                  <div className='flex w-full gap-2 my-4 items-center'>
                    <Button disabled={loading} loading={loading} type='submit' className='bg-purple-600 flex-1 hover:bg-purple-800'>Guardar</Button>
                    <Button className='flex-1' onClick={handleClose}>Cancelar</Button>
                  </div>
                </form>
              </section>
              )
            : (
              <section className='flex flex-col select-none justify-center mx-8'>
                <h2 className='opacity-80 mb-7 capitalize text-2xl text-center'>Cambiar contraseña</h2>
                <form name='toPassword' onSubmit={handleSubmit} className='flex gap-5 flex-col justify-start items-center'>

                  {showPassword
                    ? (
                      <AiFillEyeInvisible onClick={() => setShowPassword(false)} size={33} className='cursor-pointer self-end p-1 rounded bg-slate-300 dark:bg-neutral-700 dark:hover:bg-neutral-800' />
                      )
                    : (
                      <AiFillEye onClick={() => setShowPassword(true)} size={33} className='cursor-pointer self-end p-1 rounded bg-slate-300 dark:bg-neutral-700 dark:hover:bg-neutral-800' />
                      )}

                  <div className='grid grid-cols-2'>
                    <label>Contraseña actual</label>
                    <Input value={values.toPassword.currentPassword} onChange={handleChange} name='currentPassword' type={showPassword ? 'text' : 'password'} />
                  </div>
                  <div className='grid grid-cols-2'>
                    <label>Nueva contraseña</label>
                    <Input value={values.toPassword.newPassword} onChange={handleChange} name='newPassword' type={showPassword ? 'text' : 'password'} />
                  </div>
                  <div className='grid grid-cols-2'>
                    <label>Confirmar contraseña</label>
                    <Input value={values.toPassword.confirmPassword} onChange={handleChange} name='confirmPassword' type={showPassword ? 'text' : 'password'} />
                  </div>

                  <div className='flex gap-2 w-2/3 my-4 items-center'>
                    <Button loading={loading} type='submit' className='bg-purple-600 flex-1 hover:bg-purple-800'>Guardar</Button>
                    <Button className='flex-1' onClick={handleClose}>Cancelar</Button>
                  </div>
                </form>
              </section>
              )}

        </div>
      </ModalBackdrop>
    </>
  )
}
