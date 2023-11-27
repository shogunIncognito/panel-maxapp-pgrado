import { UpdateCarDTO } from '@/types'

export const objectHasEmptyValues = (obj: { [key: string]: any }): boolean => {
  for (const key in obj) {
    if (typeof obj[key] === 'string' && !obj[key].trim()) return true
    if (!(obj[key])) return true
  }
  return false
}

export const filterCars = (cars, filters) => (
  cars.filter(car => {
    return String(car[filters.option]).toLocaleLowerCase().includes(filters.value.toLowerCase())
  })
)

export const getObjectsDiff = (car, carToUpdate): UpdateCarDTO => {
  const diff: { [key: string]: any } = {}

  for (const key in car) {
    if (carToUpdate[key] !== car[key]) {
      diff[key] = carToUpdate[key]
    }
  }

  return diff
}

export const validateFormValues = (values: any): { valid: boolean, message: string } => {
  const currentYear = new Date().getFullYear()

  if (values.owners < 0) return { valid: false, message: 'El vehiculo tiene que tener minimo 1 dueño' }
  if (values.kilometers < 0) return { valid: false, message: 'Los kilometros no pueden ser negativos' }
  if (values.price < 0) return { valid: false, message: 'El precio no puede ser negativo' }
  if (values.model < 2000 || values.model > currentYear) return { valid: false, message: `El año tiene que estar entre 2000 y ${currentYear}` }

  return { valid: true, message: '' }
}
