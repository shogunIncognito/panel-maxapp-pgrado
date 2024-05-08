import useCarsStore from '@/hooks/useCarsStore'
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi'
import { twMerge } from 'tailwind-merge'

export default function CarsPagination () {
  const { pagination, fetchCars, cars } = useCarsStore()

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return
    fetchCars(page)
  }

  return (
    <div className='flex items-center justify-between border-t text-gray-700 dark:text-white border-gray-300 px-4 py-3 sm:px-6'>
      <div className='flex flex-1 items-center justify-between sm:hidden'>
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          className='relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium focus:bg-gray-700'
        >
          Anterior
        </button>
        <p className='text-sm'>
          Pagina <span className='font-medium'>{pagination.currentPage}</span> de <span className='font-medium'>{pagination.totalPages}</span>
        </p>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium focus:bg-gray-700'
        >
          Siguiente
        </button>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm'>
            Mostrando pagina <span className='font-medium'>{pagination.currentPage}</span> de <span className='font-medium'>{pagination.totalPages}</span> con{' '}
            <span className='font-medium'>{cars.length}</span> resultados en total
          </p>
        </div>
        <div>
          <nav className='isolate inline-flex -space-x-px rounded-md shadow-sm' aria-label='Pagination'>
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Previous</span>
              <BiLeftArrowAlt className='h-5 w-5' aria-hidden='true' />
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                onClick={() => handlePageChange(i + 1)}
                key={i}
                className={twMerge(`relative inline-flex hover:text-gray-700 items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset
                  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`, i === pagination.currentPage - 1 ? 'bg-indigo-500 hover:bg-indigo-500 text-white hover:text-white' : '')}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            >
              <span className='sr-only'>Next</span>
              <BiRightArrowAlt className='h-5 w-5' aria-hidden='true' />
            </button>
          </nav>
        </div>
      </div>
    </div>

  )
}
