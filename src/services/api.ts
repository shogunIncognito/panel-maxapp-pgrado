import axios from 'axios'
import { API_URL } from '@/utils/envconfig'
import { ApiCarDTO, BrandType, CarDTO, CreateCarDTO, CreateUserDTO, StatsDTO, UpdateCarDTO, UpdateUserDTO, UserDTO } from '@/types'
import { TypeUserUpdate } from '@/enums'

const api = axios.create({
  baseURL: API_URL
})

const carsItemsPerPage = 5

// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
const auth = (token: string | undefined): { headers: { authorization: string } } => ({ headers: { authorization: `Bearer ${token}` } })

export const login = async (user: { username: string, password: string }): Promise<{ token: string }> => {
  const response = await api.post('/auth/login', user)
  return response.data
}

export const getCars = async (page: number, filter?: string | {
  value: string
  option: string
}, sortBy = ''): Promise<ApiCarDTO> => {
  const filterValue = filter === undefined ? '' : typeof filter === 'string' ? filter : `${filter.option}=${filter.value}`
  const response = await api.get(`/cars?page=${page}&limit=${carsItemsPerPage}&${filterValue}&sort=${sortBy}`)
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
export const updateUserImage = async (id: string, image: string | null, token: string | undefined): Promise<UserDTO> => {
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
  const response = await api.post('cars/brands', { name: brand }, auth(token))
  return response.data
}

export const deleteBrand = async (id: string, token: string | undefined): Promise<BrandType> => {
  const response = await api.delete(`cars/brands/${id}`, auth(token))
  return response.data
}

export const updatePreviewImage = async (id: string, preview: string, token: string | undefined): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}`, { preview }, auth(token))
  return response.data
}

export const deleteCarImageFromApi = async (id: string, images: string[], token: string | undefined): Promise<CarDTO> => {
  const response = await api.patch(`/cars/${id}/images`, { images }, auth(token))
  return response.data
}

// Stats endpoints
export const getStats = async (token: string | undefined): Promise<StatsDTO> => {
  const response = await api.get('/stats', auth(token))
  return response.data
}
