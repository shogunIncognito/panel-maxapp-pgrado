import { getBrands, getCars } from '@/services/api'
import { CarDTO } from '@/types'
import { create } from 'zustand'

interface CarsState {
  cars: CarDTO[]
  originalCars: CarDTO[]
  pagination: {
    currentPage: number
    totalPages: number
  }
  brands: Array<{
    _id: string
    name: string
  }>
  loading: boolean
  showSold: boolean
  addCar: (car: CarDTO) => void
  deleteCar: (id: string) => void
  fetchCars: (page: number, filter?: string | {
    value: string
    option: string
  }) => void
  fetchBrands: (token: string | undefined) => void
  reFetch: (token: string | undefined) => void
  sortCars: (header: string) => void
  setShowSold: (showSold: boolean) => void
}

const useCarsStore = create<CarsState>((set, get) => ({
  cars: [],
  originalCars: [],
  pagination: {
    currentPage: 1,
    totalPages: 0
  },
  brands: [],
  loading: true,
  showSold: false,
  addCar: (car) => set((state) => ({ cars: [car, ...state.cars] })),
  deleteCar: (id) => set((state) => ({ cars: state.cars.filter((car) => car._id !== id) })),
  fetchCars: (page, filter) => {
    getCars(page, filter, get().showSold)
      .then((cars) => set({ cars: cars.result, pagination: { currentPage: cars.currentPage, totalPages: cars.totalPages } }))
      .catch((err) => console.log(err))
      .finally(() => set({ loading: false }))
  },
  fetchBrands: (token) => {
    getBrands(token)
      .then((brands) => set({ brands }))
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
  },
  setShowSold: (showSold) => set({ showSold })
}))

export default useCarsStore
