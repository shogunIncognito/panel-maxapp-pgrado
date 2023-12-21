/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import SampleUserImage from '@/assets/unknown-userimage.png'
import ModalBackdrop from './ModalBackdrop'
import { MdEdit } from 'react-icons/md'
import useDisclosure from '@/hooks/useDisclosure'
import { useState } from 'react'
import Button from './Button'
import { updateUserImage } from '@/services/api'
import { uploadUserImage } from '@/services/firebase'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

interface UserImageInterface {
  newImage: File | undefined
  previewImage: any
  loading: boolean
}

export default function UserImage ({ image }: { image: string | undefined }): JSX.Element {
  const { data: session, status } = useSession()
  const { open, handleClose, handleOpen } = useDisclosure()
  const [imageValues, setImage] = useState<UserImageInterface>({
    newImage: undefined,
    previewImage: undefined,
    loading: false
  })

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(prev => ({ ...prev, newImage: file }))

    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(prev => ({ ...prev, previewImage: reader.result }))
    }
  }

  const handleUpdate = async (): Promise<void> => {
    try {
      if (status === 'unauthenticated' || !imageValues.newImage || !session?.user) return
      setImage(prev => ({ ...prev, loading: true }))

      const newImage = await uploadUserImage(session.user._id, imageValues.newImage)
      await updateUserImage(session.user._id, newImage, session.user.token)

      toast.success('Imagen actualizada, vuelve a iniciar sesión para ver los cambios')
    } catch (error) {
      console.log(error)
      toast.error('Ocurrió un error al actualizar la imagen')
    } finally {
      setImage(prev => ({ ...prev, loading: false }))
      handleClose()
    }
  }

  return (
    <>
      <div className='group relative transition-all'>
        <div className='group-hover:blur-sm transition-all'>
          {image !== undefined
            ? <img src={image} alt='user' className='w-10 h-10 select-none pointer-events-none object-cover rounded-full' />
            : <img src={SampleUserImage.src} alt='user' className='w-10 h-10 dark:invert select-none pointer-events-none dark:bg-neutral-200 ring-2 ring-black dark:ring-slate-800 object-cover rounded-full' />}
        </div>
        <span onClick={handleOpen} className='group-hover:grid place-content-center hidden cursor-pointer absolute text-white top-0 left-0 right-0 bottom-0'><MdEdit size={21} className='dark:invert-0 invert' /></span>
      </div>
      <ModalBackdrop open={open} className='md:flex-row gap-2 flex-col justify-center items-center'>
        <div>
          {imageValues.previewImage !== undefined
            ? (
              <img src={imageValues.previewImage} alt='user' className='w-36 h-36 select-none pointer-events-none object-cover rounded-full' />
              )
            : (
              <img src={image ?? SampleUserImage.src} alt='user' className='w-36 h-36 select-none pointer-events-none object-cover rounded-full' />
              )}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold mb-5 max-w-xs text-center'>Cambiar imagen de usuario</h1>
          <label className='dark:text-white text-black bg-gray-300 dark:bg-gray-500 hover:bg-neutral-400 transition-colors dark:hover:bg-neutral-600 px-3 py-2 rounded'>
            Seleccionar imagen
            <input hidden type='file' multiple onChange={handleImage} accept='image/*' />
          </label>
          <div className='flex gap-2'>
            <Button loading={imageValues.loading} onClick={handleUpdate} className='mt-3 w-2/3' disabled={!imageValues.newImage}>Guardar</Button>
            <Button onClick={handleClose} className='mt-3 w-2/3 bg-purple-500'>Cancelar</Button>
          </div>
        </div>
      </ModalBackdrop>
    </>
  )
}
