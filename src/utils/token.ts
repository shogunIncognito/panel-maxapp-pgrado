import Cookies from 'js-cookie'

export const getToken = (): string | undefined => Cookies.get('auth-token')
export const removeToken = (): void => Cookies.remove('auth-token')
export const setToken = (token: string): string | undefined => Cookies.set('auth-token', token)
