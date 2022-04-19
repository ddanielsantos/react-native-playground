import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import {
  Pressable,
  View,
  Text
} from 'react-native'
import { supabase } from '../../supabase/supabase'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { AuthScreensParams } from '../../routes/AuthRoute'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useToast } from 'react-native-toast-notifications'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { removeSessionFromStorage } from '../../helpers/asyncStorageHelpers'
import { Container, Title, PostsList, TextInput } from '../../components/components'

type HomeScreenProp = NativeStackNavigationProp<AuthScreensParams, 'Home'>

export const Home = () => {
  const { setIsAuthenticated } = useContext(AuthContext)
  const { addListener: addNavigationListener } = useNavigation<HomeScreenProp>()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const toast = useToast()

  const { id: userId } = supabase.auth.user() || { id: '' }

  async function handleNewPost() {
    if (!title || !body) {
      toast.show('Please fill in all fields', {
        duration: 2000,
        animationType: 'slide-in',
        animationDuration: 300,
        swipeEnabled: true,
        placement: 'top',
        type: 'danger'
      })
      return
    }

    const { error } = await supabase.from('posts').insert([
      { title, body, creator_id: userId, is_public: true },
    ])

    if (error) {
      toast.show('Something went wrong', {
        duration: 2000,
        animationType: 'slide-in',
        animationDuration: 300,
        swipeEnabled: true,
        placement: 'top',
        type: 'danger'
      })
    }

    if (!error) {
      setTitle('')
      setBody('')
    }
  }

  async function handleLogout() {
    const { error } = await removeSessionFromStorage()
    const { error: supabaseError } = await supabase.auth.signOut()

    if (!error && !supabaseError) {
      setIsAuthenticated(false)
    }
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
            margin: 10,
            borderRadius: 4
          }}
          onPress={() => handleLogout()}
        >
          <MaterialCommunityIcons name="logout" size={24} color="red" />
        </Pressable>

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
          padding: 15,
          margin: 2,
          marginHorizontal: 4,
          borderRadius: 4
        }}
        onPress={() => handleNewPost()}
      >
        <Text
          style={{
            textAlign: 'center'
          }}
        >
          Send Post
        </Text>
      </Pressable>
    </Container>
  )
}