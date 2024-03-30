import { StyleSheet } from '@react-pdf/renderer'

export const tableStyles = StyleSheet.create({
  table: {
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row'
  },
  tableCell: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 10
  },
  page: {
    padding: 10
  },
  grayCell: {
    backgroundColor: '#F2F2F2'
  },
  bodyTableCol: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  bodySubTitle: {
    fontSize: 9
  }
})
