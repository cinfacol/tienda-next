"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ProductDetails from "@/components/products/ProductDetails";
import { get_product } from "@/app/redux/features/products/productsService";

const ProductDetailsPage = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();

  const productId = pathname.split('/')[2];

  const productData = useSelector((state) => state.products.products);
  /* const dataId = productData?.map((data_id) => {
    return data_id.id;
  }); */

  const product_data = productData?.find(({ id }) => id  === productId);

  useEffect(() => {
    dispatch(get_product(productId));

  }, []);
  return (
    <ProductDetails product = {product_data} />
  )
}

export default ProductDetailsPage
