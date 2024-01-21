import axios from 'axios'
import { API_URL } from '@/utils/envconfig'
import { BrandType, CarDTO, CreateCarDTO, CreateUserDTO, UpdateCarDTO, UpdateUserDTO, UserDTO } from '@/types'
import { TypeUserUpdate } from '@/enums'

const api = axios.create({
  baseURL: API_URL
})

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const auth = (token: string | undefined): { headers: { authorization: string } } => ({ headers: { authorization: `Bearer ${token}` } })

export const login = async (user: { username: string, password: string }): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', user)
  return response.data
}

export const getCars = async (): Promise<CarDTO[]> => {
  const response = await api.get('/cars')
  return response.data
}

export const createCar = async (values: CreateCarDTO, token: string | undefined): Promise<CarDTO> => {
  const response = await api.post('/cars', values, auth(token))
  return response.data
}

export const updateCar = async (id: string, values: UpdateCarDTO, token: string | undefined): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}`, values, auth(token))
  return response.data
}

export const deleteCar = async (id: string | CarDTO[], token: string | undefined): Promise<CarDTO> => {
  const ids = typeof id === 'object' ? id.map(car => `ids=${car._id}`).join('&') : `ids=${id}`
  const response = await api.delete(`/cars?${ids}`, auth(token))
  return response.data
}

export const getUsers = async (token: string | undefined): Promise<UserDTO[]> => {
  const response = await api.get('/users', auth(token))
  return response.data
}

export const createUser = async (values: CreateUserDTO, token: string | undefined): Promise<UserDTO> => {
  const response = await api.post('/users', values, auth(token))
  return response.data
}

export const deleteUser = async (id: string, token: string | undefined): Promise<UserDTO> => {
  const response = await api.delete(`/users/${id}`, auth(token))
  return response.data
}

export const updateUser = async (id: string, values: UpdateUserDTO, type: TypeUserUpdate, token: string | undefined): Promise<UserDTO> => {
  const response = await api.patch(`/users/${id}?type=${String(type)}`, values, auth(token))
  return response.data
}
export const updateUserImage = async (id: string, image: string, token: string | undefined): Promise<UserDTO> => {
  const response = await api.patch(`/users/${id}/image`, { image }, auth(token))
  return response.data
}

export const getUserInfo = async (token: string | undefined): Promise<UserDTO> => {
  const response = await api.get('/users/info', auth(token))
  return response.data
}

export const getBrands = async (token: string | undefined): Promise<BrandType[]> => {
  const response = await api.get('/cars/brands', auth(token))
  return response.data
}

export const createBrand = async (brand: string, token: string | undefined): Promise<BrandType> => {
  const response = await api.post('/brands', { name: brand }, auth(token))
  return response.data
}

export const deleteBrand = async (id: string, token: string | undefined): Promise<BrandType> => {
  const response = await api.delete(`/brands/${id}`, auth(token))
  return response.data
}

export const updatePreviewImage = async (id: string, preview: string, token: string | undefined): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}`, { preview }, auth(token))
  return response.data
}

export const deleteCarImageFromApi = async (id: string, image: string, token: string | undefined): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}/images`, { image }, auth(token))
  return response.data
}
