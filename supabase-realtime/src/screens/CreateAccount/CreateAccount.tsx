import React, {
  useState,
  useEffect
} from 'react'
import {
  View,
  Text,
  Pressable
} from 'react-native'
import { supabase } from '../../supabase/supabase'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import { SignResponse } from '../../types/supabaseResponse'
import { Container, Form, Title } from '../../components/components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type CreateAccountScreenProp = NativeStackNavigationProp<AuthScreensParams, 'CreateAccount'>

export const CreateAccount = () => {
  const navigation = useNavigation<CreateAccountScreenProp>()
  const [response, setResponse] = useState<SignResponse>()

  function handleSignIn(email: string, password: string) {
    (async () => {
      const { error, session, user } = await supabase.auth.signUp({ email, password })

      setResponse({ error, session, user })
    })()
  }

  useEffect(() => {
    if (response?.user) {
      navigation.navigate('Login')
    }
  }, [response])

  return (
    <Container
      style={{
        backgroundColor: '#0f0131',
      }}
    >
      <Title title='Create Account' />
      <Form onAction={handleSignIn} buttonText='Create Account' />
      <Pressable
        style={{
          padding: 10,
          margin: 5
        }}
        onPress={() => navigation.navigate('Login')}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center'
          }}
        >
          Login
        </Text>
      </Pressable>
    </Container>
  )
}