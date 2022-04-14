import React from 'react'
import {
  Pressable,
  View
} from 'react-native'
import { supabase } from '../../supabase/supabase'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Container, Title, PostsList, PostCreator } from '../../components/components'

type HomeScreenProp = NativeStackNavigationProp<AuthScreensParams, 'Home'>

export const Home = () => {
  const navigation = useNavigation<HomeScreenProp>()

  function handleLogout() {
    (
      async () => {
        await AsyncStorage.removeItem('uuid')

        const { error } = await supabase.auth.signOut()

        if (!error) {
          navigation.navigate('Login')
        }
      }
    )()
  }

  const user = supabase.auth.user()

  function handleNewPost(title: string, body: string) {
    if (!title || !body) return

    (
      async () => {
        const { error } = await supabase.from('posts').insert([
          { title, body, creator: user?.id, public: true },
        ])

        // TODO: handle error

      }
    )()
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#0f0131',
        alignItems: 'center',
      }}
    >
      <Container>
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
        <PostCreator onSubmit={handleNewPost} />

      </Container>
    </View>
  )
}