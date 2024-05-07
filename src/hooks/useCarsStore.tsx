import { getBrands, getCars } from '@/services/api'
import { CarDTO } from '@/types'
import { create } from 'zustand'

interface CarsState {
  cars: CarDTO[]
  originalCars: CarDTO[]
  brands: Array<{
    _id: string
    name: string
  }>
  loading: boolean
  addCar: (car: CarDTO) => void
  deleteCar: (id: string) => void
  fetchCars: (page: number, filter?: string | {
    value: string
    option: string
  }) => void
  reFetch: (token: string | undefined) => void
  sortCars: (header: string) => void
}

const useCarsStore = create<CarsState>((set) => ({
  cars: [],
  originalCars: [],
  brands: [],
  loading: true,
  addCar: (car) => set((state) => ({ cars: [car, ...state.cars] })),
  deleteCar: (id) => set((state) => ({ cars: state.cars.filter((car) => car._id !== id) })),
  fetchCars: (page, filter) => {
    getCars(page, filter)
      .then((cars) => set({ cars: cars.result }))
      .catch((err) => console.log(err))
      .finally(() => set({ loading: false }))
  },
  reFetch: (token) => {
    Promise.all([getCars(1), getBrands(token)])
      .then(([cars, brands]) => set({ cars: cars.result, brands }))
      .catch((err) => console.log(err))
      .finally(() => set({ loading: false }))
  },
  sortCars: (header) => {
    set((state) => ({
      cars: [...state.cars].sort((a, b) => String(b[header as keyof CarDTO]).localeCompare(String(a[header as keyof CarDTO]), 'es', { numeric: true })),
      originalCars: state.cars
    }))
  }
}))

export default useCarsStore
