import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { balanceState } from "../states";

export default function YourBalance(){

    const [userBalance, setUserBalance] = useRecoilState(balanceState);

    const token = localStorage.getItem("myToken");
    //splitting the token into header,payload,signature

    // const parts = token.split(".");
    // const header = parts[0];
    // const payload = parts[1];
    // const signature = parts[2];
   
    useEffect(() => {
        fetch("https://simple-payment-app.vercel.app/api/v1/account/balance", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(data => setUserBalance(data.balance))
    }, [])

    return (
        <>
        {/* <h2>Header: {header}  payload: {payload}   sign:{signature}</h2> */}
            <h1 className="text-bold text-xl m-5 font-light">Your Balance: {userBalance}</h1>
            <hr />
        </>
    )
}