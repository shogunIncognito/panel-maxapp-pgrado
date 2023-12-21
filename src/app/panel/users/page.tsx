/* eslint-disable @typescript-eslint/restrict-template-expressions */
'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import ModalBackdrop from '@/components/ModalBackdrop'
import Spinner from '@/components/Spinner'
import DeleteUser from '@/components/DeleteUser'
import useDisclosure from '@/hooks/useDisclosure'
import { createUser, getUsers } from '@/services/api'
import { objectHasEmptyValues } from '@/utils/functions'
import { createUserCodes } from '@/utils/statusCodes'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import SampleUserImage from '@/assets/unknown-userimage.png'
import { CreateUserDTO, UserDTO } from '@/types'
import Select from '@/components/Select'
import { useSession } from 'next-auth/react'

export default function Users (): JSX.Element {
  const [users, setUsers] = useState<UserDTO[]>([])
  const [loading, setLoading] = useState({
    create: false,
    getUsers: true
  })
  const { data: session } = useSession()
  const { handleClose, handleOpen, open } = useDisclosure()

  useEffect(() => {
    setLoading({ ...loading, getUsers: true })
    getUsers(session?.user.token)
      .then(res => setUsers(res))
      .catch(err => toast.error(err.message))
      .finally(() => setLoading({ ...loading, getUsers: false }))
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const data = Object.fromEntries(new FormData(e.target as HTMLFormElement)) as CreateUserDTO

    if (objectHasEmptyValues(data)) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    setLoading({ ...loading, create: true })

    createUser(data, session?.user.token)
      .then(res => {
        setUsers([...users, res])
        toast.success('Usuario creado');
        (e.target as HTMLFormElement).reset()
        handleClose()
      })
      .catch(err => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        toast.error(createUserCodes[err.response.status] || 'Error al crear usuario')
      })
      .finally(() => {
        setLoading({ ...loading, create: false })
      })
  }

  const filteredUsers = (session !== null) ? users.filter(user => user._id !== session.user.token) : []

  return (
    <section className='flex-1'>
      <header className='flex p-4 w-full justify-start items-center flex-col'>
        <h2 className='text-3xl self-center opacity-75 font-bold text-black dark:text-white font-mono md:hidden my-5'>Usuarios</h2>
        <Button onClick={handleOpen} className={`md:self-start self-center ${loading.getUsers && 'invisible'}`}>Agregar usuario</Button>
      </header>

      <ModalBackdrop open={open}>
        <h2 className='text-2xl opacity-75 self-center'>Agregar usuario</h2>
        <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col gap-3 mt-4 p-4 rounded'>
          <div className='flex md:flex-row flex-col gap-2'>
            <div className='w-full flex flex-col gap-1'>
              <label className='opacity-80 font-bold' htmlFor='username'>Nombre</label>
              <Input required className='p-2' name='username' type='text' id='username' placeholder='Pedro' />
            </div>
            <div className='w-full flex flex-col gap-1'>
              <label className='opacity-80 font-bold' htmlFor='password'>Contraseña</label>
              <Input required className='p-2' name='password' type='password' id='password' placeholder='*******' />
            </div>
          </div>
          <div className='w-1/2 flex flex-col gap-1 mt-3'>
            <Select name='role' id='role'>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='admin'>Admin</option>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='usuario'>Usuario</option>
            </Select>
          </div>

          <div className='flex items-center gap-2 mt-3'>
            <Button type='submit' loading={loading.create} disabled={loading.create} className='py-2 mt-2 w-40 self-center bg-purple-600 hover:bg-purple-800'>Crear</Button>
            <Button onClick={handleClose} className='py-2 mt-2 w-40 self-center'>Cancelar</Button>
          </div>

        </form>
      </ModalBackdrop>

      <div className='flex-1 pb-4 px-3 overflow-auto w-max-[90%] max-h-[44%] md:max-h-[62%] lg:max-h-[53%]'>
        {loading.getUsers
          ? <Spinner className='mt-10' />
          : (
            <table className='w-full max-w-full text-sm text-center text-gray-800 dark:text-gray-400'>
              <thead className='text-xs dark:bg-[#171923] bg-slate-300/70 sticky top-0 uppercase text-gray-800 dark:text-gray-400'>
                <tr className='p-0.5'>
                  <th scope='col' className='px-6 py-3'>
                    Imagen
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Nombre
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Rol
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>

                {filteredUsers.length === 0 && (
                  <tr className='border-b bg-gray-800 border-gray-700'>
                    <td colSpan={11} className='px-6 py-4 font-medium whitespace-nowrap dark:text-white'>
                      No hay usuarios
                    </td>
                  </tr>
                )}

                {filteredUsers.map(user => (
                  <tr key={user._id} className='border-b bg-transparent border-gray-700'>
                    <th scope='row' className='px-6 py-4 grid place-content-center font-medium whitespace-nowrap dark:text-white'>
                      {user.image !== undefined
                        ? <img src={user.image} alt='user' className='w-14 h-14 select-none pointer-events-none object-cover rounded-full' />
                        : <img src={SampleUserImage.src} alt='user' className='w-14 h-14 dark:invert select-none pointer-events-none dark:bg-neutral-200 ring-2 ring-black dark:ring-slate-800 object-cover rounded-full' />}
                    </th>
                    <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap dark:text-white'>
                      {user.username}
                    </th>
                    <th scope='row' className='px-6 py-4 font-medium capitalize whitespace-nowrap dark:text-white'>
                      {user.role}
                    </th>
                    <td className='px-6 py-4 h-full w-1/6 m-auto'>
                      <DeleteUser setUsers={setUsers} user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
      </div>
    </section>
  )
}
