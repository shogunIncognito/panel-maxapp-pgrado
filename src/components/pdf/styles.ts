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

export const transactionStyles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#4A90E2',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'semibold',
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  transactionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    paddingBottom: 10,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  section: {
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  label: {
    fontSize: 10,
    color: '#666666',
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'right',
  },
});
