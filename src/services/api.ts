import axios from 'axios'
import { DEVELOPMENT_API_URL, PRODUCTION_API_URL } from '@/utils/envconfig'
import { getToken } from '@/utils/token'

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? PRODUCTION_API_URL : DEVELOPMENT_API_URL
})

const auth = () => ({ headers: { authorization: `Bearer ${getToken()}` } })

export const login = async (values) => {
  const response = await api.post('/auth/login', values)
  // setToken('auth-token', response.data.token, {
  //   maxAge: 60 * 60 * 24 * 7
  // })
  return response.data
}

export const getCars = async () => {
  const response = await api.get('/cars')
  return response.data
}

export const createCar = async (values) => {
  const response = await api.post('/cars', values, auth())
  return response.data
}

export const updateCar = async (id, values) => {
  const response = await api.put(`/cars/${id}`, values, auth())
  return response.data
}

export const deleteCar = async (id) => {
  const ids = typeof id === 'object' ? id.map(car => `ids=${car.id}`).join('&') : `ids=${id}`
  const response = await api.delete(`/cars?${ids}`, auth())
  return response.data
}

export const getUsers = async () => {
  const response = await api.get('/admins', auth())
  return response.data
}

export const createUser = async (values) => {
  const response = await api.post('/admins', values, auth())
  return response.data
}

export const deleteUser = async (id) => {
  const response = await api.delete(`/admins/${id}`, auth())
  return response.data
}

export const updateUser = async (id, values, type) => {
  const response = await api.put(`/admins/${id}?type=${type}`, values, auth())
  return response.data
}

export const getBrands = async () => {
  const response = await api.get('/cars/brands', auth())
  return response.data
}

export const createBrand = async (brand) => {
  const response = await api.post('/brands', { name: brand }, auth())
  return response.data
}

export const deleteBrand = async (id) => {
  const response = await api.delete(`/brands/${id}`, auth())
  return response.data
}

export const updatePreviewImage = async (id, preview) => {
  const response = await api.patch(`/cars/${id}`, { preview }, auth())
  return response.data
}

export const deleteCarImageFromApi = async (id, image) => {
  const response = await api.put(`/cars/${id}/images`, { image }, auth())
  return response.data
}
