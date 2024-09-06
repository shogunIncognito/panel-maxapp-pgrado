'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { UserIcon } from '@/libs/Icons'
import { createTransaction, getCar, getCars } from '@/services/api'
import { CarDTO } from '@/types'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { BiCalendar, BiCreditCard } from 'react-icons/bi'
import { FaCarAlt } from 'react-icons/fa'

export default function page(): JSX.Element {
  const id = useSearchParams().get('id')
  const { data } = useSession()
  const [car, setCar] = useState<CarDTO | null>(null)
  const [cars, setCars] = useState<CarDTO[]>([])
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
          setCar(res)
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
      setCar(car ?? null)

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

    console.log(valuesToSend);


    // createTransaction(data?.user.token, valuesToSend)
    //   .then(() => toast.success('Transacción creada'))
    //   .catch((error) => console.error(error))
  }

  return (
    <section className='p-2 min-h-full'>
      <div className="h-full min-h-full bg-gradient-to-br text-black flex md:items-center md:justify-center p-1 md:p-4 from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 items-center justify-center transition-colors duration-300">
        <div className="bg-white rounded-xl shadow-2xl p-8 max-w-full md:max-w-4xl w-full overflow-y-auto py-3 pb-5 max-h-[95%]">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Crear Transacción</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                  <UserIcon className="mr-2 w-8" /> Datos del Comprador
                </h2>
                <div className='flex flex-col'>
                  <label htmlFor="cedula">Cédula</label>
                  <Input required onChange={handleChange} name='cc' value={values.cc} id="cedula" placeholder="Ingrese la cédula" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="nombre">Nombre</label>
                  <Input required onChange={handleChange} name='name' value={values.name} id="nombre" placeholder="Ingrese el nombre completo" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="email">Email</label>
                  <Input required onChange={handleChange} name='email' value={values.email} id="email" type="email" placeholder="Ingrese el email" />
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="telefono">Número de Teléfono</label>
                  <Input required onChange={handleChange} name='phone' value={values.phone} id="telefono" placeholder="Ingrese el número de teléfono" />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                  <FaCarAlt className="mr-2 w-8" /> Datos de Compra
                </h2>
                <div className='flex flex-col'>
                  <label htmlFor="precio">Precio</label>
                  <div className="relative">
                    <BiCreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input required onChange={handleChange} name='price' value={values.price || ''} id="precio" placeholder="Ingrese el precio" className="pl-10" />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="fecha">Fecha</label>
                  <div className="relative">
                    <BiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input required onChange={handleChange} name='date' value={values.date} id="fecha" type="date" className="pl-10" />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="auto">Auto a Vender</label>
                  <Select required onChange={handleChange} name='car' value={values.car}>
                    <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value="">Seleccione un auto</option>
                    {cars.map((car) => (
                      <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' key={car._id} value={car._id}>{car.brand} {car.line} {car.model}</option>
                    ))}
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Input id='sold' name='sold' onChange={handleChange} type='checkbox' />
                  <label htmlFor="sold">Marcar como vendido</label>
                </div>
              </div>
            </div>
            <Button className="w-full">Crear Transacción</Button>
          </form>
        </div>
      </div>
    </section>
  )
}
