import Button from './Button'
import Input from './Input'
import Image from 'next/image'
import { carInputs, selectOptionsCC } from '@/helpers/data'
import Select from './Select'
import { AiFillDelete } from 'react-icons/ai'
import { BrandType, CreateCarDTO } from '@/types'

interface Props {
  setValues: any
  values: CreateCarDTO
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>
  loading: boolean
  images: Array<{ url: string, file: File } | string>
  handleDeleteImage: (image: { url: string, file: File } | string) => void
  handleClose: () => void
  brands: BrandType[]
  children: React.ReactNode
}

export default function CarForm ({
  setValues, values, handleImage, handleSubmit,
  loading, images, handleDeleteImage, handleClose, brands, children
}: Props): JSX.Element {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target

    if (['price', 'kilometers', 'owners', 'model', 'cc'].includes(name)) {
      setValues((prev: CreateCarDTO) => ({ ...prev, [name]: Number(value) }))
      return
    }

    setValues((prev: CreateCarDTO) => ({
      ...prev,
      [name]: name === 'plate' ? value.toUpperCase() : value
    }))
  }

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={handleSubmit} className='overflow-auto lg:max-h-90[dvh] max-h-[80dvh]'>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3'>
          <div className='flex flex-col gap-1 overflow-ellipsis'>
            <label className='dark:text-white after:content-["*"] text-black whitespace-nowrap text-ellipsis overflow-hidden'>Marca</label>
            <Select onChange={handleChange} value={values.brand} name='brand' id='brand'>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='' disabled>Seleccione una marca</option>
              {brands.map(brand => (
                <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' key={brand.name} value={brand.name}>{brand.name}</option>
              ))}
            </Select>
          </div>

          <div className='flex flex-col gap-1'>
            <label className='dark:text-white after:content-["*"] text-black whitespace-nowrap text-ellipsis overflow-hidden'>Tipo combustible</label>
            <Select onChange={handleChange} value={values.fuel} name='fuel' id='fuel'>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='corriente'>Corriente</option>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='diesel'>Diesel</option>
            </Select>
          </div>

          <div className='flex flex-col gap-1 overflow-ellipsis'>
            <label className='dark:text-white after:content-["*"] text-black whitespace-nowrap text-ellipsis overflow-hidden'>Transmisión</label>
            <Select onChange={handleChange} value={values.transmission} name='transmission' id='transmission'>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='manual'>Manual</option>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='automatica'>Automática</option>
            </Select>
          </div>

          <div className='flex flex-col gap-1 overflow-ellipsis'>
            <label className='dark:text-white after:content-["*"] text-black whitespace-nowrap text-ellipsis overflow-hidden'>Tipo de vehículo</label>
            <Select onChange={handleChange} value={values.type} name='type' id='type'>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='automovil'>Automóvil</option>
              <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='camioneta'>Camioneta</option>
            </Select>
          </div>

          <div className='flex flex-col gap-1 overflow-ellipsis'>
            <label className='dark:text-white after:content-["*"] text-black whitespace-nowrap text-ellipsis overflow-hidden'>CC</label>
            <Select onChange={handleChange} value={values.cc} name='cc' id='cc'>

              {selectOptionsCC.map((cc, index) => (
                <option key={index} className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value={cc}>{cc}</option>
              ))}

            </Select>
          </div>
          {
            carInputs.map((input, index) => (
              <div key={index} className='flex flex-col gap-1'>
                <label
                  className={`dark:text-white text-black whitespace-nowrap text-ellipsis overflow-hidden ${input.name !== 'description' ? 'after:content-["*"]' : ''}`}
                >
                  {input.label}
                </label>
                <Input
                  onChange={handleChange}
                  value={values[input.name as keyof CreateCarDTO]}
                  required={input.name !== 'description'}
                  className='p-2'
                  type={input.type}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              </div>
            ))
          }
        </div>
        <div className='flex flex-col gap-3 items-center mt-5 justify-center'>
          <label className='dark:text-white text-black bg-gray-300 dark:bg-gray-500 hover:bg-neutral-400 transition-colors dark:hover:bg-neutral-600 px-3 py-2 rounded'>
            Agregar imagen
            <input hidden type='file' multiple onChange={handleImage} accept='image/*' />
          </label>

          <section className='grid grid-rows-1 mt-1 pb-1.5 gap-2 md:grid-rows-2 max-w-[40%] grid-flow-col overflow-x-auto'>
            {images.length > 0 && (
              images.map((image, index) => {
                return (
                  <div key={index} className='relative w-32 h-32'>
                    <Image
                      src={typeof image === 'string' ? image : image.url}
                      alt='car image'
                      width={100}
                      height={100}
                      className='rounded-md object-cover block w-full h-full'
                    />
                    <div onClick={() => handleDeleteImage(image)} className='cursor-pointer absolute top-1 right-1 bg-red-500 hover:bg-red-700 transition-colors text-white rounded-full p-1'>
                      <AiFillDelete size={20} />
                    </div>
                  </div>
                )
              })
            )}
          </section>

        </div>
        <div className='flex gap-2 max-w-full items-center justify-center'>
          <Button loading={loading} disabled={loading} type='submit' className='mt-7 bg-[#90CDF4] hover:bg-sky-600/90 text-black w-40 disabled:bg-opacity-70 disabled:cursor-not-allowed'>
            {children}
          </Button>
          <Button onClick={handleClose} className='mt-7 w-40 bg-gray-600 tex hover:bg-neutral-500'>Cerrar</Button>
        </div>
      </form>
    </>
  )
}
