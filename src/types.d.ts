export interface CarDTO {
  _id: string
  brand: string
  model: string
  description: string
  line: string
  kilometers: string
  images: string[]
  price: string
  preview: string
  fuel: string
  transmission: string
  cc: number
  type: string
  owners: string
  plate: string
  color: string
  show: boolean
  createdAt: string
  updatedAt: string
}

export interface UpdateCarDTO {
  brand?: string
  model?: string
  description?: string
  line?: string
  kilometers?: string
  images?: string[]
  price?: string
  preview?: string
  fuel?: string
  transmission?: string
  cc?: number
  type?: string
  owners?: string
  plate?: string
  color?: string
  show?: boolean
}

export interface CreateCarDTO extends Omit<CarDTO, '_id' | 'createdAt' | 'updatedAt' | 'images' | 'preview'> {}

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

export interface CreateUserDTO extends Omit<UserDTO, '_id' | 'createdAt' | 'updatedAt'> { }

export interface BrandType {
  _id: string
  name: string
}

export interface StatsDTO {
  viewsMonths: ViewsMonths
  daysMonthViews: DaysMonthViews
}

interface ViewsMonths {
  Abril: number
  Marzo: number
}

interface DaysMonthViews {
  [key]: number
}
