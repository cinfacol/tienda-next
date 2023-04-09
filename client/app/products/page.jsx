"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListProducts from "@/components/products/ListProducts";


export default function Products() {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.products.products);

  return <ListProducts data={data} />
}
