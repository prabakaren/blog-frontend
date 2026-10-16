import React from 'react'
import Footer from './common/Footer'

function About() {
  return (
    <div className="pt-14">
      <div className="max-w-3xl mx-auto px-4 mb-14">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-orange-400">Me</span></h2>
        <p className="mb-4 text-gray-700 leading-7">
          I am Jacky Thomas, a web developer who builds websites with React, Node.js and MongoDB.
          I started this blog to write down what I learn while building real projects.
        </p>
        <p className="text-gray-700 leading-7">
          You will find posts about the MERN stack, authentication, deployment and the small mistakes
          that cost me hours so they do not cost you the same.
        </p>
      </div>
      <Footer />
    </div>
  )
}

export default About
