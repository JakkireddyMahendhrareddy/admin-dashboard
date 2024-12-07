let users = [
    { id: 1, name: "Divya Teja", role: "Admin", status: "Active" },
    { id: 2, name: "Layansh", role: "Editor", status: "Inactive" },
    { id: 2, name: "Dhoni", role: "Developer", status: "Active" },
    { id: 3, name: "Bunny", role: "Editor", status: "Inactive" },
    { id: 4, name: "Raj", role: "Admin", status: "Active" },
    { id: 5, name: "Anil", role: "Editor", status: "Inactive" },
  ];
  
  export const mockGetUsers = () => Promise.resolve(users);
  
  export const mockAddUser = (user) => {
    user.id = users.length + 1;
    users.push(user);
    return Promise.resolve(user);
  };
  
  export const mockEditUser = (updatedUser) => {
    users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
    return Promise.resolve(updatedUser);
  };
  
  export const mockDeleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    return Promise.resolve();
  };
  