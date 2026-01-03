function Navigation({ currentPage, onNavigate }) {
  const navItems = [
    { id: 'products', label: 'Products' },
    { id: 'usa-stock', label: 'USA-Stock' },
    { id: 'about', label: 'About' },
    { id: 'pre-sale', label: 'Pre-Sale', hot: true }
  ]

  return (
    <nav className="flex items-center space-x-6 md:space-x-8">
      {navItems.map((item) => (
        <div key={item.id} className="relative">
          {item.hot && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
              Hot
            </span>
          )}
          <button
            onClick={() => onNavigate(item.id)}
            className={`text-sm md:text-base font-medium hover:text-blue-600 transition-colors whitespace-nowrap ${
              currentPage === item.id ? 'text-blue-600' : 'text-gray-900'
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

