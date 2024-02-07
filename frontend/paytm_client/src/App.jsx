import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { RecoilRoot } from "recoil"
import Home from "./components/Home"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
function App() {


  return (
    <>
    <Router>
      <RecoilRoot>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>

        </Routes>
      
      </RecoilRoot>
    </Router>
     
    </>
  )
}

export default App
