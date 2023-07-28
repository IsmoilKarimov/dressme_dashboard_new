import React from "react";
import { useParams } from "react-router-dom";
import FilterSearch from "../../reviewDetails/reviewFilterSearch/FilterSearch";
import CommentUsers from "./reviewCommentUsers/CommentUsers";
import { DetailCarousel } from "./reviewCarousels/DetailCarousel";

export default function ReviewDetail() {
  const id = useParams();
  console.log(id, "id");
  return (
    <div className=" px-10">
      <div className="w-full">
        <FilterSearch />
      </div>
      <div className="relative w-full flex gap-x-[70px] mt-6">
        <section className="w-[30%] ">
          <DetailCarousel />
          {/* <ProductCarousel /> */}
        </section>
        <div className="w-[calc(70%-70px)] ">
          <CommentUsers />
        </div>
      </div>
    </div>
  );
}
