import axios from "axios";

import { useEffect, useState } from "react"
import { toast } from 'react-toastify';
import Fetchinguser from "./Fetchinguser";




function Dashboard() {

  const [balance, setbalance] = useState('balance');
  const token = localStorage.getItem("token")

  useEffect(()=>{
  
    fetch("http://localhost:3000/api/v1/account/balance", {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }
        }).then(res => res.json())
        .then(data => setbalance(data.balance))
  },[balance]);


  return (
    <div>
      
      {/* balance */}

      <div>
        <h4>Your balance : {balance} </h4>
        <hr/>
      
      </div>

      <Fetchinguser/>
    </div>
  )
}

export default Dashboard