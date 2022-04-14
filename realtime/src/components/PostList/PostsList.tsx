import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabase/supabase'
import { View, FlatList, Text } from 'react-native'

type Post = {
  id: string,
  creator: string,
  title: string,
  body: string
}

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [, setFetching] = useState(false)

  const userId = supabase.auth.user()?.id

  const fetchPosts = async () => {
    setFetching(true)

    const { data, error } = await supabase.from('posts').select('*')

    if (!error) {
      setPosts(data.reverse())
    }

    setFetching(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    supabase
      .from('posts')
      .on('INSERT', payload => {
        const { new: newPost } = payload as unknown as { new: Post }

        setPosts(posts => [newPost, ...posts])
      })
      .subscribe()
  }, [])

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={a => a.id}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 2 }} />}
        renderItem={
          ({ item }) => {
            return (
              <View
                key={item.id}
                style={{
                  backgroundColor: '#1a0057',
                  padding: 10,
                  borderRadius: 4,
                  marginHorizontal: 5
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: 'white',
                      fontStyle: 'italic'
                    }}
                  >
                    {item.title}
                  </Text>

                  <Text
                    style={{
                      fontSize: 12,
                      textAlign: 'right',
                      color: 'white',
                      marginLeft: 10,
                      opacity: 0.5
                    }}
                  >
                    {item.creator === userId ? 'You' : 'Someone else'}
                  </Text>
                </View>

                <Text
                  style={{
                    color: 'white',
                    marginTop: 10
                  }}
                >
                  {item.body}
                </Text>
              </View>
            )
          }
        }
      />

    </View>
  )
}