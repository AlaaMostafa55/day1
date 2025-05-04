import React from "react";
async function Details({ params }) {
  const { userId } = params; 
  console.log(userId);

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  const data = await res.json();
  console.log(data);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold mb-4'>User Details</h2>
      <p>
        <strong>Name:</strong> {data.name}
      </p>
      <p>
        <strong>Email:</strong> {data.email}
      </p>
      <p>
        <strong>Phone:</strong> {data.phone}
      </p>
      <p>
        <strong>Website:</strong> {data.website}
      </p>
    </div>
  );
}

export default Details;
