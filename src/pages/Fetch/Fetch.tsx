import { memo, useEffect, useState } from 'react'
import { PostList } from '../../components/PostList'
import { PostDTO } from '../../models/Post/Post'

const URL = 'https://jsonplaceholder.typicode.com/posts'

const initialStatusState = {
  isLoading: false,
  isPostDeleting: false,
  isPostCreating: false,
  isPostUpdating: false,
}

export const Fetch = memo(() => {
  const [posts, setPosts] = useState<PostDTO[]>([])
  const [status, setStatus] = useState(initialStatusState)

  // Read
  useEffect(() => {
    void (async () => {
      setStatus({ ...status, isLoading: true })

      const response = await fetch(URL)
      const data = await response.json()

      setStatus({ ...status, isLoading: false })
      setPosts(data)
    })()
  }, [])

  // Create
  const handleCreatePostItem = async (body: Omit<PostDTO, 'id'>) => {
    try {
      setStatus({ ...status, isPostCreating: true })

      const response = await fetch(URL, {
        method: 'POSt',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const data = await response.json()

      setStatus({ ...status, isPostCreating: false })
      setPosts([...posts, data])
    } catch (e: unknown) {
      setStatus({ ...status, isPostCreating: false })
      console.log(e)
    }
  }

  // Update
  const handleUpdatePostItem = async (body: PostDTO) => {
    try {
      setStatus({ ...status, isPostUpdating: true })

      await fetch(`${URL}/${body.id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      setStatus({ ...status, isPostUpdating: false })
    } catch (e: unknown) {
      setStatus({ ...status, isPostUpdating: false })
      console.log(e)
    }
  }

  // Delete
  const handleDeletePostItem = async (id: number) => {
    try {
      setStatus({ ...status, isPostDeleting: true })

      await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      })

      setStatus({ ...status, isPostDeleting: false })
      setPosts([...posts.filter((post) => post.id !== id)])
    } catch (e: unknown) {
      setStatus({ ...status, isPostDeleting: false })
      console.log(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Fetch</h1>
      {status.isLoading && <h1>Loading...</h1>}
      {status.isPostCreating && <h1>Post creating...</h1>}
      {status.isPostUpdating && <h1>Post updating...</h1>}
      {status.isPostDeleting && <h1>Post deleting...</h1>}
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
