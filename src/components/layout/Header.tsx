function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Countries App</h1>
          </div>
          <nav className="flex space-x-4">
            <a href="/" className="text-gray-700 hover:text-blue-600">Home</a>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 