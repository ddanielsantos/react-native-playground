import React, { useState } from 'react'
import { TextInput } from '../TextInput/TextInput'
import { Pressable, View, Text } from 'react-native'

type Props = {
  onAction: (email: string, password: string) => void,
  buttonText: string
}

export const Form = ({ onAction, buttonText }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <View>

      <TextInput
        placeholder='Insert your email'
        value={email}
        keyboardType='email-address'
        autoCapitalize='none'
        updater={setEmail}
      />
      <TextInput
        placeholder='Insert your password'
        value={password}
        updater={setPassword}
        hideCharacters={true}
      />
      <Pressable
        style={{
          backgroundColor: '#ffffff',
          padding: 10,
          margin: 5,
          borderRadius: 4
        }}
        onPress={() => onAction(email, password)}
      >
        <Text
          style={{
            color: '#1a0057',
            textAlign: 'center'
          }}
        >
          {buttonText}
        </Text>
      </Pressable>
    </View>

  )
}