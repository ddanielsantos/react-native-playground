import React from 'react'
import { Text } from 'react-native'

type Props = {
  isFetching: boolean,
  dataLenght: number
}

export const FetchingFeedback = ({ dataLenght, isFetching }: Props) => {
  return (
    <Text
      style={{
        textAlign: 'center',
        fontSize: 20,
        color: 'white'
      }}
    >
      {
        isFetching && 'Fetching data'
      }

      {
        !isFetching && dataLenght === 0 && 'No data found'
      }
    </Text>
  )
}