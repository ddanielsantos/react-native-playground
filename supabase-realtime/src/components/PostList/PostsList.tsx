import React, {
  useState, useEffect
} from 'react'
import {
  View, FlatList, Text
} from 'react-native'
import { Post } from '../../types/Post'
import { User } from '@supabase/supabase-js'
import { PostCard } from '../PostCard/PostCard'
import { supabase } from '../../supabase/supabase'

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    let isActive = true

    setUser(supabase.auth.user())

    const fetchData = async () => {
      try {
        const { data: fetchedPosts } = await supabase.from('posts').select('*')

        if (isActive && fetchedPosts) {
          setPosts(fetchedPosts)
          setIsLoading(false)
        }
      } catch (e) {
        // TODO: Handle error
      }
    }

    fetchData();

    return () => {
      isActive = false
    }
  }, [user])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center'
      }}
    >
      {
        isLoading ? (
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              color: 'white'
            }}
          >Loading...</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={a => String(a.id)}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 2 }} />}
            renderItem={
              ({ item }) => <PostCard {...item} />
            }
          />
        )
      }

    </View>
  )
}