'use client'

import { useSearchParams } from 'next/navigation'

export default function page (): JSX.Element {
  const id = useSearchParams().get('id')
  return (
    <div>
      Aqui estara el formulario de creacion de transacciones carro: {id}
    </div>
  )
}
