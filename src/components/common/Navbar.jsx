import React from 'react'
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

function Navbar() {
    const navigate = useNavigate()
    const { user, isAdmin, logout } = useAuth()
    const { showToast } = useToast()

    const handleLogout = async () => {
        await logout()
        showToast('You have been logged out')
        navigate('/home')
    }

    return (
        <div className='py-5 flex flex-wrap justify-between items-center gap-y-3'>
            <h2 className='text-2xl font-bold'>Personal</h2>
            <div className='flex flex-wrap items-center gap-y-2'>
                <Link className='px-4' to="/home">Home</Link>
                <Link className='px-4' to="/blogs">Blogs</Link>
                <Link className='px-4' to="/about">About</Link>
                <Link className='px-4' to="/contact">Contact</Link>
                {isAdmin && <Link className='px-4 font-semibold text-orange-500' to="/admin">Admin</Link>}

                {user ? (
                    <>
                        <span className='px-3 text-sm text-gray-500 hidden md:inline'>{user.displayName || user.email}</span>
                        <button className='button-style' onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link className='px-4' to="/signup">Sign up</Link>
                        <button className='button-style' onClick={() => navigate("/login")}>Login</button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
