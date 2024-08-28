import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { IoMdEyeOff } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast'
import { IoIosArrowBack } from "react-icons/io";



export default function Login() {

  const {dispatch} = useContext(AuthContext)
  const [showPassword,setShowPassword] = useState(false)
  const [error,setError] = useState(null)
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [checkBoxValue, setCheckBoxValue] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const passHandler = (e) => {
   setShowPassword(prev => !prev)
  }

  const loginHandler = async () => {
    if (!loginDetails.email || !loginDetails.password) { 


      return setError("All field must be filled");
    }
    try {
      const response = await fetch('https://server-seven-red.vercel.app/api/login', {
          headers: {
              "Content-Type": "application/json"
          },
          method: 'POST',
          body: JSON.stringify(loginDetails)
      })

      const responseData = await response.json()
      console.log()
      if (response.ok) {
          if(responseData.user.role !== "admin"){
            return setError("You are not admin")
          }
          if (checkBoxValue) {
              localStorage.setItem('user', JSON.stringify(responseData.user))
              localStorage.setItem('token', JSON.stringify(responseData.token))
          }
          dispatch({ type: 'LOGIN', payload: responseData.user })
      }
      setError(responseData.message)
  }
  catch (e) {
      console.log(e.message)
  }
 
  };

  useEffect(() => {
    if(error){
      toast.error(error)
    }
}, [error])
  return (
    <div className="main-background">
      <div className="loginpage">
      
        <div className="login-box">
        <span className="cross-icon text-danger m-0 p-0 right-0"><IoIosArrowBack/></span>
          <div className="form-group">
            <h5 className="mb-3 text-center">Login</h5>
            <label htmlFor="">Email</label>
            <input
              type="email"
              className="form-control form-control-sm mb-2"
              name="email"
              value={loginDetails.email}
              onChange={changeHandler}
            />
            <label htmlFor="">Password</label>
            <div className="password">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginDetails.password}
              onChange={changeHandler}
            />
            <span className="pass-logo" onClick={passHandler}><IoMdEyeOff /></span>
            </div>
            
            <div className="d-flex align-items-center mt-2">
              <input
                type="checkbox"
                className="me-1"
                name="checkboxValue"
                onChange={(e) => setCheckBoxValue(e.target.checked)}
              />
              <small>Remember me?</small>
            </div>

            <div className="text-center mt-3">
              <button className="btn btn-primary btn-sm" onClick={loginHandler} >
                Login
              </button>
            </div><br/>
            {error && <p className="text-danger text-center">{error}</p>}
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
