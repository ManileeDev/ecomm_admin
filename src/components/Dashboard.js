import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function Dashboard() {

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
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
        const response = await axios.delete(`https://ecomm-backend-z1w5.onrender.com/api/deleteuser/${id}`, {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
        console.log(response)
    }
    console.log(users)
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
                        return <div className='d-flex'>
                        <div key={index} style={{width: "70%"}}>{index + 1}.{user.fullname}</div><button onClick={()=>deleteUser(user.user.Id)}></button></div>
                    })}</>}

            </div>
        </div>
    )
}

