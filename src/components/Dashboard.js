import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function Dashboard() {

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [error,setError] = useState("")
    const [view, setView] = useState("")
    const fetchProducts = async () => {
        const response = await axios.get("https://ecomm-backend-z1w5.onrender.com/api/products")
        setProducts(response.data.products)
        setView("products")
    }

    const fetchUsers = async () => {
        const response = await axios.get("https://ecomm-backend-z1w5.onrender.com/api/getallusers", {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
        setUsers(response.data)
        setView("users")
    }

    const deleteUser = async (id) => {

        try{
            const response = await axios.delete(`https://ecomm-backend-z1w5.onrender.com/api/deleteuser/${id}`, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
        console.log(response.data)
        }
        catch(err){
            setError(err.response.data.message)
        }
        
       
    }

    useEffect(() => {
        if(error){
            toast.error(error)
            setError("")
        }
    }, [error]) 
    return (
        <div>
            <Navbar />
            <div className="dashboard-control">
                <button className="btn btn-outline-success"onClick={fetchProducts}>Fetch Products</button>
                <button className='btn btn-outline-danger' onClick={fetchUsers}>Fetch Users</button>
            </div>
            <div className="dashboard-container">
                {view === "products" && <><h3>Products</h3>
                    {products && products.map((product, index) => {
                        return <p key={index}>{index + 1}.{product.name}</p>
                    })}</>}

                {view === "users" && <><h3>Users</h3>
                    {users && users.map((user, index) => {
                        return <div className='d-flex'  key={index} >
                        <div style={{width: "70%"}}>{index + 1}.{user.fullname}</div><span className='text-danger' btn-sm onClick={()=>deleteUser(user.userId)}><MdDelete/></span></div>
                    })}</>}'

            </div>
            <Toaster/>
        </div>
    )
}

