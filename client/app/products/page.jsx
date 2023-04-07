"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/features/products/productsService";
import ListProducts from "@/components/products/ListProducts";


export default function Products() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())

  }, [dispatch])

  const data = useSelector((state) => state.products.products);
  const categoriesData = useSelector((state) => state.categories.categories);
  console.log('categories_data', categoriesData);
  console.log('data', data);

  return <ListProducts data={data} />
}
