import React from 'react'
import { View, Text } from 'react-native'
import { supabase } from '../../supabase/supabase'
import { Post } from '../../types/Post'

export const PostCard = (item: Post) => {
  const { id: userId } = supabase.auth.user() || { id: '' }

  return (
    <View
      key={item.id}
      style={{
        backgroundColor: '#1a0057',
        padding: 10,
        borderRadius: 4,
        // marginHorizontal: 5
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