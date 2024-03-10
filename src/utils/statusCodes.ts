export interface StatusCodes {
  [key: number]: string
}

export const updateUsernameCodes: StatusCodes = {
  200: 'Usuario actualizado con éxito',
  400: 'Usuario ya existe',
  401: 'No autorizado',
  404: 'Usuario no encontrado',
  500: 'Error interno del servidor'
}

export const updatePasswordCodes: StatusCodes = {
  200: 'Contraseña actualizada con éxito',
  400: 'Contraseña actual no coincide',
  401: 'No autorizado',
  404: 'Usuario no encontrado',
  500: 'Error interno del servidor'
}

export const createUserCodes: StatusCodes = {
  200: 'Usuario creado con éxito',
  400: 'Usuario ya existe',
  401: 'No autorizado',
  500: 'Error interno del servidor'
}

export const deleteUserCodes: StatusCodes = {
  200: 'Usuario eliminado con éxito',
  401: 'No autorizado',
  404: 'Usuario no encontrado',
  500: 'Error interno del servidor'
}

export const loginCodes: StatusCodes = {
  200: 'Inicio de sesión exitoso',
  404: 'Usuario o contraseña incorrectos',
  401: 'Usuario o contraseña incorrectos',
  500: 'Error interno del servidor'
}

export const getUsersCodes: StatusCodes = {
  401: 'No autorizado',
  500: 'Error interno del servidor'
}

export const createBrandCodes: StatusCodes = {
  200: 'Marca creada con éxito',
  400: 'Marca ya existe',
  401: 'No autorizado',
  500: 'Error interno del servidor'
}

export const deleteBrandCodes: StatusCodes = {
  200: 'Marca eliminada con éxito',
  401: 'No autorizado',
  404: 'Marca no encontrada',
  500: 'Error interno del servidor'
}

export const createCarCodes: StatusCodes = {
  200: 'Coche creado con éxito',
  401: 'No autorizado',
  500: 'Error interno del servidor'
}

export const deleteCarCodes: StatusCodes = {
  200: 'Coche eliminado con éxito',
  401: 'No autorizado',
  404: 'Coche no encontrado',
  500: 'Error interno del servidor'
}

export const updateCarCodes: StatusCodes = {
  200: 'Coche actualizado con éxito',
  401: 'No autorizado',
  404: 'Coche no encontrado',
  500: 'Error interno del servidor'
}
