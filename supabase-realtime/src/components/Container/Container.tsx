import React from 'react'
import { View } from 'react-native'

type Props = {
  children: JSX.Element | JSX.Element[];
}

export const Container = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        maxWidth: 600
      }}
    >
      {props.children}
    </View>
  )
}