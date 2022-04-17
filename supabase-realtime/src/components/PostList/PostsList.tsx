import React, {
  useState, useEffect
} from 'react'
import {
  View, FlatList
} from 'react-native'
import { Post } from '../../types/Post'
import { User } from '@supabase/supabase-js'
import { PostCard } from '../PostCard/PostCard'
import { supabase } from '../../supabase/supabase'
import { FetchingFeedback } from '../FetchingFeedback/FetchingFeedback'

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
          setPosts(fetchedPosts.reverse())
          setIsLoading(false)
        }
      } catch (e) {
        // TODO: handle error
      }
    }

    const setupSubscription = () => {
      if (!isActive) return

      supabase.from('posts').on('INSERT', payload => {
        setPosts(posts => [payload.new, ...posts])
      }).subscribe()
    }

    fetchData()
    setupSubscription()
    return () => {
      isActive = false
    }
  }, [user])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5
      }}
    >
      {
        (
          posts.length === 0 || isLoading
        ) ?
          // TODO: someday integrate this logic in a single component
          <FetchingFeedback dataLenght={posts.length} isFetching={isLoading} />
          :
          <FlatList
            data={posts}
            keyExtractor={a => a.id}
            ItemSeparatorComponent={() => <View style={{ marginVertical: 2 }} />}
            renderItem={
              ({ item }) => <PostCard {...item} />
            } />
      }

    </View>
  )
}