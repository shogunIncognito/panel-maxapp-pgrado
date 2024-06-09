import { AiFillHome } from 'react-icons/ai'
import { BiSolidUser, BiStats } from 'react-icons/bi'
import { FaCarAlt } from 'react-icons/fa'

export const carInputs = [
  {
    type: 'text',
    name: 'plate',
    label: 'Placa',
    placeholder: 'ABC123'
  },
  {
    type: 'number',
    name: 'model',
    label: 'Modelo',
    placeholder: '2020'
  },
  {
    type: 'text',
    name: 'line',
    label: 'Linea',
    placeholder: 'Captiva Sport'
  },
  {
    type: 'text',
    name: 'color',
    label: 'Color',
    placeholder: 'Rojo'
  },
  {
    type: 'number',
    name: 'kilometers',
    label: 'Kilómetros',
    placeholder: '12000'
  },
  {
    type: 'number',
    name: 'owners',
    label: 'Dueños',
    placeholder: '1'
  },
  {
    type: 'number',
    name: 'price',
    label: 'Precio',
    placeholder: '20.000.000'
  }
]

export const tableHeaders = [
  {
    label: 'Placa',
    value: 'plate'
  },
  {
    label: 'Marca',
    value: 'brand'
  },
  {
    label: 'Modelo',
    value: 'model'
  },
  {
    label: 'Linea',
    value: 'line'
  },
  {
    label: 'Kilómetros',
    value: 'kilometers'
  },
  {
    label: 'CC',
    value: 'cc'
  },
  {
    label: 'Color',
    value: 'color'
  },
  {
    label: 'Precio',
    value: 'price'
  },
  {
    label: 'Imagen',
    value: 'image'
  },
  {
    label: 'Acciones',
    value: 'actions'
  }
]

export const selectOptionsCC = [
  '1.0', '1.1', '1.2', '1.3', '1.4',
  '1.5', '1.6', '1.8', '2.0', '2.2',
  '2.4', '2.5', '2.6', '2.7', '2.8'
]

export const adminRoutes = [
  {
    label: 'Inicio',
    icon: AiFillHome,
    path: '/panel'
  },
  {
    label: 'Autos',
    icon: FaCarAlt,
    path: '/panel/cars'
  },
  {
    label: 'Usuarios',
    icon: BiSolidUser,
    path: '/panel/users'
  },
  {
    label: 'Estadísticas',
    icon: BiStats,
    path: '/panel/stats'
  },
  {
    label: 'Transacciones',
    icon: BiStats,
    path: '/panel/transactions'
  }
]

export const userRoutes = [
  {
    label: 'Inicio',
    icon: AiFillHome,
    path: '/panel'
  },
  {
    label: 'Autos',
    icon: FaCarAlt,
    path: '/panel/cars'
  }
]

interface NavRouteMsg {
  [key: string]: string
}

export const navRouteMsg: NavRouteMsg = {
  '/panel': 'Panel de administración',
  '/panel/cars': 'Autos',
  '/panel/users': 'Usuarios',
  '/panel/stats': 'Estadísticas',
  '/panel/transactions': 'Transacciones'
}

export const transactionsTableHeaders = [
  {
    label: 'ID',
    value: 'id'
  },
  {
    label: 'Fecha',
    value: 'date'
  },
  {
    label: 'Comprador',
    value: 'buyer'
  },
  {
    label: 'Auto',
    value: 'car'
  },
  {
    label: 'Placa',
    value: 'plate'
  },
  {
    label: 'Precio',
    value: 'price'
  }
]