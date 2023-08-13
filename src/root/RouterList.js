import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Products from "../components/Products/Products";
import Error from "../components/Error/Error";
import NavbarForSetting from "../components/Navbar/NavbarForSetting";
import ReviewDetail from "../components/Reviews/ReviewDetails/ReviewDetail";
import Reviews from "../components/Reviews/Reviews";
import ProductsPageTwo from "../components/Products/AddingProductPageTwo/ProductsPageTwo";
import MarketStore from "../components/MarketStore";
import AddLocation from "../components/MarketStore/AddMarket/AddLocation/AddLocation";
import AddStore from "../components/MarketStore/AddMarket/AddStore/AddStore";
import MyMarket from "../components/MarketStore/MyMarket/MyMarket";
import Clothes from "../components/MarketLocations/Clothes";
import MarketEdit from "../components/MarketStore/Market_Edit/MarketEdit";

export default function RouterList() {
  const [isItMarket, setIsItMarket] = useState(false);
  return (
    <div>
      <NavbarForSetting />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<ProductsPageTwo />} />

        {/* ---------------------Store------------------------- */}
        <Route path="/store" element={<MarketStore />}>
          {isItMarket ? (
            <Route index element={<AddStore />} />
          ) : (
            <Route index element={<MyMarket />} />
          )}

          <Route path="/store/market-add" element={<AddStore />} />
          <Route path="/store/market-list" element={<MyMarket />} />
          <Route path="/store/location-add" element={<AddLocation />} />

          <Route path="/store/list/:id" element={<MarketEdit />} />
        </Route>

        {/* ---------------------Store------------------------- */}

        <Route path="/store-location" element={<Clothes />} />
        <Route path="/review-details/:id" element={<ReviewDetail />} />
        <Route path="/" element={<Navigate to={"/reviews"} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
