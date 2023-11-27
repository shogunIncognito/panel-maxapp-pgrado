import { CarDTO } from '@/types'
import { useReducer } from 'react'

export enum ActionTypes {
  SET_SELECTED_CAR = 'SET_SELECTED_CAR',
  SET_CAR_TO_DELETE = 'SET_CAR_TO_DELETE',
  SET_FILTERED_CARS = 'SET_FILTERED_CARS',
  SET_CARS_SELECTED = 'SET_CARS_SELECTED',
  SET_CAR_PREVIEW_TO_CHANGE = 'SET_CAR_PREVIEW_TO_CHANGE'
}

interface Action {
  type: ActionTypes
  payload: any
}

interface State {
  selectedCar: null | CarDTO
  carToDelete: null | CarDTO
  filteredCars: CarDTO[]
  carsSelected: CarDTO[]
  carPreviewToChange: null | CarDTO
}

const panelCarsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_SELECTED_CAR:
      return {
        ...state,
        selectedCar: action.payload
      }
    case ActionTypes.SET_CAR_TO_DELETE:
      return {
        ...state,
        carToDelete: action.payload
      }
    case ActionTypes.SET_FILTERED_CARS:
      return {
        ...state,
        filteredCars: action.payload
      }
    case ActionTypes.SET_CARS_SELECTED:
      return {
        ...state,
        carsSelected: action.payload
      }
    case ActionTypes.SET_CAR_PREVIEW_TO_CHANGE:
      return {
        ...state,
        carPreviewToChange: action.payload
      }
    default:
      return state
  }
}

const INITIAL_STATE: State = {
  selectedCar: null,
  carToDelete: null,
  filteredCars: [],
  carsSelected: [],
  carPreviewToChange: null
}

export default function usePanelCarsReducer (): [State, React.Dispatch<Action>] {
  return useReducer(panelCarsReducer, INITIAL_STATE)
}
