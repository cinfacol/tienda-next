"use client";

// import Image from "next/image";
import Link from "next/link";
import StarRatings from "react-star-ratings";

const ProductItem = ({ product, reviews }) => {
  let valor = reviews.map((review) => review.rating);
  let rate = Number((valor.reduce((a, b) => Number(a) + Number(b), 0)/valor.length).toFixed(1));
  return (
    <article className="border border-gray-200 overflow-hidden bg-white shadow-sm rounded mb-5">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 flex p-3">
          <div
            style={{
              width: "80%",
              height: "70%",
              position: "relative",
            }}
          >
            <Link href={`/products/${product.id}`}>
              <img
                src={
                  product?.cover_photo
                    ? product?.cover_photo
                    : "/images/default_product.png"
                }
                alt={product?.title}
                height="240"
                width="240"
              />
            </Link>
          </div>
        </div>
        <div className="md:w-2/4">
          <div className="p-4">
            <Link
              href={`/products/${product.id}`}
              className="hover:text-blue-600"
            >
              {product.title}
            </Link>
            <div className="flex flex-wrap items-center space-x-2 mb-2">
              <div className="ratings">
                <div className="my-1">
                  <StarRatings
                      rating={rate}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      starDimension="18px"
                      starSpacing="1px"
                      name="rating"
                    />
                    {/* <p className="text-yellow-700">rating: {rate} de: {valor.length} reseñas</p> */}
                </div>
              </div>
              <b className="text-gray-300">•</b>
              <span className="ml-1 text-yellow-500">{rate} de {valor.length}</span>
            </div>
            <p className="text-gray-500 mb-2">
              {product?.description.substring(0, 150)}...
            </p>
          </div>
        </div>
        <div className="md:w-1/4 border-t lg:border-t-0 lg:border-l border-gray-200">
          <div className="flex flex-col items-center p-5">
            <span className="text-xl font-semibold text-black">
              {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(product?.price)}
            </span>

            <p className="text-green-500">Free Shipping</p>
            <div className="mt-5">
              <Link
                href = {"/Cart "}
                className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default ProductItem;
