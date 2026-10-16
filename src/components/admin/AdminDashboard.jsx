import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api, { getErrorMessage } from '../../api/api'
import { useToast } from '../../context/ToastContext'
import { formatDate } from '../Blogs'

function AdminDashboard() {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const { showToast } = useToast()

    useEffect(() => {
        api.get('/api/blogs')
            .then((res) => setBlogs(res.data))
            .catch((err) => setError(getErrorMessage(err, 'Could not load blogs')))
            .finally(() => setLoading(false))
    }, [])

    const handleDelete = async (blog) => {
        if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return
        try {
            await api.delete(`/api/blogs/${blog._id}`)
            setBlogs((prev) => prev.filter((b) => b._id !== blog._id))
            showToast('Blog deleted')
        } catch (err) {
            showToast(getErrorMessage(err, 'Could not delete the blog'), 'error')
        }
    }

    return (
        <div className="py-10 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold">Admin <span className="text-orange-400">Panel</span></h2>
                <Link to="/admin/new" className="button-style">+ New Blog</Link>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && blogs.length === 0 && (
                <p className="text-gray-500">No blogs yet. Create your first one.</p>
            )}

            {blogs.length > 0 && (
                <div className="overflow-x-auto border rounded-lg">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 text-gray-600 text-sm">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3 hidden sm:table-cell">Date</th>
                                <th className="p-3">Likes</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map((blog) => (
                                <tr key={blog._id} className="border-t">
                                    <td className="p-3 font-medium">{blog.title}</td>
                                    <td className="p-3 text-gray-500 hidden sm:table-cell">{formatDate(blog.createdAt)}</td>
                                    <td className="p-3">{blog.likes}</td>
                                    <td className="p-3 text-right whitespace-nowrap">
                                        <Link to={`/blogs/${blog._id}`} className="text-blue-500 mr-4">View</Link>
                                        <Link to={`/admin/edit/${blog._id}`} className="text-orange-500 mr-4">Edit</Link>
                                        <button onClick={() => handleDelete(blog)} className="text-red-500">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default AdminDashboard
