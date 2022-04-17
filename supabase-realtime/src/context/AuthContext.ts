import React from 'react'

type AuthContextProperties = {
  isAuthenticated: boolean,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> | null
}

export const AuthContext = React.createContext<AuthContextProperties>({
  isAuthenticated: false,
  setIsAuthenticated: null
})