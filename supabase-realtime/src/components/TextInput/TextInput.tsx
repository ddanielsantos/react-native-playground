import React from 'react'
import { TextInput as TI, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  updater: React.Dispatch<React.SetStateAction<string>>,
  hideCharacters?: boolean
}

export const TextInput = ({ updater, hideCharacters, style, ...props }: Props) => {

  return (
    <TI
      placeholderTextColor={"#ffffff7e"}
      secureTextEntry={false || hideCharacters}
      style={
        [{
          backgroundColor: '#1a0057',
          borderRadius: 4,
          padding: 10,
          margin: 2,
          marginHorizontal: 4,
          color: 'white'
        },
          style]
      }
      onChangeText={t => {
        updater(t)
      }}
      {...props}
    />
  )
}