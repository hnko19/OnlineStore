import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext';
import logo from '../../assets/freshcart-logo.svg'

export default function Navbar() {



  const[isOpen , setIsOpen]  = useState(false);
  let { userToken , setUserToken } = useContext(AuthContext);
  const navigation = useNavigate();

  function SingOut() {
    localStorage.removeItem("token");
    setUserToken("");
    navigation("/login");
  }
  return <>
<header className="bg-slate-500 md:bg-transparent z-50 absolute w-full">
  <nav className="container mx-auto px-6 py-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-white font-bold text-xl me-8">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        {userToken && <div className="hidden md:block">
          <ul className="flex items-center space-x-4">
            <li><NavLink to={"/"} className="hover:text-green-600">Home</NavLink></li>
            <li><NavLink to={"/products"} className="hover:text-green-600">Products</NavLink></li>
            <li><NavLink to={"/categories"} className="hover:text-green-600">Categories</NavLink></li>
            <li><NavLink to={"/brands"} className="hover:text-green-600">Brands</NavLink></li>
            <li><NavLink to={"/allorders"} className="hover:text-green-600">Orders</NavLink></li>
            <li><NavLink to={"/cart"} className="hover:text-green-600">Cart</NavLink></li>
          </ul>
        </div>}
      </div>
      <div className='flex items-center'>
        <div className="social-media">
       { userToken && <Link to={"/wishlist"}><i className=" cursor-pointer text-green-600 mx-2 f fa-regular fa-heart "></i></Link>}
        {/* <i className="cursor-pointer fa-regular fa-heart text-green-600 fa-2x"></i> */}
        </div>
        <ul className='space-x-3 ms-3 hidden md:flex'>
          {!userToken && <>
            <li><NavLink to={"/login"} className="">Login</NavLink></li>
            <li><NavLink to={"/register"} className="">Register</NavLink></li>
          </>}
          {userToken &&  <li className=''><button onClick={SingOut} className="">SingOut</button></li>}
        </ul>
      </div>
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="outline-none mobile-menu-button">
          <svg className="w-6 h-6 text-white" x-show="!showMenu" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    <div className={isOpen ? "mobile-menu md:hidden transition-all " : "mobile-menu hidden md:hidden"}>
      <ul className="mt-4 space-y-4">
        {
          userToken && <>
            <li><NavLink to={"/"} className="block px-4 py-2 text-white bg-gray-900 rounded">Home</NavLink></li>
            <li><NavLink to={"/products"} className="block px-4 py-2 text-white bg-gray-900 rounded">Products</NavLink></li>
            <li><NavLink to={"/categories"} className="block px-4 py-2 text-white bg-gray-900 rounded">Categories</NavLink></li>
            <li><NavLink to={"/brands"} className="block px-4 py-2 text-white bg-gray-900 rounded">Brands</NavLink></li>
            <li><NavLink to={"/allorders"} className="block px-4 py-2 text-white bg-gray-900 rounded">Orders</NavLink></li>
            <li><NavLink to={"/cart"} className="block px-4 py-2 text-white bg-gray-900 rounded">Cart</NavLink></li>
          </>
        }
        <hr />
        {!userToken && <>
            <li><NavLink to={"/login"} className="block px-4 py-2 text-white bg-gray-900">Login</NavLink></li>
            <li><NavLink to={"/register"} className="block px-4 py-2 text-white bg-gray-900">Register</NavLink></li>
          </>}
          {userToken &&  <li className=''><button onClick={SingOut} className="">SingOut</button></li>}
      </ul>
    </div>
    
  </nav>
</header>
  
  </>
}
