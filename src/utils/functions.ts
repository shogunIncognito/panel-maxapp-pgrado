import { CarDTO } from '@/types'

interface UnknowObject {
  [key: string]: any
}

export const objectHasEmptyValues = (obj: UnknowObject): boolean => {
  for (const key in obj) {
    if (typeof obj[key] === 'string' && obj[key].trim() === '') return true
    if (obj[key] === undefined) return true
  }
  return false
}

export const filterCars = (cars: CarDTO[], filters: { value: string, option: string }): CarDTO[] => (
  cars.filter(car => {
    return String(car[filters.option as keyof CarDTO]).toLocaleLowerCase().includes(filters.value.toLowerCase())
  })
)

export const getObjectsDiff = (obj: UnknowObject, objTwo: UnknowObject): UnknowObject => {
  const diff: UnknowObject = {}

  for (const key in obj) {
    if (objTwo[key] !== obj[key]) {
      diff[key] = objTwo[key]
    }
  }

  return diff
}

export const validateFormValues = (values: UnknowObject): { valid: boolean, message: string } => {
  const currentYear = new Date().getFullYear()

  if (values.owners < 0) return { valid: false, message: 'El vehiculo tiene que tener minimo 1 dueño' }
  if (values.kilometers < 0) return { valid: false, message: 'Los kilometros no pueden ser negativos' }
  if (values.price < 0) return { valid: false, message: 'El precio no puede ser negativo' }
  if (values.model < 2000 || values.model > currentYear) return { valid: false, message: `El modelo tiene que estar entre 2000 y ${currentYear}` }
  if (values.plate.length !== 6) return { valid: false, message: 'La placa tiene que tener 6 caracteres' }

  return { valid: true, message: '' }
}

export const getMonthDaysArray = (): number[] => {
  const date = new Date()
  const month = date.getMonth()
  const year = date.getFullYear()
  const days = new Date(year, month + 1, 0).getDate()
  return Array.from({ length: days }, (_, i) => i + 1)
}
