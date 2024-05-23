'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Select from '@/components/Select'
import { createTransaction, getCar, getCars } from '@/services/api'
import { CarDTO } from '@/types'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function page (): JSX.Element {
  const id = useSearchParams().get('id')
  const [car, setCar] = useState<CarDTO | null>(null)
  const [cars, setCars] = useState<CarDTO[]>([])
  const [values, setValues] = useState({
    cc: '',
    name: '',
    email: '',
    phone: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
    car: ''
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

    getCars()
      .then((res) => setCars(res))
      .catch((error) => console.error(error))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target

    if (name === 'car') {
      const car = cars.find(car => car._id.toString() === value)
      setCar(car ?? null)

      setValues((prev) => ({
        ...prev,
        price: car?.price ?? '',
        car: value
      }))
      return
    }

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
      price: values.price,
      date: values.date
    }

    createTransaction(valuesToSend)
      .then(() => toast.success('Transacción creada'))
      .catch((error) => console.error(error))
  }

  return (
    <section className='p-2'>
      <h1 className='text-xl mb-4'>Crear transacción</h1>
      <form className='md:mx-14 lg:mx-32' onSubmit={handleSubmit}>
        <div className='flex gap-2 flex-col md:flex-row'>
          <div className='mt-5 bg-blue-950 p-4 flex-1 rounded shadow-lg border'>
            <h3 className='text-xl font-bold'>Datos comprador</h3>
            <div className='flex gap-3 flex-wrap m-2 justify-center mt-3'>
              <Input required onChange={handleChange} name='cc' value={values.cc} type='text' placeholder='Cédula' />
              <Input required onChange={handleChange} name='name' value={values.name} type='text' placeholder='Nombre' />
              <Input required onChange={handleChange} name='email' value={values.email} type='email' placeholder='Correo' />
              <Input required onChange={handleChange} name='phone' value={values.phone} type='number' placeholder='Teléfono' />
            </div>
          </div>

          <div className='mt-5 bg-blue-950 p-4 flex-1 rounded shadow-lg border'>
            <h3 className='text-xl font-bold'>Datos compra</h3>
            <div className='flex gap-3 flex-wrap m-2 justify-center mt-3'>
              <Input required onChange={handleChange} name='price' value={values.price} type='text' placeholder='Precio' />
              <Input required onChange={handleChange} name='date' value={values.date} type='date' placeholder='Fecha' />
              <Select required onChange={handleChange} name='car' value={values.car}>
                <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value=''>Seleccione un auto</option>
                {cars.map((car) => (
                  <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' key={car._id} value={car._id}>{car.brand} {car.line} {car.model}</option>
                ))}
              </Select>
            </div>
            {(car !== null) && <img src={car.images[0]} alt={car.plate} className='w-28 h-28 object-cover mx-auto' />}
          </div>
        </div>

        <Button className='mt-4 flex justify-center items-center'>Crear transacción</Button>
      </form>
    </section>
  )
}
