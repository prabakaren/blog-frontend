import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api, { getErrorMessage } from '../api/api'
import { useAuth } from '../context/AuthContext'
import { formatDate } from './Blogs'
import Footer from './common/Footer'

function BlogDetail() {
    const { id } = useParams()
    const { loading: authLoading, user } = useAuth()
    const [blog, setBlog] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        if (authLoading) return
        window.scrollTo(0, 0)
        api.get(`/api/blogs/${id}`)
            .then((res) => setBlog(res.data))
            .catch((err) => setError(getErrorMessage(err, 'Could not load this blog')))
    }, [id, authLoading, user])

    if (error) {
        return (
            <div className="text-center py-20">
                <p className="text-red-500 mb-4">{error}</p>
                <Link to="/blogs" className="button-style">Back to Blogs</Link>
            </div>
        )
    }

    if (!blog) return <p className="text-center py-20 text-gray-500">Loading...</p>

    return (
        <div className="py-14">
            <article className="max-w-3xl mx-auto px-4 mb-14">
                <Link to="/blogs" className="text-orange-500 text-sm">&larr; All blogs</Link>
                <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-3">{blog.title}</h1>
                <p className="text-gray-400 text-sm mb-8">
                    {formatDate(blog.createdAt)} &middot; by {blog.author} &middot; {blog.likes} Likes
                </p>
                <p className="text-gray-700 leading-7 whitespace-pre-line">{blog.content}</p>
            </article>
            <Footer />
        </div>
    )
}

export default BlogDetail
