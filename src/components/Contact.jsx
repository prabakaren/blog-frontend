import React from 'react'
import Footer from './common/Footer'

function Contact() {
  return (
    <div className="pt-14">
      <div className="max-w-3xl mx-auto px-4 mb-14">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Get in <span className="text-orange-400">Touch</span></h2>
        <p className="mb-4 text-gray-700 leading-7">
          Have a project in mind or want to say hello? Send me an email and I will reply as soon as I can.
        </p>
        <a href="mailto:hello@example.com" className="button-style inline-block">hello@example.com</a>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
