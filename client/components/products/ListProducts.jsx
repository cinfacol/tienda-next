"use client";

import ProductItem from "./ProductItem";
import Filters from "../layouts/Filters";
import BreadCrumbs from "../layouts/BreadCrumbs";

const ListProducts = ({ data }) => {
  const breadCrumbs = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
  ]
  return (
    <section className="mt-1">
      <BreadCrumbs breadCrumbs = {breadCrumbs} />
      <div className="container max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col md:flex-row -mx-4">
          <Filters />
          <main className="px-3">
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
