import React from 'react'

const Navbar = () => {
  return (
    < >
      <div className='h-38 bg-navbar-color'>
        <div className='w-24 h-24'>
          <img src='src\assets\images\logo.jpg' className='heroimg rounded-full'></img>
        </div>
        <div>
          <ul>
            <li><img className='heroimg'></img></li>
            <li><img className='heroimg'></img></li>
            <li><img className='heroimg'></img></li>
          </ul>
        </div>
      </div>
      <h1>Navbar</h1>
    </>
  )
}

export default Navbar
