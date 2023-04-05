"use client";

import { useEffect } from "react";
import { getProducts } from "../redux/features/products/productsService";
import { useDispatch, useSelector } from "react-redux";
import ListProducts from "@/components/products/listProducts";

const Products = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())

  }, [dispatch])

  const data = useSelector((state) => state.products.products);

  return <ListProducts data={data} />
}

export default Products
