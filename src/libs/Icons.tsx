export const MenuIcon = ({ color = 'none', ...props }): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
      stroke='#fff'
      viewBox='0 0 24 24'
      {...props}
      width={60}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M4 6h16M4 12h16M4 18h16'
      />
    </svg>
  )
}

export const CloseIcon = ({ color = 'none', ...props }): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
      stroke='#000'
      viewBox='0 0 24 24'
      {...props}
      width={60}
    >
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10zM8.97 8.97a.75.75 0 011.06 0L12 10.94l1.97-1.97a.75.75 0 011.06 1.06L13.06 12l1.97 1.97a.75.75 0 01-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 01-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 010-1.06z'
        clipRule='evenodd'
      />
    </svg>
  )
}

export const UserIcon = ({ color = 'none', ...props }): JSX.Element => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={color}
      {...props}
      width={60}
      viewBox='0 0 24 24'
    >
      <path
        stroke='#000'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M5 21a7 7 0 1114 0M16 7a4 4 0 11-8 0 4 4 0 018 0z'
      />
    </svg>
  )
}
