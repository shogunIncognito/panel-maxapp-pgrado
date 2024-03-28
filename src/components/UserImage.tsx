/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import defaultAvatar from '@/assets/default-avatar.webp'
import ModalBackdrop from './ModalBackdrop'
import { MdEdit } from 'react-icons/md'
import useDisclosure from '@/hooks/useDisclosure'
import { useState } from 'react'
import Button from './Button'
import { updateUserImage } from '@/services/api'
import { uploadUserImage } from '@/services/firebase'
import toast from 'react-hot-toast'
import { signIn, useSession } from 'next-auth/react'
import { IoIosCloseCircle } from 'react-icons/io'

interface UserImageInterface {
  newImage: File | undefined
  previewImage: any
  deleteImage: boolean
  loading: boolean
}

export default function UserImage ({ image }: { image: string | undefined }): JSX.Element {
  const { data: session, status } = useSession()
  const { open, handleClose: handleCloseModal, handleOpen } = useDisclosure()
  const [imageValues, setImage] = useState<UserImageInterface>({
    newImage: undefined,
    previewImage: image,
    deleteImage: false,
    loading: false
  })

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0]
    if (!file) return

    setImage(prev => ({ ...prev, newImage: file, deleteImage: false }))

    // eslint-disable-next-line no-undef
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setImage(prev => ({ ...prev, previewImage: reader.result }))
    }
  }

  const handleUpdate = async (): Promise<void> => {
    try {
      if (status === 'unauthenticated' || !session?.user) return
      setImage(prev => ({ ...prev, loading: true }))

      if (imageValues.deleteImage) {
        await updateUserImage(session.user._id, null, session.user.token)
        toast.success('Imagen eliminada')
        return
      }

      if (!imageValues.newImage) {
        toast.error('Selecciona una imagen')
        return
      }

      const newImage = await uploadUserImage(session.user._id, imageValues.newImage)
      await updateUserImage(session.user._id, newImage, session.user.token)

      toast.success('Imagen actualizada')
    } catch (error) {
      console.log(error)
      toast.error('Ocurrió un error al actualizar la imagen')
    } finally {
      setImage(prev => ({ ...prev, loading: false, newImage: undefined, deleteImage: false }))
      handleClose()
      // esto va actualizar la sesión
      void signIn()
    }
  }

  const handleDeleteImage = (): void => {
    if (imageValues.previewImage === null) return
    setImage(prev => ({ ...prev, newImage: undefined, previewImage: null, deleteImage: true }))
  }

  const handleClose = (): void => {
    setImage(prev => ({ ...prev, newImage: undefined, previewImage: image, deleteImage: false }))
    handleCloseModal()
  }

  return (
    <>
      <div className='group relative transition-all'>
        <div className='group-hover:grayscale transition-all'>
          {image !== null
            ? <img src={image} alt='user' className='w-10 h-10 select-none pointer-events-none object-cover rounded-full' />
            : <img src={defaultAvatar.src} alt='user' className='w-10 h-10 select-none pointer-events-none dark:bg-neutral-200 ring-2 ring-black dark:ring-slate-800 object-cover rounded-full' />}
        </div>
        <span onClick={handleOpen} className='group-hover:grid place-content-center hidden cursor-pointer absolute text-white top-0 left-0 right-0 bottom-0'><MdEdit size={21} /></span>
      </div>

      <ModalBackdrop open={open} className='md:flex-row z-50 gap-4 flex-col justify-center items-center'>
        <div className='relative'>
          <span onClick={handleDeleteImage} className='absolute top-0 right-0 z-20 cursor-pointer bg-gray-200 rounded-full text-xl text-black dark:text-black'>
            <IoIosCloseCircle size={34} />
          </span>
          {imageValues.previewImage === null
            ? <img src={defaultAvatar.src} alt='user' className='w-36 h-36 select-none pointer-events-none object-cover rounded-full' />
            : <img src={imageValues.previewImage} alt='user' className='w-36 h-36 dark:bg-gray-300 select-none pointer-events-none object-cover rounded-full' />}
        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='md:text-2xl text-lg font-bold mb-5 max-w-xs text-center'>Cambiar imagen de usuario</h1>
          <label className='dark:text-white text-black bg-gray-300 dark:bg-gray-500 hover:bg-neutral-400 transition-colors dark:hover:bg-neutral-600 px-3 py-2 rounded'>
            Seleccionar imagen
            <input hidden type='file' multiple onChange={handleImage} accept='image/*' />
          </label>
          <div className='flex gap-2'>
            <Button loading={imageValues.loading} onClick={handleUpdate} className='mt-3 w-32' disabled={!imageValues.newImage && !imageValues.deleteImage}>Guardar</Button>
            <Button onClick={handleClose} type='button' className='mt-3 w-32 bg-purple-500 hover:bg-purple-700'>Cancelar</Button>
          </div>
        </div>
      </ModalBackdrop>
    </>
  )
}
