import React from 'react'
import './Home.css'
import BlogCard from '../components/BlogCard'
// import ContactForm from '../components/ContactForm';
const cardData = [
  {
    title: "Personalized Tours",
    content: "Tailored experiences based on your interests and preferences.",
    qut:"150+",
  },
  {
    title: "Verified Guides",
    content: "Our guides are carefully selected and verified for safety and expertise.",
    qut:"400+",
  },
  {
    title: "Seamless Booking",
    content: "Easy and secure booking process for a hassle-free experience.",
    qut:"20%\nOFF",
  },
];
const blogPosts = [
  {
    title: "The Future of Travel",
    content: "Discover how AI and technology are revolutionizing the travel industry.",
    date: "March 15, 2025",
    author: "John Doe",
    image: "/images/blog1.jpeg",
    likes: 20,
    comments: 5,
    views: 100,
  },
  {
    title: "Top 10 Travel Destinations",
    content: "Explore the most breathtaking places you must visit this year.",
    date: "April 5, 2025",
    author: "Emma Wilson",
    image: "/images/blog2.jpeg",
    likes: 420,
    comments: 15,
    views: 1800,
  },
  {
    title: "Solo Travel Tips",
    content: "How to make the most of your solo adventures while staying safe.",
    date: "May 20, 2025",
    author: "David Smith",
    image: "/images/blog3.jpeg",
    likes: 50,
    comments: 10,
    views: 1000,
  },
];

const Home = () => {
  return (
    <div className='flex flex-col min-w-screen min-h-screen'>
      {/* section0 */}
      <div id="home" className='flex w-full min-h-screen mb-14 section relative flex-col justify-center items-center'>
        <div className='imageBg absolute h-[108vh] w-full' />
        <h1 className='font-extrabold text-4xl z-20 absolute top-[10vh] left-[12vw]'>Discover Your <span className='text-[#FBBB0B]'>Perfect</span> Travel Companion !</h1>
        <h2 className='font-bold text-2xl z-20 absolute top-[25vh] left-[25vw]'>Find Local Guides, Explore Like a Pro !</h2>
        <p className='font-medium text-xl z-20 w-[60%] text-center absolute top-[35vh]  left-[12vw]'>
          Tired of generic travel experiences? Connect with local experts and unlock authentic adventures tailored just for you. Whether you’re looking for hidden gems, cultural experiences, or adventure-packed itineraries, our platform helps you find the perfect guide to make your journey unforgettable.
        </p>
        <button className='btn z-20 bottom-[15vh] absolute text-center font-bold'>
          Explore Now!
        </button>
      </div>
      {/* section1 */}
      <div className="text-center w-full min-h-screen section p-10" id = "about">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          Our platform connects tourists with experienced local guides, ensuring an
          authentic and enriching travel experience. Whether you seek adventure,
          history, or cultural immersion, our trusted guides are here to make your
          journey unforgettable.
        </p>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {/* Cards */}
          {cardData.map((card, index) => (
            <div key={index} className="parent">
            <div className="cards">
              <div className="content-box">
                <span className="card-title">{card.title}</span>
                <p className="card-content">{card.content}</p>
                <span className="see-more">See More</span>
              </div>
              <div className="date-box flex justify-center items-center">
                <span className="qut">{card.qut}</span>
              </div>
            </div>
          </div>
          ))}
        </div>
      </div>
      {/* section2 */}
      <div className="px-6 py-12 flex flex-col justify-center items-center w-full min-h-screen bg-[#f9e19d] gap-7" id='blog'>
      <h2 className="text-3xl font-bold text-center mb-16">Latest Blog Posts</h2>
      <div className="flex justify-between items-center px-10 z-10 w-full">
        {blogPosts.map((post, index) => (
          <BlogCard 
          key={index} 
          title={post.title} 
          content={post.content} 
          date={post.date} 
          author={post.author} 
          image={post.image} 
          likes={post.likes} 
          comments={post.comments} 
          views={post.views} 
          />
        ))}
      </div>
      <button className='btn mt-7'>
        More Blogs
      </button>
    </div>
      {/* section3 */}
      <div id="contact" className='flex flex-col w-full min-h-screen p-3 text-centre section mt-10'>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center  ">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-center">
          Have questions? Whether you're a traveler looking for a guide or a local guide wanting to connect, we're here to help!
        </p>

        <div className="flex flex-col md:flex-row justify-around gap-8">
          {/* Contact Form */}
          {/* <ContactForm /> */}
          {/* Contact Details */}
          <div className="text-left space-y-4 pt-10">
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold">📞 Phone:</span>
              <span className="text-gray-700">+1 (XXX) XXX-XXXX</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold">📧 Email:</span>
              <span className="text-gray-700">support@yourprojectname.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold">📍 Location:</span>
              <span className="text-gray-700">[Your Address]</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-xl font-semibold">📲 Follow Us:</span>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-500 hover:text-blue-700">Facebook</a>
                <a href="#" className="text-pink-500 hover:text-pink-700">Instagram</a>
                <a href="#" className="text-blue-400 hover:text-blue-600">Twitter</a>
                <a href="#" className="text-blue-600 hover:text-blue-800">LinkedIn</a>
              </div>
            </div>
          </div>
          {/* <div className="bg-white p-6 rounded-lg shadow-md">
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input type="text" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" placeholder="Your Name" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input type="email" className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" placeholder="Your Email" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200" rows="4" placeholder="Your Message"></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Home
