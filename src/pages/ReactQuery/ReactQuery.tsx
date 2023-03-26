import { memo, useEffect, useState } from 'react'
import { PostDTO } from '../../models/Post/Post'
import { PostList } from '../../components/PostList'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

const URL = 'https://jsonplaceholder.typicode.com/posts'

export const ReactQuery = memo(() => {
  const [posts, setPosts] = useState<PostDTO[]>([])

  // Read
  const { data, isLoading } = useQuery({
    queryKey: ['postApi'],
    queryFn: () => axios.get(URL).then((res) => res.data),
  })

  const { mutate: createPost, isLoading: isPostCreating } = useMutation({
    mutationFn: async (body: Omit<PostDTO, 'id'>) => {
      const response = await axios.post(URL, JSON.stringify(body), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })

      const data = await response.data

      setPosts([...posts, data])
    },
  })

  const { mutate: deletePost, isLoading: isPostDeleting } = useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`${URL}/${id}`)
      setPosts([...posts.filter((post) => post.id !== id)])
    },
  })

  const { mutate: updatePost, isLoading: isPostUpdating } = useMutation({
    mutationFn: (body: PostDTO) =>
      axios.put(`${URL}/${body.id}`, JSON.stringify(body), {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
  })

  useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data])

  // Create
  const handleCreatePostItem = async (body: Omit<PostDTO, 'id'>) => {
    try {
      await createPost(body)
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Update
  const handleUpdatePostItem = async (body: PostDTO) => {
    try {
      await updatePost(body)
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Delete
  const handleDeletePostItem = async (id: number) => {
    try {
      await deletePost(id)
    } catch (e: unknown) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">ReactQuery.</h1>
      {isLoading && <h1>Loading...</h1>}
      {isPostCreating && <h1>Post creating...</h1>}
      {isPostUpdating && <h1>Post updating...</h1>}
      {isPostDeleting && <h1>Post deleting...</h1>}
      {data && (
        <PostList
          posts={posts}
          onDelete={handleDeletePostItem}
          onUpdate={handleUpdatePostItem}
          onCreate={handleCreatePostItem}
        />
      )}
    </div>
  )
})

ReactQuery.displayName = 'ReactQuery'
