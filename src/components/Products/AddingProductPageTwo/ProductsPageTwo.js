import React, { useEffect } from "react";
import ProductsPageTop from "./ProductsPageTop/ProductsPageTop";
import AddingProduct from "./AddingProduct/AddingProduct";

export default function ProductsPageTwo() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full max-w-[1540px] mx-auto">
      <div className="w-full">
        <AddingProduct />
      </div>
    </div>
  );
}
