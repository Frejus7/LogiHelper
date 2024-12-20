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
        toast('Вы вышли из системы')
    }

    return (
        <div className='flex py-4 justify-between items-center'>
            <span className='flex justify-center items-center rounded-sm'>
            </span>

            {isAuth && (
                <ul className='flex gap-8'>
                    <li>
                        <NavLink
                            to={'/'}
                            href='/'
                            className='text-x text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Головна
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
                            className='text-x text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мої пости
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
                            className='text-x text-gray-400 hover:text-white'
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Додати пост
                        </NavLink>
                    </li>
                </ul>
            )}

            <div className='flex justify-center items-center bg-gray-600 text-x text-white rounded-sm px-4 py-2'>
                {isAuth ? (
                    <button onClick={logoutHandler}>Вийти</button>
                ) : (
                    <Link to={'/login'}> Ввійти </Link>
                )}
            </div>
        </div>
    )
}