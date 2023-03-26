import { memo, useEffect, useState } from 'react'
import axios from 'axios'
import { PostList } from '../../components/PostList'
import { PostDTO } from '../../models/Post/Post'

const URL = 'https://jsonplaceholder.typicode.com/posts'

export const Axios = memo(() => {
  const [posts, setPosts] = useState<PostDTO[]>([])

  // Read
  useEffect(() => {
    void (async () => {
      const response = await axios.get(URL)
      const data = await response.data

      setPosts(data)
    })()
  }, [])

  // Create
  const handleCreatePostItem = async (body: Omit<PostDTO, 'id'>) => {
    try {
      const response = await axios.post(URL, JSON.stringify(body), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await response.data

      setPosts([...posts, data])
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Update
  const handleUpdatePostItem = async (body: PostDTO) => {
    try {
      await axios.put(`${URL}/${body.id}`, JSON.stringify(body), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Delete
  const handleDeletePostItem = async (id: number) => {
    try {
      await axios.delete(`${URL}/${id}`)
      setPosts([...posts.filter((post) => post.id !== id)])
    } catch (e: unknown) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Axios</h1>
      <PostList
        posts={posts}
        onDelete={handleDeletePostItem}
        onUpdate={handleUpdatePostItem}
        onCreate={handleCreatePostItem}
      />
    </div>
  )
})

Axios.displayName = 'Axios'
