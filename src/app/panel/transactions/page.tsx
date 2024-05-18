'use client'

import Button from '@/components/Button'
import ModalBackdrop from '@/components/ModalBackdrop'
import Spinner from '@/components/Spinner'
import { transactionsTableHeaders } from '@/helpers/data'
import { getTransactions } from '@/services/api'
import { TransactionDTO } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function page (): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([])
  const [loading, setLoading] = useState(false)
  const [transaction, setTransaction] = useState<TransactionDTO | null>(null)

  useEffect(() => {
    setLoading(true)
    getTransactions()
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <>
      <div className='m-4'>
        <Link href='/panel/transactions/create'>
          <Button>Crear transacción</Button>
        </Link>
      </div>

      <div className='relative flex-1 w-full h-full max-h-max overflow-auto'>
        <table className='w-full text-sm text-center text-gray-400'>
          <thead className='text-xs sticky dark:bg-[#171923] bg-slate-300 z-10 top-0 uppercase border-b border-green-800/90 text-gray-800 dark:text-gray-400'>
            <tr>

              {transactionsTableHeaders.map((header, index) => (
                <th key={index} scope='col' className='px-6 py-3 cursor-pointer dark:hover:text-white hover:text-blue-500 transition-colors'>
                  {header.label}
                </th>
              ))}

            </tr>
          </thead>
          <tbody>

            {transactions.length === 0 && !loading && (
              <tr className='border-b border-green-800/90'>
                <td colSpan={11} className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                  No hay transacciones
                </td>
              </tr>
            )}

            {transactions.map((transaction) => (
              <tr key={transaction._id} className='bg-transparent border-b border-green-800/90 text-neutral-600 dark:text-white'>
                <td className='capitalize px-6 py-4'>
                  {transaction._id}
                </td>
                <td className='capitalize px-6 py-4'>
                  {transaction.date.split('T')[0]}
                </td>
                <td className='capitalize px-6 py-4'>
                  {transaction.buyer.name}
                </td>
                <td className='capitalize px-6 py-4'>
                  {transaction.car.line}
                </td>
                <td className='capitalize px-6 py-4'>
                  {transaction.car.plate}
                </td>
                <td className='capitalize px-6 py-4'>
                  $ {Math.round(Number(transaction.price)).toLocaleString()}
                </td>
                <td className='capitalize px-6 py-4'>
                  <Button onClick={() => setTransaction(transaction)}>Ver detalles</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <ModalBackdrop open={transaction !== null}>
        {transaction !== null && (
          <>
            <div className='p-4 m-2 rounded shadow-lg border'>
              <h3 className='text-xl font-bold'>Datos comprador</h3>
              <div className='flex gap-3 flex-wrap m-2 justify-center mt-3'>
                <p className='text-white'>Cédula: {transaction.buyer.cc}</p>
                <p className='text-white'>Nombre: {transaction.buyer.name}</p>
                <p className='text-white'>Correo: {transaction.buyer.email}</p>
                <p className='text-white'>Teléfono: {transaction.buyer.phone}</p>
              </div>

              <h3 className='text-xl font-bold'>Datos compra</h3>
              <div className='flex gap-3 flex-wrap m-2 justify-center mt-3'>
                <p className='text-white'>Precio: $ {Math.round(Number(transaction.price)).toLocaleString()}</p>
                <p className='text-white'>Fecha: {transaction.date.split('T')[0]}</p>
                <p className='text-white'>Auto: {transaction.car.brand} {transaction.car.line} {transaction.car.model}</p>
                <p className='text-white'>Placa: {transaction.car.plate}</p>
              </div>
            </div>

            <img src={transaction.car.images[0]} alt={transaction.car.plate} className='w-36 h-36 my-2 object-cover mx-auto' />

            <Button onClick={() => setTransaction(null)}>Cerrar</Button>
          </>
        )}
      </ModalBackdrop>
    </>
  )
}
