import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashbord from "./pages/Dashbord";
import SendMoneyModel from "./pages/SendMoney";
import Redirector from "./pages/Redirector";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"
          element={
            <Redirector />
          }/>
        <Route path="/signup" 
          element={
          <Signup />
          }>
        </Route>
        <Route path="/signin" 
          element={
            <Signin />
          }>
        </Route>
        <Route path="/dashbord" 
          element={
            <Dashbord />
          }>
        </Route>
        <Route path="/send_money"
          element={
            <SendMoneyModel />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
