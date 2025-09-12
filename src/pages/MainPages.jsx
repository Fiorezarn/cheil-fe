'use client';

import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import Logo from '../assets/logo.png';
import { createSubmission } from '../service/api/submission';

export default function MainPages() {
 const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  image: null,
 });

 const [isLoading, setIsLoading] = useState(false);

 const handleChange = (e) => {
  const { name, value, files } = e.target;
  if (name === 'image') {
   setFormData({ ...formData, image: files[0] });
  } else {
   setFormData({ ...formData, [name]: value });
  }
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  const data = new FormData();
  data.append('name', formData.name);
  data.append('email', formData.email);
  data.append('phone', formData.phone);
  data.append('image', formData.image);

  try {
   const res = await createSubmission(data);
   setFormData({ name: '', email: '', phone: '', image: null });
   toast.success(res.message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
   });
  } catch (err) {
   toast.error(err.message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
   });
  } finally {
   setIsLoading(false);
  }
 };

 return (
  <div className='min-h-screen'>
   <div className='bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4'>
    <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl p-8'>
     <div className='text-center mb-2'>
      <img
       src={Logo}
       alt='Logo'
       className='mx-auto w-24 h-24 object-contain'
      />
      <h1 className='text-2xl font-bold text-gray-800 mb-2'>Submission Form</h1>
     </div>

     <form
      onSubmit={handleSubmit}
      className='space-y-6'>
      <div className='space-y-2'>
       <label className='text-sm font-medium text-gray-700'>Full Name</label>
       <input
        type='text'
        name='name'
        value={formData.name}
        onChange={handleChange}
        className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white'
        placeholder='Enter your full name'
        required
       />
      </div>

      <div className='space-y-2'>
       <label className='text-sm font-medium text-gray-700'>
        Email Address
       </label>
       <input
        type='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white'
        placeholder='Enter your email address'
        required
       />
      </div>

      <div className='space-y-2'>
       <label className='text-sm font-medium text-gray-700'>Phone Number</label>
       <input
        type='tel'
        name='phone'
        value={formData.phone}
        onChange={handleChange}
        className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white'
        placeholder='Enter your phone number'
        required
       />
      </div>

      <div className='space-y-2'>
       <label className='text-sm font-medium text-gray-700'>Upload Image</label>
       <input
        type='file'
        name='image'
        accept='image/*'
        onChange={handleChange}
        className='w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100'
        required
       />
      </div>

      <button
       type='submit'
       disabled={isLoading}
       className='w-full bg-black text-white py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'>
       {isLoading ? 'Submitting...' : 'Submit Form'}
      </button>
     </form>
    </div>
   </div>
   <a
    className='flex items-center justify-center text-red-500 font-bold'
    href='/response'>
    Go to response
   </a>
  </div>
 );
}
