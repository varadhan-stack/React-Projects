import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../contexts/AppContext'
import toast from 'react-hot-toast';


const SellerLogin = () => {
  const {isSeller,setIsSeller,navigate,axios} = useAppContext();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
  
      const { data } = await axios.post(
        '/api/seller/login',
        { email, password },
        { withCredentials: true } // cookie-based authentication
      );
  
      if (data.success) {
        // Optional: store token if you want to use Authorization header later
        if (data.token) {
          localStorage.setItem('sellerToken', data.token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
  
        setIsSeller(true);
        navigate('/seller');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

useEffect(()=>{
    if(!isSeller){
        navigate('/seller')
    }
},[isSeller])

  return !isSeller && (

    <form onSubmit={onSubmitHandler} className='min-h-screen flex items-center text-sm text-gray-600' >
        <div className='flex flex-col gap-5 m-auto items-start p-8 py-12 min-w-80 sm:min-w-99 rounded-lg shadow-xl border border-gray-200'>
            <p className='text-2xl font-medium m-auto'><span className='text-primary'>Seller</span> Login</p>
            
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=>{setEmail(e.target.value)}} value={email} type="text" placeholder='Enter your email' className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'/>
            </div>

            <div className='w-full'>
                <p>Password</p>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} placeholder='Enter your password' className='border border-gray-200 rounded w-full p-2 mt-1 outline-primary'/>
            </div>

            <button  className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition uppercase">
                Login
            </button>

        </div>
    </form>
  )
}

export default SellerLogin