'use client'

import Button from '@/components/Button'
import ModalBackdrop from '@/components/ModalBackdrop'
import Spinner from '@/components/Spinner'
import { transactionsTableHeaders } from '@/helpers/data'
import { getTransactions } from '@/services/api'
import { TransactionDTO } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function page(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([])
  const [transaction, setTransaction] = useState<TransactionDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const { data } = useSession()

  useEffect(() => {
    setLoading(true)
    getTransactions(data?.user.token)
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
                <td className='px-6 py-4'>
                  <div className='flex justify-center items-center relative group'>
                    <img
                      src={transaction.car.preview || transaction.car.images[0]}
                      alt={transaction.car.plate}
                      className='rounded-lg object-cover cursor-pointer w-auto h-auto ring-2 max-w-[100px] min-w-[100px] max-h-[100px] min-h-[100px] lg:max-w-[160px] lg:max-h-[160px] lg:min-w-[190px] lg:min-h-[160px]'
                    />
                  </div>
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
           <div className='w-[600px] h-[300px] flex flex-col justify-center items-cente'>
            <div className='w-full flex gap-3 border-b-blue-950 border-b-2 p-3'>
              <img src={transaction.car.images[0]} alt={transaction.car.plate} className='w-14 h-14 my-2 object-cover rounded-xl' />
              <div className='h-16 flex flex-col justify-center my-2'>
                <p className="text-md font-semibold">{transaction.car.line}</p>
                <p className="text-sm font-light">{transaction.car.brand}</p>
              </div>
            </div>
            <div className='w-full h-[60%] flex my-1 gap-2'>
              <div className='w-[50%] border-r-blue-950 border-r-2'>
                <h2 >Datos Comprador</h2>
                <div className='grid grid-cols-2 p-1 place-content-center place-items-center grid-rows-2 gap-1 h-[90%]'>
                  <p className='text-white text-xs font-light w-full h-full'><span className='font-semibold'>Cédula:</span> {transaction.buyer.cc}</p>
                  <p className='text-white text-xs font-light w-full h-full'><span className='font-semibold'>Nombre:</span> {transaction.buyer.name}</p>
                  <p className='text-white text-xs font-light w-full h-full'><span className='font-semibold'>Correo:</span> {transaction.buyer.email}</p>
                  <p className='text-white text-xs font-light w-full h-full'><span className='font-semibold'>Teléfono:</span> {transaction.buyer.phone}</p>
                </div>
              </div>
              <div className='w-[50%]'>
                <h2 >Datos compra</h2>
                <div className='grid grid-cols-2 p-1 place-content-center place-items-center grid-rows-2 gap-1 h-[90%]'>
                  <p className='text-white text-xs font-light w-full h-full'><span className=' font-semibold'>Precio:</span> $ {Math.round(Number(transaction.price)).toLocaleString()}</p>
                  <p className='text-white text-xs font-light w-full h-full'><span className=' font-semibold'>Fecha:</span> {transaction.date.split('T')[0]}</p>
                  <p className='text-white text-xs font-light w-full h-full'><span className=' font-semibold'>Auto:</span> {transaction.car.brand} {transaction.car.line} {transaction.car.model}</p>
                  <p className='text-white text-xs font-light w-full h-full'><span className=' font-semibold'>Placa:</span> {transaction.car.plate}</p>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-center items-center border-t-blue-950 border-t-2 p-3'>
              <Button onClick={() => setTransaction(null)}>Cerrar</Button>
            </div>
          </div>
          </>
        )}
      </ModalBackdrop>
    </>
  )
}
