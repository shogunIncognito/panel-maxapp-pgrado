import { Document, Page, Text, View } from '@react-pdf/renderer'
import { tableStyles } from './styles'
import { CarDTO } from '@/types'

export default function CarsPDF({ cars }: { cars: CarDTO[] }): JSX.Element {
  return (
    <Document>
      <Page size='A3' style={tableStyles.page}>

        <View style={[tableStyles.table]}>

          <View style={tableStyles.tableRow}>
            <View style={[tableStyles.bodyTableCol, { width: '100%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>INVENTARIO MAX-AUTOS "USADOS QUE DAN CONFIANZA"</Text>
            </View>
          </View>

          <View style={tableStyles.tableRow}>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '8%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>PLACA</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '8%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>MARCA</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '9%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>MODELO</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '6%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>CAJA</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '16%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>LINEA</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '8%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>KM</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '10%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>CC</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '9%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>COLOR</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '13%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>PRECIO</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '6%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>DUEÑOS</Text>
            </View>
            <View style={[tableStyles.bodyTableCol, tableStyles.grayCell, { width: '7%' }]}>
              <Text style={[tableStyles.tableCell, tableStyles.bodySubTitle]}>VENDIDO</Text>
            </View>
          </View>

          {cars.map(car => (
            <View key={car._id} style={tableStyles.tableRow}>
              <View style={tableStyles.tableRow}>
                <View style={[tableStyles.bodyTableCol, { width: '8%' }]}>
                  <Text style={tableStyles.tableCell}>{car.plate}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '8%' }]}>
                  <Text style={tableStyles.tableCell}>{car.brand}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '9%' }]}>
                  <Text style={tableStyles.tableCell}>{car.model}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '6%' }]}>
                  <Text style={tableStyles.tableCell}>{car.transmission === 'automatica' ? 'A/T' : 'M/T'}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '16%' }]}>
                  <Text style={tableStyles.tableCell}>{car.line}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '8%' }]}>
                  <Text style={tableStyles.tableCell}>{Math.round(Number(car.kilometers)).toLocaleString()}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '10%' }]}>
                  <Text style={tableStyles.tableCell}>{car.cc.toFixed(1)}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '9%' }]}>
                  <Text style={tableStyles.tableCell}>{car.color}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '13%' }]}>
                  <Text style={tableStyles.tableCell}>$ {Math.round(Number(car.price)).toLocaleString()}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '6%' }]}>
                  <Text style={tableStyles.tableCell}>{car.owners}</Text>
                </View>
                <View style={[tableStyles.bodyTableCol, { width: '7%' }]}>
                  <Text style={tableStyles.tableCell}>{car.sold ? 'SI' : 'NO'}</Text>
                </View>
              </View>
            </View>
          ))}

        </View>
      </Page>
    </Document>
  )
}
