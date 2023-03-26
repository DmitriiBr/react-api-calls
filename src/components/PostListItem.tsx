import React, { memo, useState } from 'react'
import { PostDTO } from '../models/Post/Post'

interface Props extends Pick<PostDTO, 'title' | 'id'> {
  onUpdate: (body: PostDTO) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export const PostListItem = memo(({ id, title, onDelete, onUpdate }: Props) => {
  const [edit, setEdit] = useState(false)
  const [postTitle, setPostTitle] = useState(title)

  const handleStartEdit = () => setEdit(true)
  const handleSave = async () => {
    await onUpdate({
      id,
      title: postTitle,
      body: 'Changed body.',
      userId: 1,
    })
    setEdit(false)
  }

  return (
    <li className="mb-4 flex justify-between items-center">
      <div className="w-full flex items-center h-full">
        <b>{id}.&nbsp;</b>
        {edit ? (
          <input
            className="w-full border rounded border-gray-500 px-2 py-1 mr-2"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
        ) : (
          <>{postTitle}</>
        )}
      </div>
      <div className="w-1/6 flex justify-between">
        {edit ? (
          <button
            className="border rounded border-gray-500 px-2 py-1 w-full bg-yellow-300"
            onClick={handleSave}
          >
            save
          </button>
        ) : (
          <button
            className="border rounded border-gray-500 px-2 py-1 w-full bg-green-300"
            onClick={handleStartEdit}
          >
            edit
          </button>
        )}
        <button
          className="border rounded border-gray-500 px-2 py-1 ml-2 bg-red-300"
          onClick={() => onDelete(id)}
        >
          delete
        </button>
      </div>
    </li>
  )
})

PostListItem.displayName = 'PostListItem'
