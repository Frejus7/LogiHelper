import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {

  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyles = {
    color: 'white',
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Ви вийшли з акаунту')
  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-x text-white rounded-sm'>E
      </span>

      {isAuth && (
         <ul className='flex gap-8'>
         <li>
           <NavLink
             to={'/'}
            href="/" className='text-x text-gray-400 hover:text-white'
            ></NavLink>
         </li>
         <li>
           <NavLink
           to={'/'}
            href="/" className='text-x text-gray-400 hover:text-white'
            >Головна</NavLink>
         </li>
         <li>
           <NavLink
           to={'posts'}
            href="/" className='text-x text-gray-400 hover:text-white'
            >Мої пости</NavLink>
         </li>
         <li>
           <NavLink
           to={'/new'}
            href="/" className='text-x text-gray-400 hover:text-white'
            >Додати пост</NavLink>
         </li>
       </ul>
      )

      }
    <div className='flex justify-center items-center bg-gray-600 text-x text-white rounded-sm px-4 py-1'>
      {isAuth ? <button onClick={logoutHandler}>Вийти</button> : <Link to={'/login'} > Ввійти </Link>}
    </div>
    </div>
  )
}
