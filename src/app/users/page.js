"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  let addUserForm = useForm();
  let updateUserForm = useForm();

  let addUserFormSubmit = (user) => {
    addUser(user);
  };
  let updateSubmit = (data) => {
    let user = {
      id: data.editId,
      name: data.editName,
      email: data.editEmail,
    };
    handleUpdateUser(user);
  };

  const addUser = async (user) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        fetchUsers();
        addUserForm.reset();
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleUpdateUser = async (user) => {
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        fetchUsers();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        if (response.ok) fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const openEditModal = (user) => {
    setCurrentUser(user);
    updateUserForm.reset({
      editId: user.id,
      editName: user.name,
      editEmail: user.email,
    });
    setIsModalOpen(true);
  };

  return (
    <div className='bg-gray-50 min-h-screen py-10 px-4'>
      <div className='max-w-5xl mx-auto space-y-10'>
        <h1 className='text-4xl font-bold text-center text-green-700'>
          User Management
        </h1>

        {/* Add User Form */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-green-300'>
          <h2 className='text-2xl font-semibold text-green-800 mb-4'>
            Add New User
          </h2>
          <form
            onSubmit={addUserForm.handleSubmit(addUserFormSubmit)}
            className='space-y-5'>
            <div>
              <label className='block text-sm font-medium text-gray-600'>
                Name
              </label>
              <input
                {...addUserForm.register("name")}
                type='text'
                required
                className='w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-600'>
                Email
              </label>
              <input
                {...addUserForm.register("email")}
                type='email'
                required
                className='w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500'
              />
            </div>
            <button className='bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700'>
              Add User
            </button>
          </form>
        </div>

        {/* Users Table */}
        <div className='bg-white p-6 rounded-2xl shadow-md border border-green-300'>
          <h2 className='text-2xl font-semibold text-green-800 mb-4'>
            Users List
          </h2>
          {isLoading && <p className='text-center text-sm'>Loading...</p>}
          {error && <p className='text-center text-red-600'>{error}</p>}
          <div className='overflow-x-auto'>
            <table className='min-w-full table-auto divide-y divide-green-200'>
              <thead className='bg-green-100'>
                <tr>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-green-600'>
                    ID
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-green-600'>
                    Name
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-green-600'>
                    Email
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-green-600'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-100'>
                {users.map((user) => (
                  <tr key={user.id} className='hover:bg-gray-50'>
                    <td className='px-4 py-2 text-sm text-gray-700'>
                      {user.id}
                    </td>
                    <td className='px-4 py-2 text-sm font-medium text-gray-900'>
                      {user.name}
                    </td>
                    <td className='px-4 py-2 text-sm text-gray-700'>
                      {user.email}
                    </td>
                    <td className='px-4 py-2 text-sm'>
                      <button
                        onClick={() => openEditModal(user)}
                        className='text-green-600 hover:underline mr-3'>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className='text-red-600 hover:underline'>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit User Modal */}
        {isModalOpen && (
          <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-green-300'>
              <h2 className='text-2xl font-semibold text-green-800 mb-4'>
                Edit User
              </h2>
              <form
                onSubmit={updateUserForm.handleSubmit(updateSubmit)}
                className='space-y-4'>
                <input
                  {...updateUserForm.register("editId")}
                  type='hidden'
                  value={currentUser.id}
                />
                <div>
                  <label className='block text-sm font-medium text-gray-600'>
                    Name
                  </label>
                  <input
                    {...updateUserForm.register("editName")}
                    type='text'
                    defaultValue={currentUser.name}
                    required
                    className='w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-600'>
                    Email
                  </label>
                  <input
                    {...updateUserForm.register("editEmail")}
                    type='email'
                    defaultValue={currentUser.email}
                    required
                    className='w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500'
                  />
                </div>
                <div className='flex gap-4 pt-2'>
                  <button
                    type='submit'
                    className='flex-1 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700'>
                    Update
                  </button>
                  <button
                    type='button'
                    onClick={() => setIsModalOpen(false)}
                    className='flex-1 bg-gray-400 text-white py-2 rounded-xl hover:bg-gray-500'>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
