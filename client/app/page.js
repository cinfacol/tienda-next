"use client";

import Banner from "@/components/banner";
import ProductsArrival from "@/components/products/ByArrival";
import ProductsSold from "@/components/products/BySold";

export default function Home() {
  return (
    <>
      <Banner />
      <ProductsArrival />
      <ProductsSold />
    </>
  )
}
