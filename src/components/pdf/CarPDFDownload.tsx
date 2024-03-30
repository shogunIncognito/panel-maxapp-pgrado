import { PDFDownloadLink } from '@react-pdf/renderer'
import Button from '../Button'
import CarsPDF from './CarPDF'
import { CarDTO } from '@/types'

export default function CarPDFDownload ({ cars }: { cars: CarDTO[] }): JSX.Element {
  return (
    <PDFDownloadLink className='lg:ml-auto' document={<CarsPDF cars={cars} />} fileName='inventario.pdf'>
      <Button className='m-2 p-1.5 whitespace-nowrap'>
        Descargar PDF
      </Button>
    </PDFDownloadLink>
  )
}
