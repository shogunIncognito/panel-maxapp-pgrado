'use client'

import ModalBackdrop from './ModalBackdrop'
import { useState } from 'react'
import { deleteCarImageFromApi, updateCar } from '@/services/api'
import useCarsStore from '@/hooks/useCarsStore'
import toast from 'react-hot-toast'
import { getObjectsDiff, objectHasEmptyValues, validateFormValues } from '@/utils/functions'
import { deleteCarImage, uploadCarsImages } from '@/services/firebase'
import CarForm from './CarForm'
import { updateCarCodes } from '@/utils/statusCodes'
import { CarDTO } from '@/types'
import { ActionTypes } from '@/reducers/panelCarsReducer'
import { useSession } from 'next-auth/react'

interface UpdateCarProps {
  selectedCar: CarDTO
  setSelectedCar: (type: ActionTypes, payload: any) => void
}

export default function UpdateCar ({ selectedCar, setSelectedCar }: UpdateCarProps): JSX.Element {
  const { reFetch, brands } = useCarsStore()
  const { data: session } = useSession()
  const [values, setValues] = useState(selectedCar)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<Array<string | { url: string, file: File }>>(selectedCar.images)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()

    // el id no se actualiza
    const { description, preview, _id, brand, ...restOfForm } = values

    if (values.images.length === 0) {
      toast.error('Debe agregar una imagen')
      return
    }

    if (objectHasEmptyValues(restOfForm)) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    const urlsToUpload = images.reduce<File[]>((acc, curr) => {
      if (typeof curr === 'string') return acc
      return [...acc, curr.file]
    }, [])

    const valuesToUpdate = getObjectsDiff(selectedCar, { ...values, description })

    if (Object.keys(valuesToUpdate).length === 0 && urlsToUpload.length === 0) {
      toast.error('No hay cambios')
      return
    }

    const isValidForm = validateFormValues(restOfForm)

    if (!isValidForm.valid) {
      toast.error(isValidForm.message)
      return
    }

    try {
      setLoading(true)
      const newImages = await uploadCarsImages(urlsToUpload, selectedCar.plate)

      if (newImages.length > 0) {
        valuesToUpdate.images = [...newImages, ...selectedCar.images]
      }

      await updateCar(selectedCar._id, valuesToUpdate, session?.user.token)

      reFetch(session?.user.token)
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

      await deleteCarImageFromApi(selectedCar._id, img, session?.user.token)
      await deleteCarImage(img)

      setImages(prev => prev.filter(image => image !== img))
      toast.success('Imagen eliminada')
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar imagen')
    } finally {
      setLoading(false)
      reFetch(session?.user.token)
    }
  }

  const handleClose = (): void => setSelectedCar(ActionTypes.SET_SELECTED_CAR, null)

  return (
    <>
      <ModalBackdrop open>
        <h2 className='text-2xl font-bold opacity-80 mb-3'>Actualizar auto</h2>
        <CarForm
          setValues={setValues}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
      </ModalBackdrop>
    </>
  )
}
