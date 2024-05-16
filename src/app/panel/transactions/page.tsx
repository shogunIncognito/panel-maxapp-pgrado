'use client'

import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import { transactionsTableHeaders } from '@/helpers/data'
import { getTransactions } from '@/services/api'
import { TransactionDTO } from '@/types'
import { useEffect, useState } from 'react'

export default function page (): JSX.Element {
  const [transactions, setTransaction] = useState<TransactionDTO[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getTransactions()
      .then((data) => setTransaction(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  return (
    <>
      <div className='m-4'>
        <Button onClick={() => console.log('Crear transacción')}>Crear transacción</Button>
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
                  $ {Math.round(Number(transaction.price)).toLocaleString()}
                </td>
                <td className='capitalize px-6 py-4'>
                  <Button onClick={() => console.log('Ver detalles')}>Ver detalles</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </>
  )
}
