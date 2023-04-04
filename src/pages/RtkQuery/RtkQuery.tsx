import { memo, useEffect, useState } from 'react'
import { PostList } from '../../components/PostList'
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetAllPostsQuery,
  useUpdatePostMutation,
} from '../../api/postApi/postApi'
import { PostDTO } from '../../models/Post/Post'

export const RtkQuery = memo(() => {
  const [posts, setPosts] = useState<PostDTO[]>([])

  // Read
  const { data, isLoading } = useGetAllPostsQuery()
  const [deletePost, { isLoading: isPostDeleting }] = useDeletePostMutation()
  const [createPost, { isLoading: isPostCreating }] = useCreatePostMutation()
  const [updatePost, { isLoading: isPostUpdating }] = useUpdatePostMutation()

  useEffect(() => {
    if (data) {
      setPosts(data)
    }
  }, [data])

  // Create
  const handleCreatePostItem = async (body: Omit<PostDTO, 'id'>) => {
    try {
      const response = await createPost(body).unwrap()
      console.log(response)
      setPosts([...posts, response])
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Update
  const handleUpdatePostItem = async (body: PostDTO) => {
    try {
      await updatePost(body).unwrap()
    } catch (e: unknown) {
      console.log(e)
    }
  }

  // Delete
  const handleDeletePostItem = async (id: number) => {
    try {
      await deletePost(id)
      setPosts([...posts.filter((post) => post.id !== id)])
    } catch (e: unknown) {
      console.log(e)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">RtkQuery.</h1>
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

RtkQuery.displayName = 'RtkQuery'
