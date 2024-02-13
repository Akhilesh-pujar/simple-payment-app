import React from 'react'
import Navbar from './Navbar'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex justify-center items-center h-10 mt-40'>
      <h1 className='text-xl font-semibold font-sans text-gray-700'> Welcome to Simple 
      <span className=' text-indigo-400 px-3'>: Pay-tm APP</span> </h1>
      </div>
      <p className='flex justify-center items-center text-balance font-light text-gray-700'> Please signup to use the app</p>
      
    </div>
  )
}

export default Home