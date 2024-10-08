export interface CarDTO {
  _id: string
  brand: string
  model: number
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
  show: boolean
  sold: boolean
  transactions: number
  createdAt: string
  updatedAt: string
}

export interface ApiCarDTO {
  result: CarDTO[]
  totalPages: number
  currentPage: number
}

export interface UpdateCarDTO {
  brand?: string
  model?: number
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
  show?: boolean
  sold?: boolean
}

export interface CreateCarDTO extends Omit<CarDTO, '_id' | 'createdAt' | 'updatedAt' | 'preview' | 'transactions'> {
  images?: string[]
}

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

export interface CreateUserDTO extends Omit<UserDTO, '_id' | 'createdAt' | 'updatedAt'> {
  password: string
}

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
  [key: number]: any
}

export interface FormFieldProps {
  type: string
  placeholder: string
  name: ValidFieldNames
  register: UseFormRegister<FormData>
  error: FieldError | undefined
  valueAsNumber?: boolean
  className?: string
  errorLength?: string
}

export interface CarFormData {
  color: string
  kilometers: number
  line: string
  model: number
  owners: number
  plate: string
  price: number
}

export interface UserFormData {
  username: string
  password: string
}

export interface CarFormSelects {
  brand: string
  fuel: string
  transmission: string
  type: string
  cc: number
  show: boolean
  sold: boolean
}

interface CarBuyer {
  cc: number
  name: string
  email: string
  phone: number
  createdAt: string
  updatedAt: string
}

interface TransactionDTO {
  _id: string
  date: string
  car: CarDTO
  buyer: CarBuyer
  price: string
  createdAt: string
  updatedAt: string
}

interface CreateTransactionDTO {
  buyer: {
    cc: number
    name: string
    email: string
    phone: number
  }
  car: string
  price: number
  date: string
}