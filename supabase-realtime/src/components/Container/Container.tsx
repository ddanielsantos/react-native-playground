import React, { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type Props = ViewProps & {
  children: ReactNode
}

export const Container = (props: Props) => {
  return (
    <View
      style={[{
        flex: 1,
        alignItems: 'center',
      }, props.style]}
    >
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
    </View>
  )
}