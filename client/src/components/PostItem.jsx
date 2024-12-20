import React from 'react'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

export const PostItem = ({ post }) => {
    if(!post){
        return (
          <div className='text-xl text-center text-white py-10'>
              Завантаження...
          </div>
        )
    }
  return (
    <Link to={`/${post._id}`}>
        <div className='flex flex-col basis-1/4 flex-grow'>
            <div className={
                post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
            }>
                {post.imgUrl && (
                    <img src={`http://localhost:3002/${post.imgUrl}`} alt='img' className='object-cover w-full' />
                )}
            </div>
            <div className='flex justify-between item-center pt-2'>
                <div className='text-xs text-white'>{post.username}</div>
                <div className='text-xs text-white'>
                    <Moment data={post.createdAt} format='D MMM YYYY'/>
                </div>
            </div>
            <div className='text-xl text-white'>{post.title}</div>
            <p className='text-xs text-white pt-4 line-clamp-1'>{post.text}</p>

            <div className='flex gap-3 items-center mt-2'>
                <button className='flex ites-center justify-center gap-2 text-xs text-white'>
                    <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className='flex ites-center justify-center gap-2 text-xs text-white'></button>
                    <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
            </div>
        </div>
    </Link>
  )
}
