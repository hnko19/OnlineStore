import React from 'react'
import { NavLink } from 'react-router-dom'

export default function BrandCart({brand}) {
  return <NavLink to={"/brandproduct/" + brand._id } >
  <div className=" max-w-2xl p-2 mx-auto relative">
      <div className="h-full   bg-white shadow-lg border rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 transition hover:border-green-500 ">
          <img className="rounded-t-lg p-8" src={brand.image} alt="brand image" /> 
      </div>
  </div>
</NavLink>
}
