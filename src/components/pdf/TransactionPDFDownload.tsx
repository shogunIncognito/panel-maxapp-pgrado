import { PDFDownloadLink } from '@react-pdf/renderer'
import CarsPDF from './CarPDF'
import { CarDTO, TransactionDTO } from '@/types'
import Button from '../Button'
import { getAllCars, getTransactions } from '@/services/api'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import TransactionReport from './TransactionsPDF'

export default function TransactionPDFDownload() {
    const { data } = useSession()
    const [transactions, setTransactions] = useState<TransactionDTO[]>([])

    useEffect(() => {
        getTransactions(data?.user.token)
            .then((res) => setTransactions(res))
            .catch((error) => console.error(error))
    }, [])

    if (transactions.length === 0) return null

    return (
        <PDFDownloadLink className='lg:ml-auto' document={<TransactionReport transactions={transactions} />} fileName='registroventas.pdf'>
            <Button className='m-2 p-1.5 whitespace-nowrap'>
                Descargar PDF
            </Button>
        </PDFDownloadLink>
    )
}
