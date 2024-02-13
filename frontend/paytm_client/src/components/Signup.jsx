import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

const Signup = () => {
 const history = useNavigate();

  const [username, setemail] = useState("");
  const [firstname, setfirstName] = useState("");
  const [password, setPassword] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = async(e)=>{
   e.preventDefault();
   
    await axios.post("http://localhost:3000/api/v1/user/signup",{
      username, firstname, lastname,password
     })
     .then((response)=>{
        toast.success(response.data.message,{
          position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
         })
       localStorage.setItem("token" , response.data.token)
      
     
     history("/signin")
     })
   
   .catch(error =>{
    toast.error(error.response.data.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
   })


  }
  return (
    <div className=' w-full h-screen flex justify-center items-center bg-gray-700 '>
      <div className=' w-full max-w-md mx-auto bg-white dark:bg-gray-800 shadow-md rounded-xl p-6'>
        <div className='text-center'>
          <h2 className='text-2xl font-light text-gray-800 dark:text-white'>Sign up</h2>
           <p className=' text-gray-500 mt-2'>Please Enter Your Credesntials Properly</p>
 

          <form >
            <div className='mt-8'>
              <div className='flex flex-col space-y-4'>
                <div>
                <input
                className='flex h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 p-3 w-full bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500
                 dark:focus:border-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-600'
                type='username' placeholder='Enter your valid Email'
                onChange={(e)=>{setemail(e.target.value)}}
                />
                </div>
              </div>


              <div className='flex flex-col space-y-4'>
                <div>
                <input
                className='flex h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 p-3 w-full bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500
                 dark:focus:border-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-600'
                 type='text' placeholder='Enter your full name'
                 onChange={(e)=>{setfirstName(e.target.value)}}
                 />

                </div>
              </div>
              <div className='flex flex-col space-y-4'>
                <div>
                <input
                className='flex h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 p-3 w-full bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500
                 dark:focus:border-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-600'
                 type='text' placeholder='Enter your last name'
                 onChange={(e)=>{setLastname(e.target.value)}}
                 />

                </div>
              </div>


              <div className='flex flex-col space-y-4'>
                <div>
                <input 
                 className='flex h-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2 p-3 w-full bg-gray-100 dark:bg-gray-700 rounded-md border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:bg-white dark:focus:bg-gray-600 '
                type='password' placeholder='Enter your password'
                
                onChange={(e)=>{setPassword(e.target.value)}}
                />
                </div>
             


              </div>
              
              
       
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:underline mt-4" href="/signin">
             Already have an account? Log In
            </a>
        </div>
        <button
        className="inline-flex items-center justify-center font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-md"
        type="submit"
        onClick={handleSubmit}
      >
       Sign Up
      </button>

      </form>
        </div>
      </div>
     
    </div>
  )
}

export default Signup