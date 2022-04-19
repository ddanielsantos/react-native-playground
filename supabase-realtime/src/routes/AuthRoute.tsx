import React, {
  useEffect,
  useState
} from 'react'
import AppLoading from 'expo-app-loading'
import { Home } from '../screens/Home/Home'
import { Login } from '../screens/Login/Login'
import { AuthContext } from '../context/AuthContext'
import { CreateAccount } from '../screens/CreateAccount/CreateAccount'
import { getSessionFromStorage } from '../helpers/asyncStorageHelpers'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


export type AuthScreensParams = {
  Login: undefined,
  Home: undefined,
  CreateAccount: undefined
}

const AuthStack = createNativeStackNavigator<AuthScreensParams>()

export const AuthRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (
      async () => {
        setIsLoading(true)
        const { session } = await getSessionFromStorage()

        if (session) {
          setIsAuthenticated(true)
        }

        setIsLoading(false)
      }
    )()
  }, [isAuthenticated])

  if (isLoading) {
    return (
      <AppLoading />
    )
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_left' }}>
        {
          isAuthenticated ? (
            <>
              <AuthStack.Screen name='Home' component={Home} />
            </>
          )
            :
            <>
              <AuthStack.Screen name='Login' component={Login} />
              <AuthStack.Screen name='CreateAccount' component={CreateAccount} />
            </>
        }
      </AuthStack.Navigator>
    </AuthContext.Provider>
  )
}