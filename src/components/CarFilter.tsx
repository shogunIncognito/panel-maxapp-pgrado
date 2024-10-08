import { tableHeaders } from '@/helpers/data'
import Input from './Input'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import Select from './Select'
import useCarsStore from '@/hooks/useCarsStore'

export default function CarFilter (): JSX.Element {
  const { fetchCars } = useCarsStore()
  const headersToFilter = tableHeaders.filter(header => header.label !== 'Acciones' && header.label !== 'Imagen')
  const [filters, setFilter] = useState({
    value: '',
    option: headersToFilter[0].value
  })

  const carDebounced = useDebouncedCallback(() => {
    fetchCars(1, filters)
  }, 500)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    if (e.target.value === ' ') return

    setFilter(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))

    carDebounced()
  }

  return (
    <div className='flex dark:text-white text-black py-1 gap-2 px-2 items-center'>
      <h2 className='whitespace-nowrap text-ellipsis overflow-hidden'>Filtrar por</h2>
      <div className='flex gap-1 items-center'>

        <Select onChange={handleChange} name='option' value={filters.option} className='h-full border-gray-600 dark:border-inherit dark:text-white text-black outline-none px-1 bg-transparent'>
          {headersToFilter.map((header, index) => (
            <option key={index} className='dark:bg-neutral-800 dark:text-white text-black' value={header.value}>
              {header.label}
            </option>
          ))}
        </Select>

        <Input onChange={handleChange} name='value' value={filters.value} placeholder='...' className='h-full w-2/3 border-gray-400 text-black dark:text-white self-end' />
      </div>
    </div>
  )
}
