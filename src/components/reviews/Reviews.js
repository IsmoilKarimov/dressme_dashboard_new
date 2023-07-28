import React, { useState } from "react";
import { ProductImg } from "../../assets";
import {
  CheckTrue,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../assets/icons";
import { DatePicker, Space, Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

const { RangePicker } = DatePicker;
export default function Reviews() {
  const productList = [
    {
      id: 1,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 2,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 3,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 4,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 5,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 6,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
    {
      id: 7,
      text: "Nike store official Dealer",
      starCount: 5,
      dateSend: "19 февраля 2023 г.",
      link: "Подробнее",
    },
  ];
  const navigate = useNavigate();
  const goDetail = (id) => {
    navigate(`/review-details/:${id}`);
  };
  const [state, setState] = useState({
    openwear: false,
    openPrice: false,
    textToColor: false,
  });

  const handleOpenChangeWear = (newOpen) => {
    setState({ ...state, openwear: newOpen });
  };
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

  return (
    <div className="w-full h-full px-10 py-1">
      <div className="w-full py-4 border-b border-lightBorderColor flex items-center justify-between">
        <section className="">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            С возвращением, Абдулазиз!
          </p>
        </section>
        <section className="flex items-center gap-x-[30px]">
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
          <Space direction="vertical" size={12}>
            <RangePicker />
          </Space>
        </section>
      </div>
      {/* Table */}
      <div className="w-full h-fit mt-7">
        <div className="w-full h-[60px]">
          <ul className="w-full h-full  flex items-center justify-between ">
            <li className="w-[20%] pl-5 ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Изображение
              </span>
            </li>
            <li className="w-[20%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Наименование товара
              </span>
            </li>
            <li className="w-[15%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Отзывы
              </span>
            </li>
            <li className="w-[15%] ">
              <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                Дата
              </span>
            </li>
            <li className="w-[30%] flex items-center justify-end ">
              <div className="max-w-[350px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-[12px]">
                <input
                  type="text"
                  className="w-full h-full  outline-0	"
                  placeholder="Поиск"
                />
                <button>
                  <SearchIcon />
                </button>
              </div>{" "}
            </li>
          </ul>
        </div>
        {/* table product */}
        <div className="w-full h-full overflow-hidden border border-lightBorderColor bg-lightBgColor rounded-[12px]">
          {productList.map((data) => {
            return (
              <ul className="w-full h-[95px] overflow-hidden border-b  border-borderColor flex items-center justify-between ">
                <li className="w-[20%] pl-5 h-full flex items-center ">
                  <figure>
                    <img src={ProductImg} alt="" />
                  </figure>
                </li>
                <li className="w-[20%] h-full flex items-center ">
                  <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                    {data?.text}
                  </span>
                </li>
                <li className="w-[15%] h-full flex items-center">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </li>
                <li className="w-[15%] h-full flex items-center ">
                  <span className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                    {data?.dateSend}
                  </span>
                </li>
                <li className="w-[30%] h-full flex items-center justify-end pr-[50px]">
                  <button
                    onClick={() => goDetail(data?.id)}
                    className="text-textBlueColor border-b border-textBlueColor  text-base not-italic font-AeonikProMedium"
                  >
                    {data?.link}
                  </button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
      Reviews
    </div>
  );
}
