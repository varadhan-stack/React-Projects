import React, { useState } from 'react'
import { assets } from '../assets/assets'

const InputField = ({type,placeholder,name,handleChange,address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    />
)

const AddAddress = () => {
    const [address,setAddress] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleChange=(e)=>{
        const {name, value} = e.target;

        setAddress((prevAddress)=>(
            {
                ...prevAddress,[name]:value
            }
        ))

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }
  return (
    <div className='mt-16 pb-16'>
        <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span></p>
        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onSubmitHandler} className='space-y-3 mt-6 text-sm'>

                    <div className='grid grid-cols-2 gap-4'>
                        <InputField key={1} handleChange={handleChange} address={address} name='firstName' type="text" placeholder="First Name" />
                        <InputField key={2} handleChange={handleChange} address={address} name='lastName' type="text" placeholder="Last Name" />
                    </div>

                    <InputField key={3} handleChange={handleChange} address={address} name='email' type="text" placeholder="Email Address" />
                    <InputField key={4} handleChange={handleChange} address={address} name='street' type="text" placeholder="Street" />

                    <div className='grid grid-cols-2 gap-4'>
                        <InputField key={5} handleChange={handleChange} address={address} name='city' type="text" placeholder="City" />
                        <InputField key={6} handleChange={handleChange} address={address} name='state' type="text" placeholder="State" />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                        <InputField key={7} handleChange={handleChange} address={address} name='zipcode' type="number" placeholder="Zip code" />
                        <InputField key={8} handleChange={handleChange} address={address} name='country' type="text" placeholder="Country" />
                    </div>

                    <InputField key={9} handleChange={handleChange} address={address} name='phone' type="text" placeholder="Phone" />

                    <button  className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition uppercase">
                        Save address
                    </button>

                </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="Add Address" />
        </div>
    </div>
  )
}

export default AddAddress