"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function Users() {
  const [users, setusers] = useState([]);

  async function fetchData() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
      setusers(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {users.map((user) => (
        <div
          key={user.id}
          className='border p-4 rounded shadow hover:shadow-lg transition'>
          <h3 className='text-lg font-semibold'>{user.name}</h3>
          <p className='text-gray-600'>Email: {user.email}</p>
          <p className='text-gray-600'>Phone: {user.phone}</p>
          <button
            className='mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
            onClick={() => {
              redirect(`/users/${user.id}`);
            }}>
            View Details
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;
