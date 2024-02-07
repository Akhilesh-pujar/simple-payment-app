import { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { useRecoilStateLoadable } from "recoil";
import { usersState } from "../states";
import Loader from "./Loader";

export default function FindUsers(){

    const [filter, setFilter] = useState("");
    const [users, setUsers] = useRecoilStateLoadable(usersState);  // loadable
    const [showLoader, setShowLoader] = useState(true);
    const token = localStorage.getItem("myToken")

    useEffect(() => {
        handleSearch();
    }, [])

    async function handleSearch() {
        const res = await fetch(`http://localhost:3000/api/v1/user/?filter=${filter}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(!res.ok){
            alert(`HTTP error! status: ${res.status}`);
            setShowLoader(false);
            return;
        }
        let data = await res.json();
        
        if(data.length > 10){
            data = data.slice(10);
        }

        setUsers(data);
        setShowLoader(false);
    }

    return (
        <>
            <h3 className="text-bold text-xl m-6">Users -</h3>
            <form className="w-11/12 m-auto">   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" value={filter} onChange={e => setFilter(e.target.value)} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Find Users..." required />
                    
                    <button type="button" onClick={handleSearch} className="text-white absolute end-2.5 bottom-2.5 bg-black hover:bg-teal-500 rounded-3xl text-sm px-4 py-2 dark:bg-teal-500 dark:hover:bg-teal-700 dark:focus:ring-teal-700">Search</button>
                </div>
            </form>
            {showLoader ? 
            <div className="mt-10"><Loader /></div> : 
            users.contents.map((user, idx) => <UserCard key={idx} index={idx+1} fullName={`${user.firstName} ${user.lastName}`} id={user.userId} username={user.username}/>)}
        </>
    )
}