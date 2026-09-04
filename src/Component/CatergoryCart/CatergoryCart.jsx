import React from 'react';
import { Link } from 'react-router-dom';

export default function CategoryCart({ cat }) {
  return (
    <div className="max-w-sm mx-auto p-2 mb-4"> {/* Add margin bottom here */}
      <div className="flex flex-col h-full bg-white shadow-lg border rounded-lg dark:bg-gray-800 dark:border-gray-700 transition hover:border-green-500">
        <img className="w-full h-48 object-contain rounded-t-lg" src={cat.image} alt="cat image" />
        <div className="flex flex-col flex-grow px-5 pb-5 text-center justify-between">
          <h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white mb-3">{cat.name}</h3>
          <Link
            to={"/categoryproduct/" + cat._id}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-md text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-auto"
          >
            Show Product
          </Link>
        </div>
      </div>
    </div>
  );
}
