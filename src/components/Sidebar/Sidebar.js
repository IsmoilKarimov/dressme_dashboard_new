import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ClothesIcons,
  LocationIcon,
  NavbarMarketIcon,
  NavbarReviewIcon,
  NavbarUserIcon,
  UserExitIcon,
  UserIcon,
} from "../../assets/icons";
import { dressMainData } from "../../hook/ContextTeam";
import { useHttp } from "../../hook/useHttp";
import { useQuery } from "@tanstack/react-query";

function Sidebar() {
  const { request } = useHttp()
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [userData, setUserData] = useState(null)
  useQuery(["Get_Seller_Profile_dash"], () => { return request({ url: "/profile", token: true }); },
    {
      onSuccess: (res) => {
        setUserData(res)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  return (
    <div
      className={`relative hidden md:block w-[300px] h-[100vh] fixed top-0 left-0  border border-lightBorderColor bg-lightBgColor
    `}
    >

      <div className="flex flex-wrap content-between w-full h-full pb-10">
        <div className="w-full pt-5  px-2 flex flex-wrap gap-y-[44px]">
          <div
            className="w-full h-fit select-none  flex items-center gap-x-4 pl-2 cursor-pointer"
          >
            <button className="md:w-[56px] md:h-[56px] rounded-full md:border border-lightBorderColor bg-white flex items-center justify-center">
              <NavbarUserIcon colors="#c5c5c5" />
            </button>
            <span className="text-black flex items-center gap-x-2 text-xl not-italic font-AeonikProRegular">
              <span>{userData?.name || "Ism"}</span>
              <span>{userData?.surname || "Familiya"}</span>
              {/* <span>Ism familiya</span> */}

            </span>
          </div>

          {/* Links */}
          {dressInfo?.isAuthen ? (
            <div className="w-full flex flex-wrap gap-y-2">
              {" "}
              <NavLink
                className={
                  "w-full  hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/reviews"}
              >
                {({ isActive }) =>
                  isActive ? (
                    <figure className="flex h-full gap-x-[15px] items-center justify-center">
                      <NavbarReviewIcon colors={"#007dca"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Отзывы
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                      <NavbarReviewIcon colors={"#2c2c2c"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Отзывы
                      </p>
                    </figure>
                  )
                }
              </NavLink>
              <NavLink
                className={
                  "w-full  hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/store"}
              >
                {({ isActive }) =>
                  isActive ? (
                    <figure className="flex h-full gap-x-[15px] items-center justify-center">
                      <NavbarMarketIcon colors={"#007dca"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Магазины
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                      <NavbarMarketIcon colors={"#2c2c2c"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Магазины
                      </p>
                    </figure>
                  )
                }
              </NavLink>
              <NavLink
                className={
                  "w-full  hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/locations-store"}
              >
                {({ isActive }) =>
                  isActive ? (
                    <figure className="flex h-full gap-x-[15px] items-center justify-center">
                      <LocationIcon colors={"#007dca"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Локации
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                      <LocationIcon colors={"#2c2c2c"} />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Локации
                      </p>
                    </figure>
                  )
                }
              </NavLink>
              <NavLink
                className={
                  "w-full hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
                }
                style={({ isActive }) => ({
                  background: isActive ? "#f2f2f2" : "#fcfcfc",
                })}
                to={"/products"}
              >
                {({ isActive }) =>
                  isActive ? (
                    <figure className="flex h-full gap-x-[15px] items-center justify-center pl-1">
                      <ClothesIcons
                        colors={"#007dca"}
                        className="ml-[2px] "
                      />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Товары
                      </p>
                    </figure>
                  ) : (
                    <figure className=" flex h-full gap-x-[15px] items-center justify-center pl-1">
                      <ClothesIcons
                        colors={"#2c2c2c"}
                        className="ml-[2px] "
                      />
                      <p className="text-lg not-italic font-AeonikProMedium leading-5">
                        Товары
                      </p>
                    </figure>
                  )
                }
              </NavLink>
            </div>
          )
            : (
              <div className="w-full flex flex-wrap gap-y-2">
                {" "}
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <NavbarReviewIcon colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Отзывы
                  </span>
                </p>
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <NavbarMarketIcon colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Магазины
                  </span>
                </p>
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <LocationIcon colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Локации
                  </span>
                </p>
                <p
                  className={
                    "w-full h-[54px] gap-x-[15px] text-borderColor2 px-[25px]  flex items-center justify-start capitalize"
                  }
                >
                  <span>
                    <ClothesIcons colors="#c5c5c5" />
                  </span>
                  <span className=" text-lg not-italic font-AeonikProMedium leading-5">
                    Одежда
                  </span>
                </p>
              </div>)}


          {/* <div className="w-full">
            <div className="w-full flex items-center justify-center">
              {dressInfo.isItPorduct ? (
                <button
                  onClick={() =>
                    setDressInfo({ ...dressInfo, isItPorduct: false })
                  }
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-green-400"
                >
                  has Product
                </button>
              ) : (
                <button
                  onClick={() =>
                    setDressInfo({ ...dressInfo, isItPorduct: true })
                  }
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-red-400"
                >
                  no Product
                </button>
              )}
            </div>
            <div className=" w-full">
              {dressInfo.isAuthen ? (
                <button
                  onClick={() =>
                    setDressInfo({ ...dressInfo, isAuthen: false })
                  }
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-green-400"
                >
                  has authentication
                </button>
              ) : (
                <button
                  onClick={() => setDressInfo({ ...dressInfo, isAuthen: true })}
                  className="w-full py-3 px-5 mx-auto mt-10 rounded-lg flex items-center justify-center bg-red-400"
                >
                  no authentication
                </button>
              )}
            </div>
          </div> */}

        </div>

        <div className="w-full px-2  flex flex-col gap-y-1">
          <NavLink
            className={
              "w-full hover:bg-lightBgColor h-[54px] gap-x-[15px] px-[25px] bg-lightBorderColor rounded-lg flex items-center justify-start capitalize"
            }
            style={({ isActive }) => ({
              background: isActive ? "#f2f2f2" : "#fcfcfc",
            })}
            to="/edit-profile"
          >
            {({ isActive }) =>
              isActive ? (
                <figure className="flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#007dca"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Профиль
                  </p>
                </figure>
              ) : (
                <figure className=" flex h-full gap-x-[15px] items-center justify-center">
                  <UserIcon colors={"#2c2c2c"} />
                  <p className="text-lg not-italic font-AeonikProMedium leading-5">
                    Профиль
                  </p>
                </figure>
              )
            }
          </NavLink>
          <button
            onClick={() => setDressInfo({ ...dressInfo, logOutSeller: true })}
            className="w-full group h-fit cursor-pointer py-3 px-[25px] hover:bg-lightBorderColor rounded-lg  flex items-center gap-x-4">
            <UserExitIcon colors={"#FF4343"} />{" "}
            <span
              className={` text-black text-redText text-lg not-italic font-AeonikProMedium leading-5`}
            >
              Выйти
            </span>
          </button>

        </div>
      </div>
    </div >
  );
}
export default React.memo(Sidebar)
