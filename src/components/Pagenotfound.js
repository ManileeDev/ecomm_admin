import React from 'react'
import Navbar from './Navbar'

export default function Pagenotfound() {
  return (
    <>
    <Navbar/>
    <div className='m-3 p-3 text-center' >
      <div>
        <img src='../assets/404.png' alt="404" width="50%"/>
        <h4>Page Not Found</h4>
      </div>
    </div>
    </>
  )
}

