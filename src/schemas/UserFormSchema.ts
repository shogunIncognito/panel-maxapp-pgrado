import { UserFormData } from '@/types'
import { ZodType, z } from 'zod'

export const UserFormSchema: ZodType<UserFormData> = z.object({
  username: z.string().min(4, 'El nombre debe tener al menos 4 caracteres'),
  password: z.string(),
  role: z.string().min(1, 'El rol es requerido')
})
