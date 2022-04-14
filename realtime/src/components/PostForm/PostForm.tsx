import React, { useState } from 'react'
import { Pressable, View } from 'react-native'
import { TextInput } from '../TextInput/TextInput'

type Props = {
  onSubmit: (title: string, body: string) => void
}

export const PostForm = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <View
      style={{
        backgroundColor: '#1a0057'
      }}
    >
      <TextInput
        placeholder='Title'
        updater={setTitle}
        value={title}
      />
      <TextInput
        placeholder='Body'
        updater={setBody}
        value={body}
      />
      <Pressable
        style={{
          backgroundColor: '#5eff5e',
          padding: 20,
          margin: 5,
          borderRadius: 4
        }}
        onPress={() => onSubmit(title, body)}
      />

    </View>
  )
}