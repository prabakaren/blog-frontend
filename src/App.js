import Home from "./components/Home";
import Blogs from "./components/Blogs";
import BlogDetail from "./components/BlogDetail";
import About from "./components/About";
import Contact from "./components/Contact";
import Navbar from "./components/common/Navbar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import BlogForm from "./components/admin/BlogForm";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <div className="px-10 bg-white border rounded-md">
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* admin only */}
              <Route path="/admin" element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/new" element={<ProtectedRoute adminOnly><BlogForm /></ProtectedRoute>} />
              <Route path="/admin/edit/:id" element={<ProtectedRoute adminOnly><BlogForm /></ProtectedRoute>} />

              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
