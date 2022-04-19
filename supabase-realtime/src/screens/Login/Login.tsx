import React, {
  useState, useEffect, useContext
} from 'react'
import { Pressable, Text } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import { SignResponse } from '../../types/supabaseResponse'
import { Container, Form, Title, } from '../../components/components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { storeSessionInStorage } from '../../helpers/asyncStorageHelpers'
import { AuthContext } from '../../context/AuthContext'
import { useToast } from 'react-native-toast-notifications'

type LoginScreenProp = NativeStackNavigationProp<AuthScreensParams, 'Login'>

export const Login = () => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const navigation = useNavigation<LoginScreenProp>()
  const [response, setResponse] = useState<SignResponse>({ error: null, session: null, user: null })
  const toast = useToast()

  async function handleLogin(email: string, password: string) {
    const { error, session, user } = await supabase.auth.signIn({ email, password })

    if (error) {
      toast.show('Verify your credentials and try again', {
        duration: 2000,
        animationType: 'slide-in',
        animationDuration: 300,
        swipeEnabled: true,
        placement: 'top',
        type: 'danger'
      })
    }

    setResponse({ error, session, user })
  }

  useEffect(() => {
    const { session, error } = response

    if (!session) return;

    (
      async () => {
        const { error } = await storeSessionInStorage(session)

        if (!error) {
          setIsAuthenticated(true)
        }
      }
    )()
  }, [response])

  return (
    <Container
      style={{
        backgroundColor: '#0f0131',
      }}
    >
      <Title title='Login' />
      <Form onAction={handleLogin} buttonText='Login' />
      <Pressable
        style={{
          padding: 15,
          margin: 5,
          borderRadius: 4,
          borderColor: 'white',
          borderWidth: 1,
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
  )
}