import { PDFDownloadLink } from '@react-pdf/renderer'
import CarsPDF from './CarPDF'
import { CarDTO } from '@/types'
import Button from '../Button'
import { getAllCars } from '@/services/api'
import { useEffect, useState } from 'react'

export default function CarPDFDownload () {
  const [cars, setCars] = useState<CarDTO[]>([])

  useEffect(() => {
    getAllCars()
      .then((res) => setCars(res))
      .catch((error) => console.error(error))
  }, [])

  if (cars.length === 0) return null
  
  return (
    <PDFDownloadLink className='lg:ml-auto' document={<CarsPDF cars={cars} />} fileName='inventario.pdf'>
      <Button className='m-2 p-1.5 whitespace-nowrap'>
        Descargar PDF
      </Button>
    </PDFDownloadLink>
  )
}
