import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import { toast } from 'react-toastify'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() =>{
    if(status) toast(status)
    if(isAuth) navigate('/')
  }, [status, isAuth, navigate])

  const handleSubmit = () => {
    try{
      dispatch(loginUser({username, password}))
      navigate('/')
    }catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={e => e.preventDefault()}
      className='w-1/4 h-60 mx-auto mt-40'
      >
          <h1 className='text-lg text-white text-center'>Авторизація</h1>
          <label className='text-xs text-gray-300'>
            Username:
            <input type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className='mt-1 text-black w-full rounded-lg bd-gray-300 border py-1 px-2 text-xs outline-none'
            />
          </label>

          <label className='text-xs text-gray-300'>
            Password:
            <input type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='mt-1 text-black w-full rounded-lg bd-gray-300 border py-1 px-2 text-xs outline-none'
            />
          </label>

          <div className='flex gap-8 justify-center mt-4'>
            <button type='submit'
            onClick={handleSubmit}
            className='flex justify-center items-center text-x bg-gray-700 text-white rounded-sm py-2 px-4'
            >Ввійти</button>
            <Link to='/register'
                className='flex justify-center items-center text-x bg-gray-700 text-white py-2 px-4'
            >Немає акаунту</Link>
          </div>
    </form>
  )
}
