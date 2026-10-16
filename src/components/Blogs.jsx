import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Footer from './common/Footer';

export function formatDate(value) {
    return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, loading: authLoading } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();

    // wait for Firebase to finish checking the session so "liked" shows correctly
    useEffect(() => {
        if (authLoading) return;
        window.scrollTo(0, 0);
        api.get('/api/blogs')
            .then((res) => setBlogs(res.data))
            .catch((err) => setError(getErrorMessage(err, 'Could not load blogs')))
            .finally(() => setLoading(false));
    }, [authLoading, user]);

    const handleLike = async (id) => {
        if (!user) {
            showToast('Please log in to like a blog', 'error');
            navigate('/login', { state: { from: '/blogs' } });
            return;
        }
        try {
            const { data } = await api.patch(`/api/blogs/${id}/like`);
            setBlogs((prev) => prev.map((b) => (b._id === id ? data : b)));
        } catch (err) {
            showToast(getErrorMessage(err, 'Could not update like'), 'error');
        }
    };

    return (
        <div className="blog-section py-14">
            <h2 className="text-center text-5xl font-bold mb-14">Latest <span className='text-orange-400'>Blogs</span></h2>

            {loading && <p className="text-center text-gray-500">Loading blogs...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {!loading && !error && blogs.length === 0 && (
                <p className="text-center text-gray-500">No blogs yet. Check back soon.</p>
            )}

            <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4 mb-14">
                {blogs.map((blog) => (
                    <div key={blog._id} className="blog-post p-6 bg-white shadow-lg rounded-lg flex flex-col">
                        <Link to={`/blogs/${blog._id}`} className="blog-title font-semibold text-2xl text-gray-800 mb-1 hover:text-orange-500">
                            {blog.title}
                        </Link>
                        <p className="blog-date text-gray-400 text-sm mb-4">{formatDate(blog.createdAt)}</p>
                        <p className="blog-content text-gray-600 mb-4">
                            {blog.content.length > 180 ? blog.content.slice(0, 180) + '...' : blog.content}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                            <div>
                                <span
                                    className={`cursor-pointer ${blog.liked ? 'text-orange-500 font-semibold' : 'text-blue-500'}`}
                                    onClick={() => handleLike(blog._id)}
                                >
                                    {blog.liked ? 'Liked' : 'Like'}
                                </span>
                                <span className="ml-2">{blog.likes} Likes</span>
                            </div>
                            <Link to={`/blogs/${blog._id}`} className="text-sm text-gray-500 hover:text-orange-500">Read more</Link>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
}

export default Blogs
