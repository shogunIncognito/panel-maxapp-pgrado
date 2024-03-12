/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import useDisclosure from '@/hooks/useDisclosure'
import Button from './Button'
import ModalBackdrop from './ModalBackdrop'
import Input from './Input'
import { createBrand, deleteBrand } from '@/services/api'
import { useState } from 'react'
import useCarsStore from '@/hooks/useCarsStore'
import toast from 'react-hot-toast'
import Select from './Select'
import { createBrandCodes, deleteBrandCodes } from '@/utils/statusCodes'
import { useSession } from 'next-auth/react'
import { twMerge } from 'tailwind-merge'

export default function Brands ({ className }: { className?: string }): JSX.Element {
  const { open, handleClose, handleOpen } = useDisclosure()
  const { reFetch, brands, loading: brandsLoading } = useCarsStore()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const [brand, setBrand] = useState({
    brandToDelete: brands[0]?._id,
    brandToAdd: ''
  })

  const handleCreate = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!brand.brandToAdd) {
      toast.error('La marca a añadir no puede estar vacía')
      return
    }

    setLoading(true)

    createBrand(brand.brandToAdd, session?.user.token)
      .then(() => {
        toast.success('Marca creada')
        reFetch(session?.user.token)
        setBrand({ ...brand, brandToAdd: '' })
      })
      .catch(err => toast.error(createBrandCodes[err.response.status] || 'Error al crear marca'))
      .finally(() => setLoading(false))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (e.target.value === ' ') return
    setBrand({
      ...brand,
      [e.target.name]: e.target.value
    })
  }

  const handleDelete = (): void => {
    setLoading(true)

    deleteBrand(brand.brandToDelete, session?.user.token)
      .then(() => {
        toast.success('Marca eliminada')
        reFetch(session?.user.token)
        setBrand({
          ...brand,
          brandToDelete: brands[0]?._id
        })
      })
      .catch(err => toast.error(deleteBrandCodes[err.response.status] || 'Error al eliminar marca'))
      .finally(() => setLoading(false))
  }

  return (
    <>
      <Button className={twMerge('font-semibold py-2 px-1.5 md:px-4 bg-[#0987A0] hover:bg-sky-500', className)} onClick={handleOpen}>Gestionar marcas</Button>

      <ModalBackdrop open={open} className='gap-6 justify-center items-center p-8 md:w-auto'>
        <h1 className='text-xl font-bold opacity-80'>Añadir o eliminar marcas</h1>
        <div className='flex gap-6 md:flex-row flex-col'>
          <form onSubmit={handleCreate} className='gap-4 flex-1 justify-center items-center flex flex-col'>
            <div>
              <h2 className='text-lg opacity-85'>Nombre de marca a añadir</h2>
              <Input name='brandToAdd' value={brand.brandToAdd} onChange={handleChange} className='py-2' placeholder='Renault...' />
            </div>
            <div className='flex gap-1 flex-1 w-3/6'>
              <Button
                loading={loading}
                disabled={loading}
                className='py-2 flex-1 bg-green-600 hover:bg-green-800 disabled:bg-green-900 disabled:pointer-events-none'
              >
                Agregar
              </Button>
            </div>
          </form>
          <form className='gap-4 flex-1 justify-center items-center flex flex-col'>
            <div>
              <h2 className='text-lg opacity-85'>Seleccionar marca a eliminar</h2>

              <Select className='w-full' name='brandToDelete' value={brand.brandToDelete} onChange={handleChange}>
                {!brandsLoading
                  ? brands.map(brand => (
                    <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' key={brand._id} value={brand.name}>{brand.name}</option>
                  ))
                  : <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700'>Cargando...</option>}
              </Select>

            </div>
            <div className='flex gap-1 flex-1 w-3/6'>
              <Button
                loading={loading}
                disabled={loading || brandsLoading}
                className='py-2 flex-1 bg-red-600 hover:bg-red-800 disabled:bg-red-900 disabled:pointer-events-none'
                onClick={handleDelete}
              >
                Eliminar
              </Button>
            </div>
          </form>
        </div>
        <Button className='py-2 w-32' onClick={handleClose}>Cerrar</Button>
      </ModalBackdrop>
    </>
  )
}
