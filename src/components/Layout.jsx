import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Sidebar */}
      <div className="bg-gray-800 text-gray-300 p-4 w-full lg:w-64">
        <h4 className="text-lg font-bold mb-6">Admin Dashboard</h4>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link to="/users" className="flex items-center text-gray-300 hover:text-white">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Users
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-grow bg-gray-100 p-4">
        <header className="bg-white shadow p-4">
          <h5 className="text-xl">User Actions</h5>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
