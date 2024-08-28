import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

export default function AddProd() {
    const [product, setProduct] = useState({
        name: "", price: "",category:"", seller: "", stock: "",image1: "",image2:"",image3:""
    })

    const categories = ["Footwear","Clothing","Laptops","Mobiles","Watches","Others"]

    const changeHandler = (e) => {
        
        
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    
    
    const images = [product.image1,product.image2,product.image3];
  
    const data = {...product,images}
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("https://server-seven-red.vercel.app/api/createproduct",data,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }    
        }).then(res => {
            if(res.data.status === "Success"){
                toast.success("Product added successfully")
                setProduct({name:"",price:"",category:"",seller:"",stock:"",image1:"",image2:"",image3:""})
                document.getElementById("productForm").reset();
            }
            else{
                toast.error("Something went wrong")
            }
        })
        .catch(err => console.log(err))
    }
return (
    <>
        <Navbar />
        <div className='creation-form'>

            <form id="productForm" onSubmit={handleSubmit}>
                <h5>Add Product</h5>
                <input type="text" name="name" placeholder='Product Name' onChange={changeHandler} />
                <input type="text" name="price" placeholder='Price' onChange={changeHandler} />
                <input type="text" name="image1" placeholder='Image 1' onChange={changeHandler} />
                <input type="text" name="image2" placeholder='Image 2' onChange={changeHandler} />
                <input type="text" name="image3" placeholder='Image 3' onChange={changeHandler} />
                <select className='form-select custom' name='category' value={product.category} onChange={changeHandler}>
                    {categories.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
                <input type="text" name="seller" placeholder='Seller' onChange={changeHandler} />
                <input type="text" name="stock" placeholder='Stock' onChange={changeHandler} />
                <button type="submit" className='btn btn-success'>Add Product</button>
            </form>
        </div>
        <Toaster/>
    </>

)
}
