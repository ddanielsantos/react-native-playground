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
        backgroundColor: '#0f0131'
      }}
    >
      <TextInput
        placeholder='Title'
        updater={setTitle}
        returnKeyType='done'
        value={title}
      />
      <TextInput
        placeholder='Body'
        updater={setBody}
        value={body}
        numberOfLines={5}
        keyboardType='default'
        returnKeyType='done'
        multiline={true}
        maxLength={240}
        style={{
          height: 75,
          textAlignVertical: 'top'
        }}
      />
      <Pressable
        style={{
          backgroundColor: '#ffffff',
          padding: 20,
          margin: 2,
          marginHorizontal: 4,
          borderRadius: 4
        }}
        onPress={() => {
          onSubmit(title, body)
          setTitle('')
          setBody('')
        }}
      />

    </View>
  )
}