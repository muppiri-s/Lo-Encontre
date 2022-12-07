import { createContext, useReducer } from 'react'

export const DealContext = createContext()

export const dealReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DEALS': 
      return {
        deals: action.payload
      }
    case 'CREATE_DEALS':
      return {
        deals: [action.payload, ...state.deals]
      }
    case 'DELETE_DEALS':
      return {
        deals: state.deals.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const DealContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dealReducer, {
    deals: null
  })

  return (
    <DealContext.Provider value={{...state, dispatch}}>
      { children }
    </DealContext.Provider>
  )
}