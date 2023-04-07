import Link from 'next/link';
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const BreadCrumbs = ({ breadCrumbs }) => {
  return (
    <section className="py-5 sm:py-7 bg-blue-100">
      <div className="container max-w-screen-xl mx-auto px-4">
        {/* <ChevronRightIcon className="h-5 w-5 text-gray-400" /> */}
        <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
          {breadCrumbs?.map((breadCrumb, index) => (
            <li key={index} className="inline-flex items-center">
              <Link
                href={breadCrumb.url}
                className="text-gray-600 hover:text-blue-600"
              >
                {breadCrumb.name}
              </Link>
              {breadCrumbs?.length - 1 !== index && (
                <ChevronRightIcon className="h-5 w-5 ml-3 text-gray-400" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default BreadCrumbs
