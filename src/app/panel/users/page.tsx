'use client'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import DeleteUser from '@/components/DeleteUser'
import useDisclosure from '@/hooks/useDisclosure'
import { createUser, getUsers, updateOneUser } from '@/services/api'
import { createUserCodes } from '@/utils/statusCodes'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import defaultAvatar from '@/assets/default-avatar.webp'
import { UserDTO, UserFormData } from '@/types'
import { useSession } from 'next-auth/react'
import UserForm from '@/components/UserForm'
import ModalBackdrop from '@/components/ModalBackdrop'

const initialValues = {
  username: '',
  password: '',
  role: 'usuario'
}

export default function Users (): JSX.Element {
  const [users, setUsers] = useState<UserDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMutation, setLoadingMutation] = useState(false)
  const { data: session } = useSession()
  const { handleClose: handleCloseCreate, handleOpen: handleOpenCreate, open: openCreate } = useDisclosure()
  const { handleClose: handleCloseUpdate, handleOpen: handleOpenUpdate, open: openUpdate } = useDisclosure()
  const [userToUpdate, setUserToUpdate] = useState<UserDTO | null>(null)

  useEffect(() => {
    setLoading(true)
    getUsers(session?.user.token)
      .then(res => {
        const userFiltered = res.filter(usr => usr._id !== session?.user._id)        
        setUsers(userFiltered)
      })
      .catch(err => toast.error(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleCreate = (data: UserFormData): void => {
    if (data.password === '') {
      toast.error('La contraseña no puede estar vacía')
      return
    }

    setLoadingMutation(true)

    createUser(data, session?.user.token)
      .then(res => {
        setUsers([...users, res])
        toast.success('Usuario creado')
        handleCloseCreate()
      })
      .catch(err => {
        toast.error(createUserCodes[err.response.status] || 'Error al crear usuario')
      })
      .finally(() => {
        setLoadingMutation(false)
      })
  }

  const handleUpdate = (data: UserFormData): void => {
    setLoadingMutation(true)
    updateOneUser(userToUpdate!._id, data, session?.user.token)
      .then(res => {
        setUsers(prev => prev.map(user => {
          return user._id === res._id ? res : user
        }))

        toast.success('Usuario actualizado')
        handleCloseUpdate()
      })
      .catch(err => {
        toast.error(createUserCodes[err.response.status] || 'Error al actualizar usuario')
      })
      .finally(() => {
        setLoadingMutation(false)
      })
  }

  const filteredUsers = (session !== null) ? users.filter(user => user._id !== session.user.token) : []

  return (
    <>
      <header className='flex p-4 w-full justify-start items-center flex-col'>
        <h2 className='text-3xl self-center opacity-75 font-bold text-black dark:text-white font-mono md:hidden my-5'>Usuarios</h2>
        <Button onClick={handleOpenCreate} className={`md:self-start self-center ${loading && 'hidden'}`}>Agregar usuario</Button>
      </header>

      <ModalBackdrop open={openCreate} className='p-4 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4'>
        <UserForm values={initialValues} handleClose={handleCloseCreate} handleSubmit={handleCreate} loading={loadingMutation} type='create' />
      </ModalBackdrop>

      <ModalBackdrop open={openUpdate} className='p-4 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4'>
        <UserForm values={userToUpdate !== null ? userToUpdate : initialValues} handleClose={handleCloseUpdate} handleSubmit={handleUpdate} loading={loadingMutation} type='update' />
      </ModalBackdrop>

      <div className='pb-4 max-w-full px-2 overflow-auto'>
        {loading
          ? <Spinner className='h-[80dvh]' />
          : (
            <table className='w-full text-sm text-center text-gray-800 dark:text-gray-400'>
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
                    <th scope='row' className='px-6 py-4 place-content-center font-medium whitespace-nowrap dark:text-white'>
                      {user.image !== null
                        ? <img src={user.image} alt='user' className='mx-auto w-14 h-14 select-none pointer-events-none object-cover rounded-full' />
                        : <img src={defaultAvatar.src} alt='user' className='mx-auto w-14 h-14 select-none pointer-events-none dark:bg-neutral-200 ring-2 ring-black dark:ring-slate-800 object-cover rounded-full' />}
                    </th>
                    <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap dark:text-white'>
                      {user.username}
                    </th>
                    <th scope='row' className='px-6 py-4 font-medium capitalize whitespace-nowrap dark:text-white'>
                      {user.role}
                    </th>
                    <td className='px-6 py-4 h-full w-1/6 m-auto'>
                      <Button
                        onClick={() => {
                          setUserToUpdate(user)
                          handleOpenUpdate()
                        }} className='transition-colors w-full mt-1 font-semibold py-2 px-4 rounded'
                      >
                        Editar
                      </Button>
                      <DeleteUser setUsers={setUsers} user={user} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            )}
      </div>
    </>
  )
}
