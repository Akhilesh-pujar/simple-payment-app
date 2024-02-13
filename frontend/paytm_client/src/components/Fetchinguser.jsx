import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Fetchinguser = () => {
    const [users, setUsers] = useState([]);

    useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk")
    .then((response)=>{
        setUsers(response.data.user)
    })
    },[])
  return (
    <>
     <div className='font-bold mt-6 text-lg'>
        Users
    </div>

    <div className='my-2'>
        <input type='text' placeholder='Search Users'
        className='w-full py-1 border rounded-md border-slate-400'
        />

    </div>
    <div>
        {users.map(user=><User user={user}/>)}
    </div>
    </>
   
  )
}

 function User({user}){
    return <div className='flex justify-between'>
        <div className='flex'>
            <div className='rounded-full h-12 bg-slate-200 flex justify-center mt-2 mr-2 '>
                <div className='flex flex-col justify-center h-full text-xl'>
                    <p>{user.firstname}</p>
                    <p>{user.lastname}</p>
                    

                </div>

            </div>
        </div>

    </div>
 }


export default Fetchinguser