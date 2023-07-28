import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Reviews from "../components/reviews/Reviews";
import Products from "../components/Products/Products";
import Shops from "../components/Shops/Shops";
import Error from "../components/Error/Error";
import NavbarForSetting from "../components/Sidebar/NavbarForSetting";
import ReviewDetail from "../components/reviews/ReviewDetails/ReviewDetail";

export default function RouterList() {
  return (
    <div className="">
      <NavbarForSetting />
      <Routes>
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/review-details/:id" element={<ReviewDetail />} />
        <Route path="/" element={<Navigate to={"/reviews"} />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}
