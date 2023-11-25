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

export default function UpdateCar ({ selectedCar, setSelectedCar }) {
  const { reFetch, brands } = useCarsStore()
  const [values, setValues] = useState(selectedCar)
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState(selectedCar.image)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // el id no se actualiza
    const { description, preview, id, brand, ...restOfForm } = values

    if (!values.image) return toast.error('Debe agregar una imagen')
    if (objectHasEmptyValues(restOfForm)) return toast.error('Todos los campos son obligatorios')

    const urlsToUpload = images.reduce((acc, curr) => {
      if (typeof curr === 'string') return acc
      return [...acc, curr.file]
    }, [])

    const valuesToUpdate = getObjectsDiff(selectedCar, { ...values, description })

    if (Object.keys(valuesToUpdate).length === 0 && urlsToUpload.length === 0) return toast.error('No hay cambios')

    const isValidForm = validateFormValues(restOfForm)
    if (!isValidForm.valid) return toast.error(isValidForm.message)

    try {
      setLoading(true)
      const newImages = await uploadCarsImages(urlsToUpload, selectedCar.plate)

      if (newImages.length > 0) {
        valuesToUpdate.image = newImages.join('&&&')
      }

      await updateCar(selectedCar.id, valuesToUpdate)

      reFetch()
      handleClose()
      toast.success('Auto actualizado')
    } catch (error) {
      toast.error(updateCarCodes[error.response.status] || 'Error al actualizar auto')
    } finally {
      setLoading(false)
    }
  }

  const handleImage = (e) => {
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

  const handleDeleteImage = async (img) => {
    try {
      setLoading(true)
      if (typeof img === 'object') {
        setImages(prev => prev.filter(image => image.url !== img.url))
        toast.success('Imagen eliminada')
        return
      }

      const realCarImages = images.filter(imag => typeof imag !== 'object')
      if (realCarImages.length === 1) return toast.error('El carro debe tener al menos una imagen')

      await deleteCarImageFromApi(selectedCar.id, img)
      await deleteCarImage(img)

      setImages(prev => prev.filter(image => image !== img))
      toast.success('Imagen eliminada')
    } catch (error) {
      console.log(error)
      toast.error('Error al eliminar imagen')
    } finally {
      setLoading(false)
      reFetch()
    }
  }

  const handleClose = () => setSelectedCar('SET_SELECTED_CAR', null)

  return (
    <>
      <ModalBackdrop open>
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
      </ModalBackdrop>
    </>
  )
}
