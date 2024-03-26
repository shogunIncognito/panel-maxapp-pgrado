import Button from './Button'
import { updatePreviewImage } from '@/services/api'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useCarsStore from '@/hooks/useCarsStore'
import { CarDTO } from '@/types'
import { ActionTypes } from '@/reducers/panelCarsReducer'
import { useSession } from 'next-auth/react'

const selectedClass = 'dark:border-green-500 border-purple-500 shadow-xl'

interface ChangePreviewCarProps {
  car: CarDTO
  setCar: (type: ActionTypes, payload: any) => void
}

export default function ChangePreviewCar ({ car, setCar }: ChangePreviewCarProps): JSX.Element {
  const { reFetch } = useCarsStore()
  const { data: session } = useSession()
  const [selectedImage, setSelectedImage] = useState(car.preview)
  const [loading, setLoading] = useState(false)

  const isValidImage = selectedImage !== car.preview

  const handleChangePreview = (): void => {
    if (!isValidImage) {
      toast.error('La imagen seleccionada ya es la previsualización')
      return
    }

    setLoading(true)
    updatePreviewImage(car._id, selectedImage, session?.user.token)
      .then(() => {
        toast.success('Imagen de previsualización cambiada')
        reFetch(session?.user.token)
      })
      .catch((err) => {
        console.log(err)
        toast.error('Error al cambiar la imagen de previsualización')
      })
      .finally(() => {
        handleDispatch()
        setLoading(false)
      })
  }

  const handleDispatch = (): void => setCar(ActionTypes.SET_CAR_PREVIEW_TO_CHANGE, null)

  return (
    <>
      <h2 className='text-center text-xl opacity-75 mb-6'>Selecciona una imagen de previsualización</h2>
      <section className='grid grid-rows-3 grid-flow-col overflow-x-auto p-1 gap-2 md:place-content-center'>
        {car.images.map((image, index) => (
          <img onClick={() => setSelectedImage(image)} key={index} className={`md:w-44 w-24 border-4 border-transparent max-w-fit cursor-pointer hover:opacity-60 select-none max-h-44 rounded ${selectedImage === image ? selectedClass : ''} h-auto object-contain`} src={image} alt={car.line} />
        ))}
      </section>
      <div className='flex mt-5 gap-2 justify-center items-center'>
        <Button loading={loading} type='submit' disabled={!isValidImage || loading} onClick={handleChangePreview} className='bg-purple-600 disabled:bg-purple-900 hover:bg-purple-800 text-white py-3 px-6 w-1/3 self-center'>
          Cambiar
        </Button>
        <Button onClick={() => handleDispatch()} className='bg-gray-600 hover:bg-neutral-500 font-bold w-1/3 py-3 px-6'>
          Cerrar
        </Button>
      </div>
    </>
  )
}
