import React from 'react'
import { KeyboardTypeOptions, TextInput as TI } from 'react-native'

type Props = {
  placeholder: string,
  value: string,
  updater: React.Dispatch<React.SetStateAction<string>>,
  hideCharacters?: boolean,
}

export const TextInput = ({ placeholder, updater, value, hideCharacters }: Props) => {
  return (
    <TI
      placeholder={placeholder}
      placeholderTextColor={"#ffffff7e"}
      value={value}
      secureTextEntry={false || hideCharacters}
      style={{
        backgroundColor: '#1a0057',
        borderRadius: 4,
        padding: 10,
        margin: 5,
        color: 'white'
      }}
      onChangeText={t => {
        updater(t)
      }}
    />
  )
}