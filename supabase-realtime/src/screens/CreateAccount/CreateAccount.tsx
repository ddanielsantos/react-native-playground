import React, {
  useState,
  useEffect
} from 'react'
import {
  Text,
  Pressable
} from 'react-native'
import { supabase } from '../../supabase/supabase'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import { SignResponse } from '../../types/supabaseResponse'
import { Container, Form, Title, } from '../../components/components'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useToast } from 'react-native-toast-notifications'

type CreateAccountScreenProp = NativeStackNavigationProp<AuthScreensParams, 'CreateAccount'>

export const CreateAccount = () => {
  const navigation = useNavigation<CreateAccountScreenProp>()
  const toast = useToast()
  const [response, setResponse] = useState<SignResponse>()

  async function handleSignIn(email: string, password: string) {
    const { error, session, user } = await supabase.auth.signUp({ email, password })

    setResponse({ error, session, user })

    if (error) {
      toast.show(error.message, {
        duration: 2000,
        animationType: 'slide-in',
        animationDuration: 300,
        swipeEnabled: true,
        placement: 'top',
        type: 'danger'
      })
    }

    if (!error) {
      toast.show('Confirm the e-mail we sent', {
        duration: 2000,
        animationType: 'slide-in',
        animationDuration: 300,
        swipeEnabled: true,
        placement: 'top',
        type: 'success'
      })
    }

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
          padding: 15,
          margin: 5,
          borderRadius: 4,
          borderColor: 'white',
          borderWidth: 1,
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