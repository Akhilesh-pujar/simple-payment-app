import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { constSelector, useRecoilStateLoadable } from "recoil";
import { usersState } from "../states";
import Loader from "./Loader";
import axios from "axios";

function useDebounce(filter, delay){
    const [debouncedValue, setDebouncedValue] = useState(filter);
    
    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(filter)
        }, delay)

        return () => {
            clearTimeout(timeOut);
        }
    }, [filter, delay]);

    return debouncedValue;
}

export default function FindUsers(){

    const [filter, setFilter] = useState("");
    const [usersLoadable, setUsers] = useRecoilStateLoadable(usersState);  // loadable
    const [showLoader, setShowLoader] = useState(true);
    const token = localStorage.getItem("myToken")

    const debouncedFilter = useDebounce(filter, 200);

    useEffect(() => {
        handleSearch();
    }, [debouncedFilter])

    async function handleSearch() {
        setShowLoader(true); // Show loader when fetching new data

        try {
            const res = await axios.get(`http://localhost:3000/api/v1/user/bulk/?filter=${filter}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (res.status !== 200) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = res.data;
     

            if (data && data.user && data.user.length > 0) {
                const userss = data.user;
                if(userss.length>10){
                    const slicedData = userss.slice(0, 10);
                setUsers(slicedData);

                }
                else{
                    setUsers(userss)
                }
                
            } else {
                console.log("no users found", data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setShowLoader(false); // Hide loader after request completion
        }
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
                </div>
            </form>
            {showLoader ? 
            <div className="mt-10"><Loader /></div> : 
            usersLoadable.state === 'hasValue' && Array.isArray(usersLoadable.contents) ? 
            usersLoadable.contents.map((user, idx) => <UserCard key={idx} index={idx+1} fullName={`${user.firstName} ${user.lastName}`} id={user.userId} username={user.username}/>) : 
            <div>No users found</div>}
        </>
    )
}
