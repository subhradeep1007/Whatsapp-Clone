import React, { createContext,useReducer,useContext } from 'react'
export const StateContext = createContext()

export const StateProvider = ({reducer,initialstate,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialstate)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue= ()=>useContext(StateContext)
