/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form'
import Button from './Button'
import { CreateUserDTO, UserDTO, UserFormData } from '@/types'
import { UserFormSchema } from '@/schemas/UserFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import FormField from './FormInput'

interface UserFormProps {
  loading: boolean
  handleClose: () => void
  handleSubmit: (date: UserFormData) => void
  values: CreateUserDTO | UserDTO
  type: 'create' | 'update'
}

export default function UserForm ({ loading, handleClose, handleSubmit, values, type }: UserFormProps): JSX.Element {
  const {
    register,
    handleSubmit: onSubmitForm,
    formState: { errors }
  } = useForm<UserFormData>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: values
  })

  return (
    <>
      <h2 className='text-2xl opacity-75 self-center'>{type === 'create' ? 'Agregar usuario' : 'Editar usuario'}</h2>
      <form onSubmit={onSubmitForm(handleSubmit)} className='w-full flex flex-col justify-center items-center gap-3 mt-4 rounded'>
        <div className='w-5/6 flex flex-col gap-1'>
          <label className='opacity-80 font-bold' htmlFor='username'>Nombre</label>
          <FormField errorLength='40ch' register={register} error={errors.username} className='p-2' name='username' type='text' placeholder='Pedro' />
        </div>
        <div className='w-5/6 flex flex-col gap-1'>
          <label className='opacity-80 font-bold' htmlFor='password'>Contraseña</label>
          <FormField errorLength='40ch' register={register} error={errors.password} className='p-2' name='password' type='password' placeholder='*******' />
        </div>
        <div className='w-1/2 flex flex-col gap-1 mt-3'>
          <select {...register('role')} className='font-medium py-2 rounded outline-none hover:border-b-blue-600 focus:border-b-blue-500 dark:hover:border-b-blue-400 dark:focus:border-b-blue-600 transition-all duration-300 bg-transparent border-b-2 dark:text-white text-black border-gray-400 dark:border-gray-200'>
            <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='admin'>Admin</option>
            <option className='bg-slate-100 text-black dark:text-white dark:bg-slate-700' value='usuario'>Usuario</option>
          </select>
        </div>

        <div className='flex items-center w-5/6 lg:w-2/3 gap-2 mt-3'>
          <Button type='submit' loading={loading} disabled={loading} className='py-2 mt-2 flex-1 w-2/3 self-center bg-purple-600 hover:bg-purple-800'>
            {type === 'create' ? 'Crear' : 'Actualizar'}
          </Button>
          <Button onClick={handleClose} type='reset' className='py-2 mt-2 w-2/3 flex-1 self-center'>Cancelar</Button>
        </div>

      </form>
    </>
  )
}
