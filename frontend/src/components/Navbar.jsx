import React, { useEffect, useState } from "react";
import { firstNameState, lastNameState } from "../states";
import { useRecoilState } from "recoil";
import Loader from "./Loader";

export default function Navbar() {

    const [firstName, setFirstName] = useRecoilState(firstNameState);
    const [lastName, setLastName] = useRecoilState(lastNameState);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("myToken");
        fetch("http://localhost:3000/api/v1/user/bulk", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data && data.user && data.user.length > 0) {
                    const firstUser = data.user[0]; // Get the details of the first user
                    setFirstName(firstUser.firstName);
                    setLastName(firstUser.lastName);
                } else {
                    console.log("No user data found");
                }
                setShowLoader(false);
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
                setShowLoader(false);
            });
    }, []);

    return (
        <div className="flex items-center border-2px border-black h-20 justify-between shadow-md">
            <span>
                <h1 className="text-bold text-indigo-400 inline text-xl ml-4 mt-8 drop-shadow">Paytm</h1>
                <h1 className="inline text-bold text-2xl mt-8 drop-shadow">App</h1>
            </span>
            {showLoader ?
                <div className="h-full mr-5 flex items-center">
                    <Loader />
                </div> :
                <span className="flex justify-center">
                    <p className="mr-2">Hello, {`${firstName} ${lastName}`}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-7 mr-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </span>
            }
        </div>
    )
}
