import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getAllPosts } from '../redux/features/post/postSlice'
import { PostItem } from '../components/PostItem'
import { PopularPosts } from '../components/PopularPosts'

export const MainPage = () => {

  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if(!posts.length){
    return(
      <div className='text-xl text-center text-white py-10'>
          Постів немає
      </div>
    )
  }
  
  return (  
    <div className='max-w-[900px] mx-auto py-10'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col gap-10 basis-4/5'>
          {
            posts?.map((post, idx) =>(
              <PostItem key={idx} post={post} />
            ))
          }
        </div>
        <div className="basis-1/5">
          <div className='text-xs uppercase text-white'>Популярні пости</div>
          {
            popularPosts?.map((post, idx) => ( <PopularPosts key={idx} post={post} />))
          }
        </div>
      </div>
    </div>
  )
}
