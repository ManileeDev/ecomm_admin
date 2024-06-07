import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import DataTable from "react-data-table-component"
import EditProd from './EditProd';

export default function Dashboard() {

    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [error, setError] = useState("")
    const [view, setView] = useState("")
    const [show,setShow] = useState(false)
    const fetchProducts = async () => {
        const response = await axios.get("https://ecomm-backend-z1w5.onrender.com/api/products")
        setProducts(response.data.products)
        setView("products")
        setRecords(response.data.products)
    }

    const [editProd,setEditProd] = useState(null)

    const handleEdit = (id) => {
        const selectedProduct = products.find(product => product._id == id)
        setEditProd(selectedProduct)
        setShow(true)
    }
    const [records, setRecords] = useState()

    const fetchUsers = async () => {
        const response = await axios.get("https://ecomm-backend-z1w5.onrender.com/api/getallusers", {
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }
        })
        setUsers(response.data)
        setView("users")
    }

    const confirmUserDelete = (id) => {
        let text = "DO YOU WANT TO DELETE?";
        if (window.confirm(text) == true) {
          deleteUser(id);
        } else {
          toast.error("Deletion Failed");
        }
      }
    const deleteUser = async (id) => {

        try {
            const response = await axios.delete(`https://ecomm-backend-z1w5.onrender.com/api/deleteuser/${id}`, {
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
            if (response.data.message == "User Deleted Successfully") {
                toast.success(response.data.message)
                fetchUsers()
            }
        }
        catch (err) {
            setError(err.response.data.message)
        }


    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            setError("")
        }
    }, [error])

     
    const confirmProductDelete = (id) => {
        let text = "DO YOU WANT TO DELETE?";
        if (window.confirm(text) == true) {
          deleteProduct(id);
        } else {
          toast.error("Deletion Failed");
        }
      }
    const deleteProduct = async (id) => {
        try {
            const response = await axios.delete(`https://ecomm-backend-z1w5.onrender.com/api/deleteproduct/${id}`, {
                headers: {
                    "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
                }
            })
            if(response.data.status =='Product Deleted'){
                toast.success(response.data.status)
                fetchProducts()
            }
            }
        catch (err) {
            setError(err.response.data.message)
        }

    }

    const productColumns = [{
        name: "Name",
        selector: row => row.name,
        sortable: true
    }, {
        name: "Image",
        selector: row => <img src={row.images[0]} alt="" style={{ width: "50px", height: '50px', margin: "5px", objectFit: "contain" }} />,
    },
    {
        name: "Price",
        selector: row => row.price,
    },
    {
        name: "Action",
        selector: row => <> <span className='text-danger' onClick={() => confirmProductDelete(row._id)}><MdDelete /></span> <span className='text-danger' onClick={()=>handleEdit(row._id)}><MdModeEdit /></span></>
    }
    ]

    const usersColumn = [{
        name: "Name",
        selector: row => row.fullname,
        sortable: true
    },
    {
        name: "Phone",
        selector: row => row.phone,
    },
    {
        name: "Action",
        selector: row => <span className='text-danger' onClick={() => confirmUserDelete(row.userId)}><MdDelete /></span>
    }
    ]

    const handleFilter = (e) => {
        const filteredData = products.filter(row => {
            return row.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredData)
    }

    const closeModal = () => {
        setShow(false);
        fetchProducts();
    }
    return (
        <div>
            <Navbar />
            <div className="dashboard-control">
                <button className="btn btn-outline-success" onClick={fetchProducts}>Fetch Products</button>
                <button className='btn btn-outline-danger' onClick={fetchUsers}>Fetch Users</button>
            </div>
            <div className="dashboard-container">
                {view === "products" &&
                    <>
                        <input type='text' className='form-control' onChange={handleFilter} />
                        <DataTable columns={productColumns} data={records} pagination fixedHeader /></>

                }

                {view === "users" && <>
                    <DataTable columns={usersColumn} data={users} pagination fixedHeader /></>}

            </div>
            {show && <EditProd product ={editProd} show={show} closeModal={closeModal} /> }
            <Toaster />
        </div>
    )
}

