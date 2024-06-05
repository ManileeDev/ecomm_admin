import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="home-container">
                <Link to="/create">
                <div className="image-container">
                    <div className="image-wrapper">
                        <img src='../../assets/add.png' alt='add' />
                    </div>
                    <p>Add</p>
                </div>
                </Link>

                <Link to="/dashboard">
                <div className="image-container">
                    <div className="image-wrapper">
                        <img src='../../assets/info.png' alt='info' />
                    </div>
                    <p>Info</p>
                </div>
                </Link>
                <Link to="/delete"> 
                <div className="image-container">
                    <div className="image-wrapper">
                        <img src='../../assets/delete.png' alt='delete' />
                    </div>
                    <p>Delete</p>
                </div>
                </Link>
                <Link to="/edit"> 
                <div className="image-container">
                    <div className="image-wrapper">
                        <img src='../../assets/edit.png' alt='edit' />
                    </div>
                    <p>Edit</p>

                </div>
                </Link>
                <Link to="/soon"> 
                <div className="image-container">
                    <div className="image-wrapper">
                        <img src='../../assets/new.png' alt='new' />
                    </div>
                    <p>Soon</p>

                </div>
                </Link>

            </div>
        </>
    )
}
