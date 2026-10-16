import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api, { getErrorMessage } from '../../api/api'
import { useToast } from '../../context/ToastContext'

// Used for both "new blog" (no id in the url) and "edit blog" (/admin/edit/:id)
function BlogForm() {
    const { id } = useParams()
    const isEdit = Boolean(id)
    const navigate = useNavigate()
    const { showToast } = useToast()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(isEdit)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isEdit) return
        api.get(`/api/blogs/${id}`)
            .then(({ data }) => {
                setTitle(data.title)
                setContent(data.content)
            })
            .catch((err) => setError(getErrorMessage(err, 'Could not load this blog')))
            .finally(() => setLoading(false))
    }, [id, isEdit])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setSaving(true)
        try {
            if (isEdit) {
                await api.put(`/api/blogs/${id}`, { title, content })
                showToast('Blog updated')
            } else {
                await api.post('/api/blogs', { title, content })
                showToast('Blog published')
            }
            navigate('/admin')
        } catch (err) {
            setError(getErrorMessage(err, 'Could not save the blog'))
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <p className="text-center py-20 text-gray-500">Loading...</p>

    return (
        <div className="py-10 max-w-3xl mx-auto">
            <Link to="/admin" className="text-orange-500 text-sm">&larr; Back to admin panel</Link>
            <h2 className="text-3xl font-bold mt-3 mb-6">{isEdit ? 'Edit Blog' : 'New Blog'}</h2>

            {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={150}
                    className="p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="p-2 border rounded"
                    rows="12"
                    required
                />
                <div>
                    <button
                        type="submit"
                        disabled={saving}
                        className="bg-orange-400 text-white py-2 px-6 rounded hover:bg-orange-600 disabled:opacity-60"
                    >
                        {saving ? 'Saving...' : isEdit ? 'Update Blog' : 'Publish Blog'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default BlogForm
