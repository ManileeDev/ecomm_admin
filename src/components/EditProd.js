import axios from 'axios';
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import toast, { Toaster } from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx"; 

export default function EditProd({ product,show, closeModal }) {

    const [edit,SetEdit] = useState({
        name: product.name, price: product.price,category:product.category, seller: product.seller, stock: product.stock,image1: product.images[0],image2:product.images[1],image3:product.images[2]
    })
    const id = product._id;
    console.log(id)
    const images = [edit.image1,edit.image2,edit.image3];
  
    const data = {...edit,images}
    const changeHandler = (e) => {   
        SetEdit({ ...edit, [e.target.name]: e.target.value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://ecomm-backend-z1w5.onrender.com/api/updateproduct/${id}`,data,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("token"))
            }    
        }).then(res => {
            if(res.data.status === "Product Updated"){
                toast.success(res.data.status)
                closeModal();
            }
            else{
                toast.error("Something went wrong")
            }
        })
        .catch(err => console.log(err))
    }



    const categories = ["Footwear", "Clothing", "Laptops", "Mobiles", "Watches", "Others"] 
    if (!show) return null;
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="overlay" onClick={closeModal}></div>
            <form id="productForm" className="content" onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between align-items-center'>
                    <h4>Edit Product</h4>
                    <h3 onClick={closeModal} className='cancelCross'><RxCross2 /></h3>
                </div>
                <input type="text" value={edit.name} name="name" placeholder='Product Name' onChange={changeHandler} />
                <input type="text" value={edit.price} name="price" placeholder='Price' onChange={changeHandler} />
                <input type="text" value={edit.image1} name="image1" placeholder='Image 1' onChange={changeHandler} />
                <input type="text" value={edit.image2} name="image2" placeholder='Image 2' onChange={changeHandler} />
                <input type="text" value={edit.image3} name="image3" placeholder='Image 3' onChange={changeHandler} />
                <select value={edit.category} className='form-select custom' name='category'  onChange={changeHandler}>
                    {categories.map(option => <option key={option} value={option}>{option}</option>)} 
                </select>
                <input type="text" value={edit.seller}name="seller" placeholder='Seller' onChange={changeHandler} />
                <input type="text" value={edit.stock}name="stock" placeholder='Stock' onChange={changeHandler} />
                <button type="submit" className='btn btn-success'>Edit Product</button>
            </form>
            <Toaster/>
        </div>,
        document.getElementById("portal")
    );
}
