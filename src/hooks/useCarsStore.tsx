import { getBrands, getCars } from '@/services/api'
import { CarDTO } from '@/types'
import { create } from 'zustand'

interface CarsState {
  cars: CarDTO[]
  brands: Array<{
    _id: string
    name: string
  }>
  loading: boolean
  addCar: (car: CarDTO) => void
  deleteCar: (id: string) => void
  reFetch: (token: string | undefined) => void
}

const useCarsStore = create<CarsState>((set) => ({
  cars: [],
  brands: [],
  loading: true,
  addCar: (car) => set((state) => ({ cars: [car, ...state.cars] })),
  deleteCar: (id) => set((state) => ({ cars: state.cars.filter((car) => car._id !== id) })),
  reFetch: (token) => {
    Promise.all([getCars(), getBrands(token)])
      .then(([cars, brands]) => set({ cars, brands }))
      .catch((err) => console.log(err))
      .finally(() => set({ loading: false }))
  }
}))

export default useCarsStore
