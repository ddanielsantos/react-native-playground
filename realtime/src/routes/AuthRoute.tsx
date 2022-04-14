import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/Home/Home'
import { Login } from '../screens/Login/Login'
import { CreateAccount } from '../screens/CreateAccount/CreateAccount'

export type AuthScreensParams = {
  Login: undefined,
  Home: undefined,
  CreateAccount: undefined
}

const AuthStack = createNativeStackNavigator<AuthScreensParams>()

export const AuthRoute = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_left' }} initialRouteName='CreateAccount'>
      <AuthStack.Screen name='CreateAccount' component={CreateAccount} />
      <AuthStack.Screen name='Home' component={Home} />
      <AuthStack.Screen name='Login' component={Login} />
    </AuthStack.Navigator>
  )
}