import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div>
            <Link to="/" className="text-xl font-bold text-gray-900 hover:text-blue-600">
              Countries Explorer
            </Link>
          </div>
          <nav className="flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Countries</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
