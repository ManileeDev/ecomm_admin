import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'

export default function AddProd() {
    const [product, setProduct] = useState({
        name: "", price: "",category:"", seller: "", stock: "",image1: "",image2:"",image3:""
    })

     const changeHandler = (e) => {
        
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const categories = ["Footwear","Clothing","Laptops","Mobiles","Watches","Others"]
    
    const images = [];
    images.push(product.image1);
    images.push(product.image2);
    images.push(product.image3);
  
    const data = {...product,images}
    
    const handleSubmit = () => {
        console.log(product)
        axios.post("https://ecomm-backend-z1w5.onrender.com/api/createproduct",data,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }    
        }).then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    
return (
    <>
        <Navbar />
        <div className='creation-form'>

            <form onSubmit={e => e.preventDefault()}>
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
                <button type="submit" className='btn btn-success' onClick={handleSubmit}>Add Product</button>
            </form>
        </div>
    </>

)
}
