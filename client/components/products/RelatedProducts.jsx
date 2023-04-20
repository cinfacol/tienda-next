"use client";
import { useDispatch, useSelector } from "react-redux";
import { GetRelatedProducts } from "@/app/redux/features/products/productsService";
import { useEffect } from "react";
import Link from "next/link";

const RelatedProducts = ({productId}) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products.related)

  console.log('data', data);

  useEffect(() => {
  dispatch(GetRelatedProducts(productId));
}, [])

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl py-4 px-4 sm:py-6 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <h2 className='text-2xl font-extrabold tracking-tight text-gray-900'>Productos relacionados</h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {
            data?.map((product) => (
              <div key={product?.id}>
                <Link href={`/products/${product.id}`} className="group">
                  <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={`http://127.0.0.1:8000/${product?.get_thumbnail}`}
                      alt={product?.title}
                      className='w-full h-full object-center object-cover lg:w-full lg:h-full'
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{product?.title}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product?.price)}
                  </p>
                </Link>
              </div>
            ))
          }
        </div>
        <div>
          <Link  href='/shop' className='mt-4 hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block'>
            Más productos ...<span aria-hidden='true'> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default RelatedProducts
