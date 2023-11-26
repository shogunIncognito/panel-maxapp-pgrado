import axios from 'axios'
import { DEVELOPMENT_API_URL, PRODUCTION_API_URL } from '@/utils/envconfig'
import { getToken } from '@/utils/token'
import { BrandType, CarDTO, CreateCarDTO, CreateUserDTO, TypeUserUpdate, UpdateCarDTO, UpdateUserDTO, UserDTO } from '@/types'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : DEVELOPMENT_API_URL
})

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const auth = (): { headers: { authorization: string } } => ({ headers: { authorization: `Bearer ${getToken()}` } })

export const login = async (values: { username: string, password: string }): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', values)
  // setToken('auth-token', response.data.token, {
  //   maxAge: 60 * 60 * 24 * 7
  // })
  return response.data
}

export const getCars = async (): Promise<CarDTO[]> => {
  const response = await api.get('/cars')
  return response.data
}

export const createCar = async (values: CreateCarDTO): Promise<CarDTO> => {
  const response = await api.post('/cars', values, auth())
  return response.data
}

export const updateCar = async (id: number, values: UpdateCarDTO): Promise<CarDTO> => {
  const response = await api.put(`/cars/${id}`, values, auth())
  return response.data
}

export const deleteCar = async (id: number | CarDTO[]): Promise<CarDTO> => {
  const ids = typeof id === 'object' ? id.map(car => `ids=${car._id}`).join('&') : `ids=${id}`
  const response = await api.delete(`/cars?${ids}`, auth())
  return response.data
}

export const getUsers = async (): Promise<UserDTO[]> => {
  const response = await api.get('/admins', auth())
  return response.data
}

export const createUser = async (values: CreateUserDTO): Promise<UserDTO> => {
  const response = await api.post('/admins', values, auth())
  return response.data
}

export const deleteUser = async (id: number): Promise<UserDTO> => {
  const response = await api.delete(`/admins/${id}`, auth())
  return response.data
}

export const updateUser = async (id: number, values: UpdateUserDTO, type: TypeUserUpdate): Promise<UserDTO> => {
  const response = await api.put(`/admins/${id}?type=${type}`, values, auth())
  return response.data
}

export const getBrands = async (): Promise<BrandType[]> => {
  const response = await api.get('/cars/brands', auth())
  return response.data
}

export const createBrand = async (brand: string): Promise<BrandType> => {
  const response = await api.post('/brands', { name: brand }, auth())
  return response.data
}

export const deleteBrand = async (id: string): Promise<BrandType> => {
  const response = await api.delete(`/brands/${id}`, auth())
  return response.data
}

export const updatePreviewImage = async (id: string, preview: string): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}`, { preview }, auth())
  return response.data
}

export const deleteCarImageFromApi = async (id: string, image: string): Promise<CarDTO> => {
  const response = await api.put(`/cars/${id}/images`, { image }, auth())
  return response.data
}
