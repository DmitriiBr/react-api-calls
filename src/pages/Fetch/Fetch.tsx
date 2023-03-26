import { memo, useEffect, useState } from 'react'
import { PostList } from '../../components/PostList'
import { PostDTO } from '../../models/Post/Post'

const URL = 'https://jsonplaceholder.typicode.com/posts'

export const Fetch = memo(() => {
  const [posts, setPosts] = useState<PostDTO[]>([])

  // Read
  useEffect(() => {
    void (async () => {
      const response = await fetch(URL)
      const data = await response.json()

      setPosts(data)
    })()
  }, [])

  // Create
  const handleCreatePostItem = async (body: Omit<PostDTO, 'id'>) => {
    try {
      const response = await fetch(URL, {
        method: 'POSt',
        body: JSON.stringify({
          ...body,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await response.json()

      setPosts([...posts, data])
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Update
  const handleUpdatePostItem = async (id: number, body: PostDTO) => {
    try {
      await fetch(`${URL}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
          ...body,
        }),
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
      await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      })

      setPosts([...posts.filter((post) => post.id !== id)])
    } catch (e: unknown) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Fetch</h1>
      <PostList
        posts={posts}
        onDelete={handleDeletePostItem}
        onUpdate={handleUpdatePostItem}
        onCreate={handleCreatePostItem}
      />
    </div>
  )
})

Fetch.displayName = 'Fetch'
