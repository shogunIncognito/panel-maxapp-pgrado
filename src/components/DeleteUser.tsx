import useDisclosure from '@/hooks/useDisclosure'
import ModalBackdrop from './ModalBackdrop'
import Button from './Button'
import { useState } from 'react'
import { deleteUser } from '@/services/api'
import toast from 'react-hot-toast'
import { deleteUserCodes } from '@/utils/statusCodes'
import { UserDTO } from '@/types'
import { useSession } from 'next-auth/react'
import { deleteUserImage } from '@/services/firebase'

interface DeleteUserProps {
  user: UserDTO
  setUsers: any
}

export default function DeleteUser ({ user, setUsers }: DeleteUserProps): JSX.Element {
  const { open, handleClose, handleOpen } = useDisclosure()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)

  const handleDelete = (): void => {
    setLoading(true)

    Promise.all([deleteUser(user._id, session?.user.token), deleteUserImage(user.image)])
      .then(() => {
        toast.success('Usuario eliminado')
        setUsers((prev: UserDTO[]) => prev.filter(u => u._id !== user._id))
        handleClose()
      })
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      .catch(err => toast.error(deleteUserCodes[err.response.status] || 'Error al eliminar usuario'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Button onClick={handleOpen} className='transition-colors w-full lg:w-1/2 mt-1 bg-[#FBD38D] hover:bg-yellow-400/70 font-semibold text-black/70 py-2 px-4 rounded'>
        Eliminar
      </Button>

      <ModalBackdrop open={open} className='md:w-auto justify-center items-center font-bold gap-5'>
        <h2 className='text-xl opacity-85'>Eliminar usuario</h2>
        <h2 className='text-lg opacity-85'>El usuario <span className='text-red-400'>{user.username}</span> sera eliminado</h2>
        <div className='flex gap-1 w-full justify-center'>
          <Button
            loading={loading}
            disabled={loading}
            className='bg-[#FBD38D] flex-1 hover:bg-yellow-400/70 font-semibold text-black/70 disabled:bg-yellow-900 disabled:pointer-events-none'
            onClick={handleDelete}
          >
            Eliminar
          </Button>
          <Button className='flex-1' onClick={handleClose}>Cancelar</Button>
        </div>
      </ModalBackdrop>
    </>
  )
}
