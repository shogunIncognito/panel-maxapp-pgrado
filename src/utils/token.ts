import Cookies from 'js-cookie'

export const getToken = () => Cookies.get('auth-token')
export const removeToken = () => Cookies.remove('auth-token')
export const setToken = (token) => Cookies.set('auth-token', token)
