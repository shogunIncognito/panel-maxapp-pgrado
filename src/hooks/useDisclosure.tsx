import { useState } from 'react'

/**
 *
 * @param {*} bool
 * @returns
 */

interface UseDisclosureType {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
}

export default function useDisclosure (bool = false): UseDisclosureType {
  if (typeof bool !== 'boolean') console.error('useDisclosure hook debe recibir un booleano como argumento')
  const [open, setOpen] = useState(bool)

  const handleOpen = (): void => setOpen(true)
  const handleClose = (): void => setOpen(false)

  return {
    open,
    handleOpen,
    handleClose
  }
}
