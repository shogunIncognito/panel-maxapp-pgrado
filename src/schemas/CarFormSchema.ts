import { CarFormData } from '@/types'
import { ZodType, z } from 'zod'

export const CarFormSchema: ZodType<CarFormData> = z.object({
  color: z.string().min(1, 'El color es requerido'),
  kilometers: z.number({
    message: 'Los kilómetros son requeridos'
  }).min(1, 'Los kilómetros son requeridos'),
  line: z.string().min(1, 'La línea es requerida'),
  model: z.number({
    message: 'El modelo es requerido'
  }).min(1, 'El modelo es requerido'),
  owners: z.number({
    message: 'El número de dueños es requerido'
  }).min(1, 'El número de dueños es requerido'),
  plate: z.string().min(1, 'La placa es requerida').length(6, 'La placa debe tener 6 caracteres'),
  price: z.number({
    message: 'El precio es requerido'
  }).min(1, 'El precio es requerido')
}).refine(data => data.model > 2000 && data.model <= new Date().getFullYear(), {
  message: 'El modelo debe estar entre el 2000 y el al año actual',
  path: ['model']
})
