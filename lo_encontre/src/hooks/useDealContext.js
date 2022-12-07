import { DealContext } from '../context/DealContext'
import { useContext } from 'react'

export const useDealContext = () => {
  const context = useContext(DealContext)

  if (!context) {
    throw Error('useDealontext must be used inside an DealProvider')
  }

  return context
}