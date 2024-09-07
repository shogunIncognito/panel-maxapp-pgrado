'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { UserIcon } from '@/libs/Icons'
import { createTransaction, getCar, getCars } from '@/services/api'
import { CarDTO } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiCalendar, BiCreditCard } from 'react-icons/bi'
import { BsArrowLeft } from 'react-icons/bs'
import { FaCarAlt } from 'react-icons/fa'

export default function page(): JSX.Element {
  const id = useSearchParams().get('id')
  const { data } = useSession()
  const router = useRouter()
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    cc: '',
    name: '',
    email: '',
    phone: '',
    price: NaN,
    date: new Date().toISOString().split('T')[0],
    car: '',
    sold: false
  })

  useEffect(() => {
    if (id !== null) {
      getCar(id)
        .then((res) => {
          setValues(prev => ({
            ...prev,
            price: res.price,
            car: res._id
          }))
        })
        .catch((error) => console.error(error))
    }

    getCars(1)
      .then((res) => setCars(res.result))
      .catch((error) => console.error(error))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target

    if (name === 'car') {
      const car = cars.find(car => car._id.toString() === value)

      setValues((prev) => ({
        ...prev,
        price: car?.price ?? NaN,
        car: value
      }))
      return
    }

    if (name === 'sold') return setValues((prev) => ({ ...prev, sold: !prev.sold }))

    setValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const valuesToSend = {
      buyer: {
        cc: Number(values.cc),
        name: values.name,
        email: values.email,
        phone: Number(values.phone)
      },
      car: values.car,
      price: Number(values.price),
      date: values.date,
      sold: values.sold
    }

    setLoading(true)
    createTransaction(data?.user.token, valuesToSend)
      .then(() => toast.success('Transacción creada'))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }

  return (
    <section className='p-2 flex-1'>
      <div className="h-full min-h-full bg-gradient-to-br text-black flex md:items-center md:justify-center p-1 md:p-4 from-gray-100 to-gray-300 dark:from-transparent transition-colors duration-300">
        <div className="bg-white rounded-xl shadow-2xl p-3 md:p-8 max-w-full md:max-w-4xl w-full overflow-y-auto py-3 pb-5 max-h-[95%] dark:bg-gray-800 transition-colors duration-300">
        <div className="flex items-center space-x-4 my-6">
              <Button onClick={() => router.back()} className='rounded-full px-2 py-2 bg-transparent ring ring-black/10 dark:ring-white/20 dark:hover:bg-black hover:bg-gray-200' aria-label="Volver a la lista de transacciones">
                <BsArrowLeft className="h-5 w-5 text-black dark:text-white" />
              </Button>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Crear Transacción</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <UserIcon className="mr-2 w-6 invert-0 dark:invert" /> Datos del Comprador
                </h2>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="cedula">Cédula</label>
                  <Input required onChange={handleChange} name='cc' value={values.cc} id="cedula" placeholder="Ingrese la cédula" />
                </div>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="nombre">Nombre</label>
                  <Input required onChange={handleChange} name='name' value={values.name} id="nombre" placeholder="Ingrese el nombre completo" />
                </div>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="email">Email</label>
                  <Input required onChange={handleChange} name='email' value={values.email} id="email" type="email" placeholder="Ingrese el email" />
                </div>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="telefono">Número de Teléfono</label>
                  <Input required onChange={handleChange} name='phone' value={values.phone} id="telefono" placeholder="Ingrese el número de teléfono" />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                  <FaCarAlt className="mr-2 w-8" /> Datos de Compra
                </h2>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="auto">Auto a Vender</label>
                  <Select required onChange={handleChange} name='car' value={values.car}>
                    <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value="">Seleccione un auto</option>
                    {cars.map((car) => (
                      <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' key={car._id} value={car._id}>{car.brand} {car.line} {car.model}</option>
                    ))}
                  </Select>
                </div>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="precio">Precio</label>
                  <div className="relative">
                    <BiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input required onChange={handleChange} name='price' value={values.price || ''} id="precio" placeholder="Ingrese el precio" className="pl-10" />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="fecha">Fecha</label>
                  <div className="relative">
                    <BiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input required onChange={handleChange} name='date' value={values.date} id="fecha" type="date" className="pl-10" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id='sold' name='sold' onChange={handleChange} type='checkbox' />
                  <label className='text-gray-700 dark:text-gray-300' htmlFor="sold">Marcar como vendido</label>
                </div>
              </div>
            </div>
            <Button loading={loading} className="w-full">Crear Transacción</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
