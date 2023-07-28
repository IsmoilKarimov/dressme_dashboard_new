import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import RouterList from "../../root/RouterList";
import { star } from "../../assets";
import {
  ClothesIcons,
  NavbarMarketIcon,
  NavbarReviewIcon,
} from "../../assets/icons";

export default function NavbarDashboard() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="relative w-full h-full border borde-red-500 flex justify-between">
        <div className="w-[300px] h-[100vh] fixed top-0 left-0 border border-lightBorderColor bg-lightBgColor">
          <div className="w-full h-[80px] flex items-center justify-center">
            <p className="w-fit text-black text-3xl not-italic font-AeonikProMedium">
              RED TAG (store)
            </p>
          </div>
          <div className="w-full py-[25px] px-2 flex flex-wrap gap-y-2">
            <NavLink
              className={
                "w-full h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
              }
              style={({ isActive }) => ({
                color: isActive ? "#007DCA" : "#000",
                background: isActive ? "#f2f2f2" : "#fcfcfc",
              })}
              to={"/reviews"}
            >
              <span>
                <NavbarReviewIcon colors={""} />
              </span>
              <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                Отзывы
              </span>
            </NavLink>
            <NavLink
              className={
                "w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg"
              }
              style={({ isActive }) => ({
                color: isActive ? "#007DCA" : "#000",
                background: isActive ? "#f2f2f2" : "#fcfcfc",
              })}
              to={"/shops"}
            >
              <span>
                <NavbarMarketIcon colors={""} />
              </span>
              <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                Магазины
              </span>
            </NavLink>
            <NavLink
              className={
                "w-full h-[54px] gap-x-[15px] px-[25px] flex items-center justify-start capitalize bg-lightBorderColor rounded-lg"
              }
              style={({ isActive }) => ({
                color: isActive ? "#007DCA" : "#000",
                background: isActive ? "#f2f2f2" : "#fcfcfc",
              })}
              to={"/products"}
            >
              <span>
                <ClothesIcons colors={""} />
              </span>
              <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                Одежда
              </span>
            </NavLink>
          </div>
        </div>
        <div className="w-[calc(100%-300px)] h-full ml-[300px]">
          {/* <Outlet /> */}
          <RouterList />
        </div>
      </div>
    </div>
  );
}
