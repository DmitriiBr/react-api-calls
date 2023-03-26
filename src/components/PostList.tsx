import { memo } from 'react'
import { PostDTO } from '../models/Post/Post'
import { PostListItem } from './PostListItem'

interface Props {
  posts: PostDTO[]
  onDelete: (id: number) => Promise<void>
  onUpdate: (body: PostDTO) => Promise<void>
  onCreate: (body: Omit<PostDTO, 'id'>) => Promise<void>
}

export const PostList = memo(
  ({ posts, onDelete, onUpdate, onCreate }: Props) => {
    return (
      <>
        <button
          className="border rounded border-gray-500 px-2 py-1 w-full bg-blue-300 mb-4"
          onClick={() =>
            onCreate({
              body: 'new Body',
              userId: 1,
              title: 'Newly created element',
            })
          }
        >
          Create
        </button>
        <ul>
          {posts &&
            posts.map(({ id, title }) => (
              <PostListItem
                id={id}
                title={title}
                key={id}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))}
        </ul>
      </>
    )
  }
)

PostList.displayName = 'PostList'
