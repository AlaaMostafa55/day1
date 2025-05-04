import React from 'react'
import { signIn, signOut } from '../auth';
// import { signIn } from '../auth';

function Login() {
  async function loginn() { 
    "use server"
    await signIn("Google", {
      // redirectTo : "/users",
    });
  }
  async function logout() { 
    "use server"
    await signOut();
  }
  return (
    <>
      <form
        action={loginn}
        className='flex flex-col items-center justify-center h-'>
        <button className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
          Login with Google
        </button>
      </form>
      <button
        onClick={logout}
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'>
        Llogout
      </button>
    </>
  );
}

export default Login