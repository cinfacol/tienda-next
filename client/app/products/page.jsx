"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProducts } from "../redux/features/products/productsService";
import ListProducts from "@/components/products/ListProducts";


export default function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProducts())

  }, [])

  const data = useSelector((state) => state.products.products);
  const categoriesData = useSelector((state) => state.categories.categories);

  return <ListProducts data={data} />
}
