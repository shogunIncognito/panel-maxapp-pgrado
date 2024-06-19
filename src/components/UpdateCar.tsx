'use client'

import { useState } from 'react'
import { deleteCarImageFromApi, updateCar } from '@/services/api'
import useCarsStore from '@/hooks/useCarsStore'
import toast from 'react-hot-toast'
import { getObjectsDiff } from '@/utils/functions'
import { deleteCarsImages, uploadCarsImages } from '@/services/firebase'
import CarForm from './CarForm'
import { updateCarCodes } from '@/utils/statusCodes'
import { CarDTO, CarFormData } from '@/types'
import { ActionTypes } from '@/reducers/panelCarsReducer'
import { useSession } from 'next-auth/react'

interface UpdateCarProps {
  selectedCar: CarDTO
  setSelectedCar: (type: ActionTypes, payload: any) => void
}

export default function UpdateCar ({ selectedCar, setSelectedCar }: UpdateCarProps): JSX.Element {
  const { fetchCars, brands } = useCarsStore()
  const { data: session } = useSession()
  const [values, setValues] = useState(selectedCar)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Array<string | { url: string, file: File }>>(selectedCar.images)

  const handleSubmit = async (data: CarFormData): Promise<void> => {
    const valuesFormed = {
      ...values,
      ...data,
      brand: values.brand,
      fuel: values.fuel,
      transmission: values.transmission,
      type: values.type,
      cc: values.cc,
      show: values.show
    }

    // el id no se actualiza
    if (valuesFormed.images.length === 0) {
      toast.error('Debe agregar una imagen')
      return
    }

    const urlsToUpload = images.reduce<File[]>((acc, curr) => {
      if (typeof curr === 'string') return acc
      return [...acc, curr.file]
    }, [])

    const valuesToUpdate = getObjectsDiff(selectedCar, valuesFormed)

    if (Object.keys(valuesToUpdate).length === 0 && urlsToUpload.length === 0) {
      toast.error('No hay cambios')
      return
    }

    try {
      setLoading(true)
      const newImages = await uploadCarsImages(urlsToUpload, selectedCar.plate)

      if (newImages.length > 0) {
        valuesToUpdate.images = [...newImages, ...selectedCar.images]
      }

      await updateCar(selectedCar._id, valuesToUpdate, session?.user.token)

      fetchCars(1)
      handleClose()
      toast.success('Auto actualizado')
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      toast.error(updateCarCodes[error.response.status] || 'Error al actualizar auto')
    } finally {
      setLoading(false)
    }
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files == null) {
      toast.error('Error al cargar imagen')
      return
    }

    const files = Array.from(e.target.files)
    // imágenes que se van a subir

    const mapedFiles = files.map((file) => {
      const url = URL.createObjectURL(file)
      return { url, file }
    })

    // imagenes que se van a mostrar como preview
    const newUrls = [...images, ...mapedFiles]
    setImages(newUrls)
  }

  const handleDeleteImage = async (img: { url: string, file: File } | string): Promise<void> => {
    try {
      setLoading(true)
      if (typeof img === 'object') {
        setImages(prev => prev.filter(image => {
          // con if la otra forma por si no funciona esta
          return typeof image === 'string' || image.url !== img.url
        }))
        toast.success('Imagen eliminada')
        return
      }

      const realCarImages = images.filter(imag => typeof imag !== 'object')

      if (realCarImages.length === 1) {
        toast.error('El carro debe tener al menos una imagen')
        return
      }

      await deleteCarImageFromApi(selectedCar._id, [img], session?.user.token)
      await deleteCarsImages([img])

      setImages(prev => prev.filter(image => image !== img))
      toast.success('Imagen eliminada')
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar imagen')
    } finally {
      setLoading(false)
      fetchCars(1)
    }
  }

  const handleClose = (): void => setSelectedCar(ActionTypes.SET_SELECTED_CAR, null)

  return (
    <>
      <h2 className='text-2xl font-bold opacity-80 mb-3'>Actualizar auto</h2>
      <CarForm
        setValues={setValues}
        handleDeleteImage={handleDeleteImage}
        handleImage={handleImage}
        handleSubmit={handleSubmit}
        values={values}
        loading={loading}
        images={images}
        brands={brands}
        handleClose={handleClose}
      >
        Actualizar
      </CarForm>
    </>
  )
}
