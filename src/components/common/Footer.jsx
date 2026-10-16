import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center">
        <p className="text-center">© {new Date().getFullYear()} Jacky Thomas. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
