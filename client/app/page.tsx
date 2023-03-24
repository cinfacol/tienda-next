"use client";

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, increment } from "@/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";

export default function Home() {
  const userRef = useRef(false);

  const { entities, loading, value } = useSelector(
    (state: RootState) => state.user
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userRef.current === false) {
      dispatch(fetchUsers());
    }

    return () => {
      userRef.current = true;
    };
  }, []);

  return (
    <div className="px-4 py-5 sm:px-6">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        entities?.map(
          (user: any) => <h3 key={user.id} className="text-base font-semibold leading-6 text-gray-900">
            {user.name}
          </h3>
        )
      )}

      <button onClick={() => dispatch(increment())} className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-2 mt-5">
        Click on me
      </button>
      <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mt-5">
        {value}
      </button>
    </div>
  );
}

