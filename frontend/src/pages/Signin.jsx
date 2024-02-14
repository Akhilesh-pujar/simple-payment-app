import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { usernameState, passwordState } from "../states";
import Loader from "../components/Loader";
import {toast} from "react-toastify"
import axios from "axios";
export default function Signin(){
    
    const [username, setUsername] = useRecoilState(usernameState); //not used
    const [password, setPassword] = useRecoilState(passwordState);
    const [showLoader, setShowLoader] = useState(false);

    const navigate = useNavigate();

    async function handleSignin(e){
        e.preventDefault();
        
        try{
            await axios.post("http://localhost:3000/api/v1/user/signin",{
              username, password
             })
             .then((response)=>{
             console.log(response.data)
           
             navigate("/dashbord")
             })
           }
           catch(error){
            console.log(error);
           }
    }
    
    function navigateToSignup(){
        navigate("/signup");
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-800">
        <div className="rounded-2xl p-6 flex flex-col justify-center bg-white drop-shadow-xl">
            <div className="text-center">
                <h1 className="text-2xl text-bold mb-2">Sign-In</h1>
                <p className="m-auto w-5/6 mb-2 text-gray-700">Enter your Credentials to access your account</p>
            </div>
        
            <input className="border-2 p-1 mb-2 mt-1" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
            
          
            <input className="border-2 p-1 mb-2 mt-1" type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password"/>
            
            <button onClick={handleSignin} className="border-black border-2 rounded-xl bg-black text-white mt-2 mb-2 w-1/2 m-auto hover:bg-teal-400">Sign-In</button>
            <div className="flex justify-center">
                <p className="mr-2">Don't have an account?</p>
                <a onClick={navigateToSignup} className="underline hover:text-teal-400 cursor-pointer">Sign-Up</a>
            </div>
        </div>
        {showLoader && <div className="absolute w-full h-full flex items-center justify-center bg-gray-200 opacity-80">
            <Loader></Loader>
        </div>}
        </div>
    )
}