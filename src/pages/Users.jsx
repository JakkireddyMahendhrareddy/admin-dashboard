import React, { useState, useEffect } from "react";
import { mockGetUsers, mockAddUser, mockEditUser, mockDeleteUser } from "../services/mockApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    mockGetUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data);
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase()) ||
        user.status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    if (currentUser.id) {
      mockEditUser(currentUser).then(() => {
        refreshUsers();
        setOpen(false);
      });
    } else {
      mockAddUser(currentUser).then(() => {
        refreshUsers();
        setOpen(false);
      });
    }
  };

  const handleChange = (field, value) => {
    setCurrentUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <input
          type="text"
          className="border rounded-lg px-4 py-2 w-full sm:w-1/3"
          placeholder="Search by name, role, or status"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4 sm:mt-0" onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faPlus} /> Add User
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="bg-white hover:bg-gray-50">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2">{user.status}</td>
              <td className="border p-2">
                <button className="text-blue-500 mx-2" onClick={() => handleEdit(user)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className="text-red-500" onClick={() => mockDeleteUser(user.id).then(refreshUsers)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-full sm:w-96">
            <h3 className="text-xl mb-4">{currentUser.id ? "Edit User" : "Add User"}</h3>
            <input
              type="text"
              className="border mb-2 p-2 w-full"
              placeholder="Name"
              value={currentUser.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            <input
              type="text"
              className="border mb-2 p-2 w-full"
              placeholder="Role"
              value={currentUser.role}
              onChange={(e) => handleChange("role", e.target.value)}
            />
            <select
              className="border mb-4 p-2 w-full"
              value={currentUser.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={handleSave}>
                Save
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded-lg" onClick={() => setOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
