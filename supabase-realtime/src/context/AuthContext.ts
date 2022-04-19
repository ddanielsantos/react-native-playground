import {
  Dispatch,
  createContext,
  SetStateAction
} from 'react'

type AuthContextProperties = {
  isAuthenticated: boolean,
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextProperties>({
  isAuthenticated: false,
  setIsAuthenticated: () => { }
})
