import ModalBackdrop from './ModalBackdrop'
import Button from './Button'
import { updatePreviewImage } from '@/services/api'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useCarsStore from '@/hooks/useCarsStore'

const selectedClass = 'border-4 dark:border-green-500 border-purple-500 shadow-xl'

export default function ChangePreviewCar ({ car, setCar }) {
  const { reFetch } = useCarsStore()
  const [selectedImage, setSelectedImage] = useState(car.preview)
  const [loading, setLoading] = useState(false)

  const isValidImage = selectedImage !== car.preview

  const handleChangePreview = () => {
    if (!isValidImage) return toast.error('La imagen seleccionada ya es la previsualización')

    setLoading(true)
    updatePreviewImage(car.id, selectedImage)
      .then(() => {
        toast.success('Imagen de previsualización cambiada')
        reFetch()
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

  const handleDispatch = () => setCar('SET_CAR_PREVIEW_TO_CHANGE', null)

  return (
    <ModalBackdrop open>
      <h2 className='text-center text-xl opacity-75 mb-6'>Selecciona una imagen de previsualización</h2>
      <section className='grid grid-rows-3 grid-flow-col overflow-x-auto p-1 gap-2 md:place-content-center'>
        {car.image.map((image, index) => (
          <img onClick={() => setSelectedImage(image)} key={index} className={`md:w-44 w-24 max-w-fit cursor-pointer hover:opacity-60 select-none max-h-44 rounded ${selectedImage === image && selectedClass} h-auto object-contain`} src={image} alt={car.name} />
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
    </ModalBackdrop>
  )
}
