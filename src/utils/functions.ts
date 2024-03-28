import { CarDTO } from '@/types'

interface UnknownObject {
  [key: string]: any
}

export const objectHasEmptyValues = (obj: UnknownObject): boolean => {
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

export const getObjectsDiff = (obj: UnknownObject, objTwo: UnknownObject): UnknownObject => {
  const diff: UnknownObject = {}

  for (const key in obj) {
    if (objTwo[key] !== obj[key]) {
      diff[key] = objTwo[key]
    }
  }

  return diff
}

export const validateFormValues = (values: UnknownObject): { valid: boolean, message: string } => {
  const currentYear = new Date().getFullYear()

  if (values.owners < 0) return { valid: false, message: 'El vehículo tiene que tener mínimo 1 dueño' }
  if (values.kilometers < 0) return { valid: false, message: 'Los kilómetros no pueden ser negativos' }
  if (values.price < 0) return { valid: false, message: 'El precio no puede ser negativo' }
  if (values.model < 2000 || values.model > currentYear) return { valid: false, message: `El modelo tiene que estar entre 2000 y ${currentYear}` }
  if (values.plate.length !== 6) return { valid: false, message: 'La placa tiene que tener 6 caracteres' }

  return { valid: true, message: '' }
}
