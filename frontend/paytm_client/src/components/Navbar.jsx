import  { useEffect} from "react";
// import { firstNameState, lastNameState } from "../states";
// import {useRecoilState} from "recoil";
// import Loader from "./Loader";
import {Link} from "react-router-dom"


export default function Navbar(){
    
    // const [firstName, setFirstName] = useRecoilState(firstNameState);
    // const [lastName, setLastName] = useRecoilState(lastNameState);
    // const [showLoader, setShowLoader] = useState(true);
  

    const token = localStorage.getItem("myToken")
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/user/bulk", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(res => res.json())
        // .then(data => {
        //     setFirstName(data.firstName);
        //     setLastName(data.lastName);
        //     setShowLoader(false);
        // })
    }, [])
    
    return(
        <div className="flex items-center border-2px border-black h-20 justify-between shadow-md">
            <span>
                <h1 className="text-bold text-teal-800 inline text-2xl ml-4 mt-8 drop-shadow">Paytm</h1>
                <h1 className="inline text-bold text-2xl mt-8 drop-shadow">App</h1>
                
               
            </span>
            <div className=" inline text-bold text-xl  drop-shadow justify-start">
                <Link className=" hover:bg-gray-400 rounded-full p-1" to="/signin">
               Sign in
              </Link>
              <Link className="px-2 hover:bg-gray-400 rounded-full p-1" to="/signup">
              Sign up
              </Link>

                </div>

        </div>
    )
}


//  {showLoader ? 
//      <div className="h-full mr-5 flex items-center">
//         <Loader /> 
//      </div> :
//     <span className="flex justify-center">
//         <p  className="mr-2">Hello, {`${firstName} ${lastName}`}</p>
//            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-7 mr-4">
//            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
//         </svg>
//     </span>
//      }