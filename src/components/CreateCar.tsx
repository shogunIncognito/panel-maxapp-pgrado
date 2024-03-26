'use client'

import { useState } from 'react'
import { createCar, updateCar } from '@/services/api'
import useCarsStore from '@/hooks/useCarsStore'
import { objectHasEmptyValues, validateFormValues } from '@/utils/functions'
import toast from 'react-hot-toast'
import { uploadCarsImages } from '@/services/firebase'
import CarForm from './CarForm'
import Button from './Button'
import useDisclosure from '@/hooks/useDisclosure'
import ModalBackdrop from './ModalBackdrop'
import { createCarCodes } from '@/utils/statusCodes'
import { CreateCarDTO } from '@/types'
import { useSession } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'

const carInitialValues: CreateCarDTO = {
  brand: 'Mazda',
  fuel: 'corriente',
  transmission: 'manual',
  type: 'automovil',
  owners: '',
  kilometers: '',
  price: '',
  model: '',
  line: '',
  plate: '',
  description: '',
  color: '',
  cc: 1.0
}

// testing values
// const carInitialValues: CreateCarDTO = {
//   brand: 'Mazda',
//   fuel: 'corriente',
//   transmission: 'manual',
//   type: 'automovil',
//   owners: 2,
//   kilometers: 25000,
//   price: 35000000,
//   model: 2022,
//   line: 'captiva sport',
//   plate: 'xhg345',
//   description: 'pelo',
//   color: 'rojo',
//   cc: 1.4
// }

export default function CreateCar ({ className }: { className?: string }): JSX.Element {
  const { data: session } = useSession()
  const { addCar, brands } = useCarsStore()
  const { open, handleClose, handleOpen } = useDisclosure()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState(carInitialValues)
  const [images, setImages] = useState<Array<{ url: string, file: File }>>([])

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files == null) return

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    if (!open) return

    const { description, ...restOfForm } = values

    if (images.length === 0) {
      toast.error('Debe agregar una imagen')
      return
    }

    if (objectHasEmptyValues(restOfForm)) {
      toast.error('Todos los campos son obligatorios')
      return
    }

    const isValidForm = validateFormValues(restOfForm)

    if (!isValidForm.valid) {
      toast.error(isValidForm.message)
      return
    }

    const urlsToUpload = images.map(image => image.file)

    try {
      setLoading(true)
      const newCar = await createCar({ ...restOfForm, description }, session?.user.token)

      const uploadedCarImage = await uploadCarsImages(urlsToUpload, newCar.plate)
      const carWithImages = await updateCar(newCar._id, { images: uploadedCarImage }, session?.user.token)

      setImages([])

      addCar(carWithImages)

      toast.success('Auto agregado')
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      toast.error(createCarCodes[error.response.status] || 'Error al agregar auto')
      console.log(error)
    } finally {
      setLoading(false);

      (e.target as HTMLFormElement).reset()
      setValues(carInitialValues)
    }
  }

  const handleDeleteImage = (imageToDel: { url: string, file: File } | string): void => {
    if (typeof imageToDel === 'string') return
    const newImages = images.filter(image => image.url !== imageToDel.url)
    setImages(newImages)
  }

  return (
    <>
      <Button onClick={handleOpen} className={twMerge('bg-[#309654] font-semibold text-white hover:bg-green-600 py-2 px-1.5 md:px-4 rounded', className)}>
        Crear auto
      </Button>

      <ModalBackdrop open={open}>
        <h2 className='text-2xl font-bold opacity-80 mb-3'>Agregar auto</h2>
        <CarForm
          setValues={setValues}
          values={values}
          handleDeleteImage={handleDeleteImage}
          handleImage={handleImage}
          handleSubmit={handleSubmit}
          loading={loading}
          images={images}
          brands={brands}
          handleClose={handleClose}
        >
          Agregar
        </CarForm>
      </ModalBackdrop>
    </>
  )
}
