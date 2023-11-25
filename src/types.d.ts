export interface CarDTO {
  _id: string
  brand: string
  model: number
  description: string
  line: string
  kilometers: number
  images: string[]
  price: number
  preview: string
  fuel: string
  transmission: string
  cc: number
  type: string
  owners: number
  plate: string
  color: string
  createdAt: string
  updatedAt: string
}

export interface UpdateCarDTO {
  brand?: string
  model?: number
  description?: string
  line?: string
  kilometers?: number
  images?: string[]
  price?: number
  preview?: string
  fuel?: string
  transmission?: string
  cc?: number
  type?: string
  owners?: number
  plate?: string
  color?: string
}

export interface CreateCarDTO extends Omit<CarDTO, '_id' | 'createdAt' | 'updatedAt' | 'images'> {}

export interface UserDTO {
  _id: string
  username: string
  role?: string
  image?: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserDTO {
  username?: string
  role?: string
  image?: string
}

export interface CreateUserDTO extends Omit<UserDTO, '_id' | 'createdAt' | 'updatedAt'> {}

export enum TypeUserUpdate {
  toUsername = 'toUsername',
  toPassword = 'toPassword',
}

export interface BrandType {
  _id: string
  name: string
}
