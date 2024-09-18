'use client'

import Button from '@/components/Button'
import ModalBackdrop from '@/components/ModalBackdrop'
import Spinner from '@/components/Spinner'
import { transactionsTableHeaders } from '@/helpers/data'
import { getTransactions, deleteTransaction as deleteTransactionAPI } from '@/services/api'
import { TransactionDTO } from '@/types'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaCalendarAlt, FaCar, FaCreditCard, FaDollarSign, FaEnvelope, FaHashtag, FaPhone, FaTag, FaUser } from 'react-icons/fa'

export default function page(): JSX.Element {
  const [transactions, setTransactions] = useState<TransactionDTO[]>([])
  const [transaction, setTransaction] = useState<TransactionDTO | null>(null)
  const [transactionToDel, setTransactionToDel] = useState<TransactionDTO | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const { data } = useSession()

  useEffect(() => {
    setLoading(true)
    getTransactions(data?.user.token)
      .then((data) => setTransactions(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Spinner />

  const deleteTransaction = async (): Promise<void> => {
    if (transactionToDel === null) return
    setLoadingDelete(true)
    deleteTransactionAPI(transactionToDel._id, data?.user.token)
      .then(() => {
        toast.success('Transacción eliminada')
        setTransactions(transactions.filter((transaction) => transaction._id !== transactionToDel._id))
        setTransactionToDel(null)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Error al eliminar transacción')
      })
      .finally(() => setLoadingDelete(false))
  }

  return (
    <>
      <div className='m-4'>
        <Link href='/panel/transactions/create'>
          <Button>Crear transacción</Button>
        </Link>
      </div>

      <div className='relative flex-1 w-full h-full max-h-max overflow-auto'>
        <table className='w-full text-sm text-center text-gray-400 h-full'>
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
                      className='rounded-lg object-cover w-auto h-auto ring-2 max-w-[100px] min-w-[100px] max-h-[100px] min-h-[100px] lg:max-w-[160px] lg:max-h-[160px] lg:min-w-[190px] lg:min-h-[160px]'
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
                <td className='uppercase px-6 py-4'>
                  {transaction.car.plate}
                </td>
                <td className='capitalize px-6 py-4'>
                  $ {Math.round(Number(transaction.price)).toLocaleString()}
                </td>
                <td className='px-6 py-4 h-full flex flex-col w-full gap-1 justify-center items-center'>
                  <Button className='w-full' onClick={() => setTransaction(transaction)}>Ver detalles</Button>
                  <Button className='w-full bg-[#FBD38D] hover:bg-yellow-500 font-semibold text-black/70 py-2 px-4' onClick={() => setTransactionToDel(transaction)}>Eliminar</Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <ModalBackdrop open={transaction !== null}>
        {transaction !== null && (
          <div className="flex flex-col">
            <div className="bg-gray-100 dark:bg-gray-800 p-6 flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <img src={transaction.car.preview || transaction.car.images[0]} alt={transaction.car.plate} className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{transaction.car.brand} {transaction.car.line}</h2>
                <p className="text-gray-600 dark:text-gray-400">Año: {transaction.car.model}</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400 flex items-center">
                    <FaUser className="w-5 h-5 mr-2" />
                    Datos Comprador
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <FaHashtag className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Cédula:</span>
                      {transaction.buyer.cc}
                    </p>
                    <p className="flex items-center">
                      <FaUser className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Nombre:</span>
                      {transaction.buyer.name}
                    </p>
                    <p className="flex items-center">
                      <FaEnvelope className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Correo:</span>
                      {transaction.buyer.email}
                    </p>
                    <p className="flex items-center">
                      <FaPhone className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Teléfono:</span>
                      {transaction.buyer.phone}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400 flex items-center">
                    <FaCreditCard className="w-5 h-5 mr-2" />
                    Datos compra
                  </h3>
                  <div className="space-y-2">
                    <p className="flex items-center">
                      <FaDollarSign className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Precio:</span>
                      ${transaction.price.toLocaleString()}
                    </p>
                    <p className="flex items-center">
                      <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Fecha:</span>
                      {new Date(transaction.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center">
                      <FaCar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Auto:</span>
                      {transaction.car.brand} {transaction.car.line} {transaction.car.model}
                    </p>
                    <p className="flex items-center">
                      <FaTag className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 mr-2">Placa:</span>
                      <span className='uppercase'>{transaction.car.plate}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-center">
              <Button onClick={() => setTransaction(null)}>Cerrar</Button>
            </div>
          </div>
        )}
      </ModalBackdrop>

      <ModalBackdrop open={transactionToDel !== null}>
        {transactionToDel !== null && (
          <div className="flex flex-col">
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-center">¿Estás seguro de eliminar esta transacción?</h2>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-center gap-2">
              <Button loading={loadingDelete} className='w-1/3 p-2 px-3 bg-[#D6BCFA] hover:bg-purple-400 text-black font-semibold' onClick={deleteTransaction}>Eliminar</Button>
              <Button className='w-1/3' onClick={() => setTransactionToDel(null)}>Cancelar</Button>
            </div>
          </div>
        )}
      </ModalBackdrop>
    </>
  )
}
