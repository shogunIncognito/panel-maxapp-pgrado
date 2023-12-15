import SampleUserImage from '@/assets/unknown-userimage.png'
import ModalBackdrop from './ModalBackdrop'
import { MdEdit } from 'react-icons/md'
import useDisclosure from '@/hooks/useDisclosure'

export default function UserImage ({ image }: { image: string | undefined }): JSX.Element {
  const { open, handleClose, handleOpen } = useDisclosure()
  return (
    <>
      <div className='group relative transition-all'>
        <div className='group-hover:blur-sm transition-all'>
          {image === undefined
            ? <img src={image} alt='user' className='w-10 h-10 select-none pointer-events-none object-cover rounded-full' />
            : <img src={SampleUserImage.src} alt='user' className='w-10 h-10 dark:invert select-none pointer-events-none dark:bg-neutral-200 ring-2 ring-black dark:ring-slate-800 object-cover rounded-full' />}
        </div>
        <span onClick={handleOpen} className='group-hover:grid place-content-center hidden cursor-pointer absolute text-white top-0 left-0 right-0 bottom-0'><MdEdit size={21} className='dark:invert-0 invert' /></span>
      </div>
      <ModalBackdrop open={open} className='flex-row gap-5'>
        <div>
          <img src={image} alt='user' className='w-32 h-32 select-none pointer-events-none object-cover rounded-full' />
        </div>
        <div>
          <h1 className='text-2xl font-bold'>Cambiar imagen</h1>
          <p className='text-sm text-gray-500'>Puedes cambiar tu imagen de perfil, solo debes subir una imagen en formato .png o .jpg</p>
          <input type='file' className='w-full mt-4' />
          <button onClick={handleClose} className='w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2'>Cambiar imagen</button>
        </div>
      </ModalBackdrop>
    </>
  )
}
