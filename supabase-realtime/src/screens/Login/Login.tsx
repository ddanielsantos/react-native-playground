import React, {
  useState, useEffect, useContext
} from 'react'
import { View, Pressable, Text } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { AuthContext } from '../../routes/AuthRoute'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import { SignResponse } from '../../types/supabaseResponse'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Container, Form, Title } from '../../components/components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type LoginScreenProp = NativeStackNavigationProp<AuthScreensParams, 'Login'>

export const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigation = useNavigation<LoginScreenProp>()
  const [response, setResponse] = useState<SignResponse>()

  function handleLogin(email: string, password: string) {
    (async () => {
      const { error, session, user } = await supabase.auth.signIn({ email, password })

      setResponse({ error, session, user })
    })()
  }

  useEffect(() => {
    (
      async () => {
        if (response?.session?.user) {
          const { id } = response.session.user

          await AsyncStorage.setItem('uuid', id)

          if (setIsAuthenticated) {
            setIsAuthenticated(true)
          }
        }
      }
    )()
  }, [response])

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0f0131',
        alignItems: 'center',
      }}
    >
      <Container>
        <Title title='Login' />
        <Form onAction={handleLogin} buttonText='Login' />
        <Pressable
          style={{
            padding: 10,
            margin: 5,
            borderRadius: 4
          }}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text
            style={{
              color: 'white',
              textAlign: 'center'
            }}
          >
            Create Account
          </Text>
        </Pressable>
      </Container>
    </View>
  )
}