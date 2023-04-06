"use client";

import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { get_product } from "@/app/redux/features/products/productsService";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const ProductDetails = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const productId = pathname.split('/')[2];



  const product = useSelector((state) => state.products.product);
  const rating = Number(product?.reviews[0].rating);
  // const rating = 3

  let reviews = product?.reviews;

  let valor = reviews?.map((review) => review.rating);
  let rate = Number((valor?.reduce((a, b) => Number(a) + Number(b), 0)/valor?.length).toFixed(1));

  useEffect(() => {
    dispatch(get_product(productId));

  }, [dispatch]);


  return (
    <section className="bg-white py-10">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
          <aside>
            <div className="border border-gray-200 shadow-sm p-3 text-center rounded mb-5">
              <Image
                className="object-cover inline-block"
                src={product?.cover_photo.url}
                alt={product?.title}
                width="340"
                height="340"
              />
            </div>
            <div className="space-x-2 overflow-auto text-center whitespace-nowrap">
              <Link href='/' className="inline-block border border-gray-200 p-1 rounded-md hover:border-blue-500 cursor-pointer">
                <Image
                  className="w-14 h-14"
                  src={product?.cover_photo.url}
                  alt={product?.title}
                  width="500"
                  height="500"
                />
              </Link>
            </div>
          </aside>
          <main>
            <h2 className="font-semibold text-2xl mb-4">{product?.title}</h2>

            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <StarRatings
                  rating={rate}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  starDimension="20px"
                  starSpacing="2px"
                  name="rating"
                />
              </div>
              <span className="text-yellow-500">{rate} de {valor?.length}</span>

              <svg
                width="6px"
                height="6px"
                viewBox="0 0 6 6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="3" cy="3" r="3" fill="#DBDBDB" />
              </svg>

              <span className="text-green-500">Verified</span>
            </div>

            <p className="mb-4 font-semibold text-xl">
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product?.price)}
            </p>

            <p className="mb-4 text-gray-500">
              {product?.description.substring(0, 150)}...
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              <button className="px-4 py-2 inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                <i className="fa fa-shopping-cart mr-2"></i>
                Add to cart
              </button>
            </div>

            <ul className="mb-5">
              <li className="mb-1">
                {" "}
                <b className="font-medium w-36 inline-block">Stock</b>
              </li>
              <li className="mb-1">
                {" "}
                <b className="font-medium w-36 inline-block">Category:</b>
                <span className="text-gray-500">Electonics</span>
              </li>
              <li className="mb-1">
                {" "}
                <b className="font-medium w-36 inline-block">
                  Seller / Brand:
                </b>
                <span className="text-gray-500">Apple</span>
              </li>
            </ul>
          </main>
        </div>

        {/* <NewReview /> */}
        <hr />

        <div className="font-semibold">
          <h1 className="text-gray-500 review-title mb-6 mt-10 text-2xl">
            Other Customers Reviews
          </h1>
          {/* <Reviews /> */}
        </div>
      </div>
    </section>
  )
}
