import React from 'react'
import './Home.css'


const Home = () => {
  return (
    <div className='flex flex-col min-w-screen min-h-screen'>
      {/* section0 */}
      <div id="home" className='flex w-full min-h-screen mb-14 section relative'>
        <div className='imageBg absolute h-[108vh] w-full'/>
      </div>
      {/* section1 */}
      <div id='about' className='flex w-full min-h-screen p-3 bg-gray-100 section'>
        About 
      </div>
      {/* section2 */}
      <div id="blog" className='flex w-full min-h-screen p-3 section'>
        Blog
      </div>
      {/* section3 */}
      <div id="contact" className='flex w-full min-h-screen p-3 bg-gray-100 section'>
        Contact Us
      </div>
    </div>
  )
}

export default Home
