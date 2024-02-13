import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import Home from "./components/Home"
import Signup from './components/Signup'
import Signin from './components/Signin'
import Dashboard from "./components/Dashboard"
import { ToastContainer } from "react-toastify"
function App() {


  return (
    <div>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
    <ToastContainer/>
      
    </div>
  )
}

export default App
