import React from 'react'
import { Text } from 'react-native'

export const Title = (props: { title: string }) => {
  return (
    <Text
      style={{
        fontSize: 30,
        color: '#fff',
        margin: 10
      }}
    >
      {props.title}
    </Text>
  )
}