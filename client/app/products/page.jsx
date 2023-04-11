"use client";

import { useSelector } from "react-redux";
import ListProducts from "@/components/products/ListProducts";


export default function Products() {

  const data = useSelector((state) => state.products.products);

  return <ListProducts data={data} />
}
