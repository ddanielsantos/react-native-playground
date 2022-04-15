import React, {
  useEffect, useContext
} from 'react'
import { Pressable, View } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { AuthContext } from '../../routes/AuthRoute'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Container, Title, PostsList, PostForm } from '../../components/components'

type HomeScreenProp = NativeStackNavigationProp<AuthScreensParams, 'Home'>

export const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const { addListener: addNavigationListener } = useNavigation<HomeScreenProp>()

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

  const { id: userId } = supabase.auth.user() || { id: '' }

  function handleNewPost(title: string, body: string) {
    if (!title || !body) return

    (
      async () => {
        const { error } = await supabase.from('posts').insert([
          { title, body, creator: userId, public: true },
        ])

        // TODO: handle error
        if (error) {
          alert(error.message)
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
        <PostForm onSubmit={handleNewPost} />

      </Container>
    </View>
  )
}