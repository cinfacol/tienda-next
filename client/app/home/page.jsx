"use client"

import React, { useRef } from 'react'
import RootLayout from '../layout';
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from '@/redux/features/services/userService';

function DisplayName() {
  const {users, loading} = useSelector((state) => state.user);
  const products = users.results;

  return (
    <div>
      Hola, {products?.map((product) => <h3 key={product.id} className="text-base">
        {product.title}
      </h3>)}
    </div>
  )
}

const Home = () => {
  const name = useRef();
  const dispatch = useDispatch();

  function UseName() {
    dispatch(fetchUsers());
    console.log(name.current.value)
  }
  return (
    <RootLayout>
      <div className="px-8 mt-5">
        <p className='mb-2'>What's your name?</p>
        <input placeholder='Name here' ref={name} type="text" name="name" id="name" className="my-4 block rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
        <button
          onClick={UseName}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
        <DisplayName />
      </div>
    </RootLayout>
  )
}

export default Home
