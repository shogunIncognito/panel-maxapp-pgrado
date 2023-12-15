'use client'

import CreateCar from '@/components/CreateCar'
import { useEffect } from 'react'
import UpdateCar from '@/components/UpdateCar'
import { tableHeaders } from '@/helpers/data'
import DeleteCar from '@/components/DeleteCar'
import useCarsStore from '@/hooks/useCarsStore'
import AddBrand from '@/components/Brands'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import CarFilter from '@/components/CarFilter'
import { deleteCar } from '@/services/api'
import toast from 'react-hot-toast'
import ChangePreviewCar from '@/components/ChangePreviewCar'
import { deleteCarsImages } from '@/services/firebase'
import usePanelCarsReducer, { ActionTypes } from '@/reducers/panelCarsReducer'
import { CarDTO } from '@/types'

export default function page (): JSX.Element {
  const { cars, reFetch, loading } = useCarsStore()
  const [{
    selectedCar,
    carToDelete,
    filteredCars,
    carsSelected,
    carPreviewToChange
  }, dispatch] = usePanelCarsReducer()

  const dispatchAction = (type: ActionTypes, payload: any): void => dispatch({ type, payload })

  useEffect(() => {
    dispatchAction(ActionTypes.SET_FILTERED_CARS, cars)
  }, [cars])

  useEffect(() => {
    reFetch()
  }, [])

  if (loading) return <Spinner />

  const addCarToList = (car: CarDTO): void => {
    (carsSelected.find(carSel => carSel._id === car._id) != null)
      ? dispatchAction(ActionTypes.SET_CARS_SELECTED, carsSelected.filter(carSel => carSel._id !== car._id))
      : dispatchAction(ActionTypes.SET_CARS_SELECTED, [...carsSelected, car])
  }

  const deleteSelectedCars = async (): Promise<void> => {
    const carsImages = carsSelected.reduce<string[]>((acc, curr) => [...acc, ...curr.images], [])

    try {
      await Promise.all([deleteCarsImages(carsImages), deleteCar(carsSelected)])

      toast.success('Autos eliminados')
      reFetch()
    } catch (error) {
      toast.error('Error al eliminar los autos')
    } finally {
      dispatchAction(ActionTypes.SET_CARS_SELECTED, [])
    }
  }

  const sortByHeader = (header: string): void => {
    const sortedCars = [...filteredCars].sort((a, b) => String(b[header as keyof CarDTO]).localeCompare(String(a[header as keyof CarDTO]), 'es', { numeric: true }))
    dispatchAction(ActionTypes.SET_FILTERED_CARS, sortedCars)
  }

  return (
    <section className='w-full dark:bg-inherit bg-slate-200/60 flex-1 max-h-full'>

      <div className='gap-3 p-5 flex-col border-b-2 border-gray-300/40 md:flex-row flex items-start '>
        <h2 className='text-3xl self-center opacity-75 font-bold text-black dark:text-white font-mono md:hidden mb-3 mt-1'>Autos</h2>
        <div className='gap-2 flex'>
          <CreateCar />
          <AddBrand />
        </div>

        <CarFilter cars={cars} setCars={dispatchAction} />

        {carsSelected.length > 0 && (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <Button disabled={carsSelected.length === 0} className='animate__animated animate__fadeIn animate__faster bg-red-500 hover:bg-red-700 font-bold py-2 px-4' onClick={deleteSelectedCars}>
            Eliminar seleccionados
          </Button>
        )}
      </div>
      <div className='relative flex-1 w-full max-h-[70%] lg:max-h-[76%] xl:max-h-[80%] overflow-auto'>
        <table className='w-full overflow-auto text-sm text-center text-gray-400'>
          <thead className='text-xs sticky dark:bg-[#171923] bg-slate-300 z-10 top-0 uppercase border-b border-green-800/90 text-gray-800 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6' />

              {tableHeaders.map((header, index) => (
                <th key={index} scope='col' onClick={() => sortByHeader(header.value)} className='px-6 py-3 cursor-pointer hover:text-white transition-colors'>
                  {header.label}
                </th>
              ))}

            </tr>
          </thead>
          <tbody>

            {cars.length === 0 && !loading && (
              <tr className='border-b border-green-800/90'>
                <td colSpan={11} className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                  No hay autos
                </td>
              </tr>
            )}

            {filteredCars.length === 0 && !loading && cars.length > 0 && (
              <tr className='border-b border-green-800/90'>
                <td colSpan={11} className='px-6 py-4 font-medium whitespace-nowrap text-white'>
                  No hay autos que coincidan con el filtro
                </td>
              </tr>
            )}

            {filteredCars.map((car, index) => (
              <tr key={car._id} className='bg-transparent border-b border-green-800/90 text-neutral-600 dark:text-white'>
                <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                  <input onClick={() => addCarToList(car)} type='checkbox' className='form-checkbox h-4 w-4 text-gray-500' />
                </th>
                <td className='capitalize px-6 py-4'>
                  {car.plate}
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.brand}
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.model}
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.line}
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.kilometers} km
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.cc}
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.color}
                </td>
                <td className='capitalize px-6 py-4'>
                  $ {Math.round(Number(car.price)).toLocaleString()}
                </td>
                <td className='px-6 py-4'>
                  <div className='cursor-pointer flex justify-center items-center relative group'>
                    <img src={car.preview !== '' ? car.preview : car.images[0]} alt={car.plate} width={160} height={160} className='rounded-lg object-cover cursor-pointer w-auto h-auto ring-2 max-w-[160px] max-h-[160px] min-w-[160px] min-h-[160px]' />
                    <div onClick={() => dispatchAction(ActionTypes.SET_CAR_PREVIEW_TO_CHANGE, car)} className='absolute top-0 w-full h-full bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 max-w-[160px] max-h-[160px] min-w-[160px] min-h-[160px] transition-all duration-300'>
                      <span className='text-white font-bold'>
                        Cambiar imagen
                      </span>
                    </div>
                  </div>
                </td>
                <td className='px-6 py-4 h-full m-auto'>
                  <Button onClick={() => dispatchAction(ActionTypes.SET_SELECTED_CAR, car)} className='w-full mb-1 bg-[#59da86] font-semibold text-black/70 hover:bg-green-600'>
                    Editar
                  </Button>
                  <Button onClick={() => dispatchAction(ActionTypes.SET_CAR_TO_DELETE, car)} className='w-full mt-1 bg-[#FBD38D] hover:bg-yellow-500 font-semibold text-black/70 py-2 px-4'>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      {(selectedCar != null) && <UpdateCar selectedCar={selectedCar} setSelectedCar={dispatchAction} />}
      {(carToDelete != null) && <DeleteCar carToDelete={carToDelete} setCarToDelete={dispatchAction} />}
      {(carPreviewToChange != null) && <ChangePreviewCar car={carPreviewToChange} setCar={dispatchAction} />}
    </section>
  )
}
