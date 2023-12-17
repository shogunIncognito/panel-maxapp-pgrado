import axios from 'axios'
import { DEVELOPMENT_API_URL, PRODUCTION_API_URL } from '@/utils/envconfig'
import { getToken } from '@/utils/token'
import { BrandType, CarDTO, CreateCarDTO, CreateUserDTO, UpdateCarDTO, UpdateUserDTO, UserDTO } from '@/types'
import { TypeUserUpdate } from '@/enums'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : DEVELOPMENT_API_URL
})

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const auth = (): { headers: { authorization: string } } => ({ headers: { authorization: `Bearer ${getToken()}` } })

export const login = async (user: { username: string, password: string }): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', user)
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

export const updateCar = async (id: string, values: UpdateCarDTO): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}`, values, auth())
  return response.data
}

export const deleteCar = async (id: string | CarDTO[]): Promise<CarDTO> => {
  const ids = typeof id === 'object' ? id.map(car => `ids=${car._id}`).join('&') : `ids=${id}`
  const response = await api.delete(`/cars?${ids}`, auth())
  return response.data
}

export const getUsers = async (): Promise<UserDTO[]> => {
  const response = await api.get('/users', auth())
  return response.data
}

export const createUser = async (values: CreateUserDTO): Promise<UserDTO> => {
  const response = await api.post('/users', values, auth())
  return response.data
}

export const deleteUser = async (id: string): Promise<UserDTO> => {
  const response = await api.delete(`/users/${id}`, auth())
  return response.data
}

export const updateUser = async (id: string, values: UpdateUserDTO, type: TypeUserUpdate): Promise<UserDTO> => {
  const response = await api.patch(`/users/${id}?type=${String(type)}`, values, auth())
  return response.data
}
export const updateUserImage = async (id: string, image: string): Promise<UserDTO> => {
  const response = await api.patch(`/users/${id}/image`, { image }, auth())
  return response.data
}

export const getUserInfo = async (): Promise<UserDTO> => {
  const response = await api.get('/users/info', auth())
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
  const response = await api.patch(`/cars/${id}/images`, { image }, auth())
  return response.data
}
