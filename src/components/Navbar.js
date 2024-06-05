import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
export default function Navbar() {
    const {dispatch} = useContext(AuthContext)
    const logoutHandler = () => {
        dispatch({type: "LOGOUT"})
        localStorage.removeItem("user")
        localStorage.removeItem('token')
    }
  return (
    <div className="nav-container">
        <div className="logo"><Link to="/" className="text-white">Lee~Admin</Link></div>
        <button className="btn btn-sm btn-danger" onClick={logoutHandler}>Logout</button>
    </div>
  )
}
