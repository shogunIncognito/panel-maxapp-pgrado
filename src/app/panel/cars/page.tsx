/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'

import CreateCar from '@/components/CreateCar'
import { useEffect } from 'react'
import UpdateCar from '@/components/UpdateCar'
import { tableHeaders } from '@/helpers/data'
import DeleteCar from '@/components/DeleteCar'
import useCarsStore from '@/hooks/useCarsStore'
import Button from '@/components/Button'
import Spinner from '@/components/Spinner'
import CarFilter from '@/components/CarFilter'
import ChangePreviewCar from '@/components/ChangePreviewCar'
import usePanelCarsReducer, { ActionTypes } from '@/reducers/panelCarsReducer'
import { CarDTO } from '@/types'
import ModalBackdrop from '@/components/ModalBackdrop'
import CarPDFDownload from '@/components/pdf/CarPDFDownload'

export default function page (): JSX.Element {
  const { cars, loading } = useCarsStore()
  const [{
    selectedCar,
    carToDelete,
    filteredCars,
    carsSelected,
    carPreviewToChange,
    sortingBy
  }, dispatch] = usePanelCarsReducer()

  const dispatchAction = (type: ActionTypes, payload: any): void => dispatch({ type, payload })

  useEffect(() => {
    dispatchAction(ActionTypes.SET_FILTERED_CARS, cars)
  }, [cars])

  if (loading) return <Spinner />

  const addCarToList = (car: CarDTO): void => {
    (carsSelected.find(carSel => carSel._id === car._id) != null)
      ? dispatchAction(ActionTypes.SET_CARS_SELECTED, carsSelected.filter(carSel => carSel._id !== car._id))
      : dispatchAction(ActionTypes.SET_CARS_SELECTED, [...carsSelected, car])
  }

  const sortByHeader = (header: string): void => {
    const sortedCars = [...filteredCars].sort((a, b) => String(b[header as keyof CarDTO]).localeCompare(String(a[header as keyof CarDTO]), 'es', { numeric: true }))
    dispatchAction(ActionTypes.SET_FILTERED_CARS, sortedCars)
    dispatchAction(ActionTypes.SET_SORTING_BY, header)
  }

  return (
    <>
      <div className='gap-1 h-auto flex-col p-0.5 ml-2 mt-2 md:mt-1 border-b-2 border-gray-300/40 lg:flex-row flex items-start '>
        <div className='gap-1 grid grid-cols-3'>
          <CreateCar className='whitespace-nowrap text-ellipsis overflow-hidden' />
        </div>

        <CarFilter cars={cars} setCars={dispatchAction} />

        <CarPDFDownload cars={cars} />
      </div>

      <div className='relative flex-1 w-full h-full max-h-max overflow-auto'>
        <table className='w-full text-sm text-center text-gray-400'>
          <thead className='text-xs sticky dark:bg-[#171923] bg-slate-300 z-10 top-0 uppercase border-b border-green-800/90 text-gray-800 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6' />

              {tableHeaders.map((header, index) => (
                <th key={index} scope='col' onClick={() => sortByHeader(header.value)} className={`px-6 py-3 cursor-pointer dark:hover:text-white hover:text-blue-500 transition-colors ${sortingBy === header.value ? 'dark:text-white text-blue-600' : ''}`}>
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

            {filteredCars.map((car) => (
              <tr key={car._id} className='bg-transparent border-b border-green-800/90 text-neutral-600 dark:text-white'>
                <th scope='row' className='px-6 py-4 font-medium whitespace-nowrap'>
                  <input onClick={() => addCarToList(car)} type='checkbox' className='form-checkbox h-4 w-4 text-gray-500' />
                </th>
                <td className='capitalize px-6 py-4'>
                  {car.plate}
                </td>
                <td className='uppercase px-6 py-4'>
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
                  {car.cc.toFixed(1)}
                </td>
                <td className='capitalize px-6 py-4'>
                  {car.color}
                </td>
                <td className='capitalize px-6 py-4'>
                  $ {Math.round(Number(car.price)).toLocaleString()}
                </td>
                <td className='px-6 py-4'>
                  <div className='cursor-pointer flex justify-center items-center relative group'>
                    <img
                      src={car.preview === null || car.preview === '' ? car.images[0] : car.preview}
                      alt={car.plate}
                      className='rounded-lg object-cover cursor-pointer w-auto h-auto ring-2 max-w-[100px] min-w-[100px] max-h-[100px] min-h-[100px] lg:max-w-[160px] lg:max-h-[160px] lg:min-w-[190px] lg:min-h-[160px]'
                    />
                    <div onClick={() => dispatchAction(ActionTypes.SET_CAR_PREVIEW_TO_CHANGE, car)} className='absolute top-0 w-full h-full bg-black/50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 lg:max-w-[160px] lg:max-h-[160px] lg:min-w-[190px] lg:min-h-[160px] transition-all duration-300'>
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
                    Eliminar/Vendido
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>

      <ModalBackdrop open={selectedCar !== null}>
        {selectedCar !== null && <UpdateCar selectedCar={selectedCar} setSelectedCar={dispatchAction} />}
      </ModalBackdrop>

      <ModalBackdrop open={carToDelete !== null}>
        {carToDelete !== null && <DeleteCar carToDelete={carToDelete} setCarToDelete={dispatchAction} />}
      </ModalBackdrop>

      <ModalBackdrop open={carPreviewToChange !== null}>
        {carPreviewToChange !== null && <ChangePreviewCar car={carPreviewToChange} setCar={dispatchAction} />}
      </ModalBackdrop>

    </>
  )
}
