import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState, firstNameState, lastNameState, passwordState } from "../states";
import Loader from "../components/Loader";
import axios from "axios"
import {toast} from "react-toastify"

export default function Signup() {
    
    const navigate = useNavigate();

    const [username, setUsername] = useRecoilState(usernameState);
    const [firstname, setFirstName] = useRecoilState(firstNameState);
    const [lastname, setLastName] = useRecoilState(lastNameState);
    const [password, setPassword] = useRecoilState(passwordState);

    const [showLoader, setShowLoader] = useState(false);

    async function handleSignup(e) {
        e.preventDefault();
   
            await axios.post("https://simple-payment-app.vercel.app/api/v1/user/signup",{
              username, firstname, lastname,password
             })
             .then((response)=>{

            localStorage.setItem("myToken", response.data.token);
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
             navigate("/signin");
            

            
             })
           
             .catch(e=>{
               console.log("error while creating user:",e)
              })
     
    }

    function navigateToSignin(){
        navigate("/signin")
    }
   
    
    return (
        <div className="h-screen flex justify-center items-center bg-gray-800">
            <div className="rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-lg">
                <div className="text-center">
                    <h1 className="text-2xl text-bold mb-2">Sign Up</h1>
                    <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your information to create an account</p>
                </div>
              
                <input className="border-2 p-1 mb-2 mt-1" type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
                
                
                <input className="border-2 p-1 mb-2 mt-1" type="text" value={firstname} onChange={e => setFirstName(e.target.value)} placeholder="First name"/>
                
              
                <input className="border-2 p-1 mb-2 mt-1" type="text" value={lastname} onChange={e => setLastName(e.target.value)} placeholder="Last name"/>
                
             
                <input className="border-2 p-1 mb-2 mt-1" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
                
                <button onClick={handleSignup} className="border-black border-2 rounded-xl bg-black text-white w-1/2 m-auto hover:bg-teal-400">Sign Up</button>
                <div className="flex justify-center">
                    <p className="mr-2">Already have an account?</p>
                    <a onClick={navigateToSignin} className="underline hover:text-teal-400 cursor-pointer">Sign-in</a>
                </div>
            </div>
            {showLoader && <div className="absolute w-full h-full flex items-center justify-center bg-gray-200 opacity-80">
            <Loader></Loader>
            </div>}
        </div>
    )
}