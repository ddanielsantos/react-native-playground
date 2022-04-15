import React from 'react'
import { TextInput as TI, TextInputProps } from 'react-native'

type Props = TextInputProps & {
  placeholder: string,
  value: string,
  updater: React.Dispatch<React.SetStateAction<string>>,
  hideCharacters?: boolean,
}

export const TextInput = ({ placeholder, updater, value, hideCharacters, style, ...props }: Props) => {
  return (
    <TI
      placeholder={placeholder}
      placeholderTextColor={"#ffffff7e"}
      value={value}
      secureTextEntry={false || hideCharacters}
      style={[{
        backgroundColor: '#1a0057',
        borderRadius: 4,
        padding: 10,
        margin: 2,
        marginHorizontal: 4,
        color: 'white'
      }, style]}
      onChangeText={t => {
        updater(t)
      }}
      {...props}
    />
  )
}