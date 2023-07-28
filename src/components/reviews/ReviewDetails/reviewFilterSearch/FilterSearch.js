import React, { useState } from "react";
import {
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../assets/icons";
import { Popover } from "antd";
import { BiChevronDown } from "react-icons/bi";

export default function FilterSearch() {
  const [state, setState] = useState({
    openwear: false,
    openPrice: false,
    textToColor: false,
  });

  // ----------------Wear state management----------------------------

  const handleOpenChangeWear = (newOpen) => {
    setState({ ...state, openwear: newOpen });
  };

  const handleWearValue = (value) => {
    setState({ ...state, openwear: false });
  };

  // const filterStar = [
  //   { id: 1, type: "All Clothing types" },
  //   { id: 2, type: "Headwear" },
  //   { id: 3, type: "Outwear" },
  //   { id: 4, type: "Underwear" },
  //   { id: 5, type: "Legwear" },
  //   { id: 6, type: "Accessory" },
  // ];
  const [filterStar, setFilterStar] = useState([
    { id: 1, checked: false, starValue: 5, starFree: 0, valueCount: 100 },
    { id: 2, checked: false, starValue: 4, starFree: 1, valueCount: 70 },
    { id: 3, checked: false, starValue: 3, starFree: 2, valueCount: 60 },
    { id: 4, checked: false, starValue: 2, starFree: 3, valueCount: 50 },
    { id: 5, checked: false, starValue: 1, starFree: 4, valueCount: 20 },
  ]);
  const handleFilterStar = (id) => {
    setFilterStar((current) => {
      return current.map((data) => {
        if (data?.id === id) {
          return { ...data, checked: !data?.checked };
        } else {
          return { ...data };
        }
      });
    });
  };
  const contentWear = (
    <div className="w-[220px] h-fit m-0 p-0">
      <div className="flex flex-col gap-y-3">
        {filterStar.map((data) => {
          return (
            <div
              onClick={() => handleFilterStar(data?.id)}
              className="w-full h-5 flex items-center cursor-pointer"
            >
              <button
                className={`h-4 w-4 rounded-[2px] overflow-hidden flex items-center justify-center  ${
                  data?.checked
                    ? "border border-textBlueColor bg-textBlueColor"
                    : "border border-lightBorderColor"
                }`}
              >
                {data?.checked ? <CheckTrue /> : null}
              </button>
              <article className="flex items-center ml-[10px]">
                <span className="text-gray-700 text-base not-italic font-AeonikProRegular">
                  {data?.starValue}
                </span>
                <span className="flex items-center ml-[5px] gap-x-[2px]">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </span>
                <span className="flex items-center  gap-x-[2px]">
                  <StarOutlineIcon />
                  <StarOutlineIcon />
                </span>
              </article>
              <p className="ml-[15px] text-gray-700 text-base not-italic font-AeonikProRegular">
                ({data?.valueCount})
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full pt-5 mt-5 border-t border-lightBorderColor flex items-center justify-between">
        <span
          onClick={() => setState({ ...state, openwear: false })}
          className="h-8 w-[49%]  text-base not-italic font-AeonikProMedium flex items-center justify-center cursor-pointer text-tableTextTitle2 hover:text-textBlueColor text-center"
        >
          Отмена
        </span>
        <span className="h-8 w-[1px] bg-lightBorderColor"></span>
        <span
          onClick={() => setState({ ...state, openwear: false })}
          className="h-8 w-[49%]  text-base not-italic font-AeonikProMedium flex items-center justify-center cursor-pointer text-tableTextTitle2 hover:text-textBlueColor text-center"
        >
          Готово
        </span>
      </div>
    </div>
  );

  // ----------------------Price State Management----------------------

  return (
    <div className="w-full border-b border-lightBorderColor flex justify-between py-6">
      <div className="w-fit  flex items-center">
        <span
          className="text-tableTextTitle2 text-2xl not-italic font-AeonikProMedium
"
        >
          Подробнее о товаре
        </span>
      </div>
      <div className="w-fit flex gap-x-[30px]  ">
        <Popover
          open={state?.openwear}
          onOpenChange={handleOpenChangeWear}
          className="w-[244px] h-10 overflow-hidden cursor-pointer border border-lightBorderColor flex items-center justify-between px-[10px] rounded-[12px] "
          trigger="click"
          options={["Hide"]}
          placement="bottom"
          content={contentWear}
        >
          <p className="text-textLightColor text-sm not-italic font-AeonikProMedium">
            Фильтр рейтинг
          </p>
          <span>
            <BiChevronDown
              size={20}
              style={{ color: "#c2c2c2" }}
              className={`${
                state?.openwear ? "rotate-[-180deg]" : ""
              } duration-200`}
            />
          </span>
        </Popover>
        <div className="w-[350px]  h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-[12px]">
          <input
            type="text"
            className="w-full h-full  outline-0	"
            placeholder="Поиск"
          />
          <button>
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
