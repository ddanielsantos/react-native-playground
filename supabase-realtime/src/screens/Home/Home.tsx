import React, {
  useEffect, useContext, useState
} from 'react'
import { Pressable, View } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Container, Title, PostsList, TextInput } from '../../components/components'

type HomeScreenProp = NativeStackNavigationProp<AuthScreensParams, 'Home'>

export const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const { addListener: addNavigationListener } = useNavigation<HomeScreenProp>()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const { id: userId } = supabase.auth.user() || { id: '' }

  function handleNewPost() {
    if (!title || !body) return

    (
      async () => {
        const { error, data } = await supabase.from('posts').insert([
          { title, body, creator_id: userId, public: true },
        ])

        // TODO: handle error
        if (error) {
          alert(error.message)
        }

      }
    )()
  }

  function handleLogout() {
    (
      async () => {
        await AsyncStorage.removeItem('uuid')

        const { error } = await supabase.auth.signOut()

        if (!error && setIsAuthenticated) {
          setIsAuthenticated(false)
        }
      }
    )()
  }

  useEffect(() => {
    addNavigationListener('beforeRemove', (e) => {
      e.preventDefault()
    })
  }, [])

  return (
    <Container
      style={{
        backgroundColor: '#0f0131',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Title title='Home' />
        <Pressable
          style={{
            backgroundColor: '#ff5858',
            width: 20,
            height: 25,
            margin: 10,
            borderRadius: 4
          }}
          onPress={() => handleLogout()}
        />

      </View>
      <PostsList />
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
          height: 120,
          textAlignVertical: 'top'
        }}
      />
      <Pressable
        style={{
          backgroundColor: 'white',
          padding: 20,
          margin: 2,
          marginHorizontal: 4,
          borderRadius: 4
        }}
        onPress={() => {
          handleNewPost()
          setTitle('')
          setBody('')
        }}
      />
    </Container>
  )
}