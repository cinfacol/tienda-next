"use client";

import ProductItem from "./ProductItem";
// import Filters from "../layouts/Filters";

const ListProducts = ({ data }) => {
  return (
    <section className="mt-1">
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* <Filters /> */}
          <main className="md:w-2/3 lg:w-3/4 px-3">
            {data?.map((product) => (
              <ProductItem key={product?.id} product={product} reviews={product.reviews} />
            ))}
          </main>
        </div>
      </div>
    </section>
  )
}

export default ListProducts
