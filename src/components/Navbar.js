import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
export default function Navbar() {
    const {dispatch} = useContext(AuthContext)
    const logoutHandler = () => {
        dispatch({type: "LOGOUT"})
        localStorage.removeItem("user")
        localStorage.removeItem('token')
    }
  return (
    <div className="nav-container">
        <div className="logo">Lee~Admin</div>
        <button className="btn btn-sm btn-danger" onClick={logoutHandler}>Logout</button>
    </div>
  )
}
