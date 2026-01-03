import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'usa-stock', label: 'USA-Stock', path: '/usa-stock' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'pre-sale', label: 'Pre-Sale', path: '/pre-sale', hot: true }
  ]

  return (
    <nav className="flex items-center space-x-8">
      {navItems.map((item) => (
        <div key={item.id} className="relative">
          {item.hot && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              Hot
            </span>
          )}
          <button
            onClick={() => onNavigate(item.id)}
            className={`text-gray-900 font-medium hover:text-blue-600 transition-colors ${
              currentPage === item.id ? 'text-blue-600' : ''
            }`}
          >
            {item.label}
          </button>
        </div>
      ))}
    </nav>
  )
}

export default Navigation

