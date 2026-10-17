import type React from 'react'

export interface NavAction {
  label: string
  hint: string
  run: (e?: React.MouseEvent) => void
}

export interface NavLinkItem {
  id: string
  number: string
  label: string
}
