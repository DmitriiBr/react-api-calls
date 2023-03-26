import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { PostDTO } from '../../models/Post/Post'

const baseUrl = 'https://jsonplaceholder.typicode.com'

export const postApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ['postApi'],
  reducerPath: 'postApi',
  endpoints: (builder) => ({
    getAllPosts: builder.query<PostDTO[], void>({
      query: () => ({
        url: '/posts',
      }),
    }),
    updatePost: builder.mutation<PostDTO, PostDTO>({
      query: (body) => ({
        url: `/posts/${body.id}`,
        method: 'PUT',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    createPost: builder.mutation<PostDTO, Omit<PostDTO, 'id'>>({
      query: (body) => ({
        url: '/posts',
        method: 'POST',
        body,
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }),
    }),
  }),
})
