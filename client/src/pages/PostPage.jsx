import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai'
import Moment from 'react-moment'
import axios from '../utils/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { removePost } from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'
import { createComment, getPostComments } from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()

  const removePostHandler = () => {
    try {
      dispatch(removePost(params.id))
      toast('Пост видалений')
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({ postId, comment }))
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error)
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/routes/posts/${params.id}`)
    setPost(data)
  }, [params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>
        Завантаження...
      </div>
    )
  }

  return (
    <div>
      <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        <Link className='flex' to={'/'}>
          Назад
        </Link>
      </button>

      <div className='flex gap-10 py-8'>
        <div className='w-[60%]'>
          <div className='flex flex-col basis-1/4 flex-grow'>
            <div
              className={
                post.imgUrl ? 'flex rounded-sm h-auto' : 'flex rounded-sm'
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://localhost:3002/${post.imgUrl}`}
                  alt='img'
                  className='object-cover w-full'
                />
              )}
            </div>
          </div>

          <div className='flex justify-between item-center pt-2'>
            <div className='text-xs text-white'>{post.username}</div>
            <div className='text-xs text-white'>
              <Moment date={post.createdAt} format='D MMM YYYY' />
            </div>
          </div>
          <div className='text-xl text-white'>{post.title}</div>
          <p className='text-xs text-white pt-4'>{post.text}</p>

          <div className='flex gap-3 items-center mt-2 justify-between'>
            <div className='flex gap-3 mt-4'>
              <button className='flex ites-center justify-center gap-2 text-xs text-white'>
                <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className='flex items-center justify-center gap-2 text-xs text-white'>
                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
              </button>
            </div>

            {user?._id === post.author && (
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center justify-center gap-2 text-white'>
                  <Link to={`/${params.id}/edit`}>
                    <AiTwotoneEdit />
                  </Link>
                </button>
                <button
                  onClick={removePostHandler}
                  className='flex items-center justify-center text-xs gap-2 text-white'
                >
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Блок з коментарями */}
        <div className='w-full md:w-1/3 ml-auto p-8 bg-gray-600 flex flex-col gap-2 rounded-sm max-h-80 overflow-y-auto'>
          <form className='flex gap-2' onSubmit={(e) => e.preventDefault()}>
            <input
              type='text'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Comment'
              className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none'
            />
            <button
              type='submit'
              onClick={handleSubmit}
              className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
            >
              Додати коментар
            </button>
          </form>
          {comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} />
          ))}
        </div>
      </div>
    </div>
  )
}
