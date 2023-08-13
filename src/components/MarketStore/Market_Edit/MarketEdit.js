import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LocationIcon, StarLabel } from "../../../assets/icons";
import { adidas, backImg } from "../../../assets";

import { message } from "antd";

function MarketEdit() {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Сохранить",
    });
  };
  const success2 = () => {
    messageApi.open({
      type: "success",
      content: "Удалить",
    });
  };

  const navigate = useNavigate();
  const goStore = (id) => {
    navigate(`/store`);
  };
  const goLocation = (id) => {
    navigate(`/store-location`);
  };
  const [genderCategory, setGenderCategory] = useState([
    {
      id: 1,
      action: true,
      gender: "Мужской",
    },
    {
      id: 2,
      action: false,
      gender: "Женский",
    },
    {
      id: 3,
      action: false,
      gender: "Унисекс",
    },
  ]);

  const handleGenderCheck = (value) => {
    setGenderCategory((data) => {
      return data.map((e) => {
        if (e.id == value) {
          return { ...e, action: true };
        } else return { ...e, action: false };
      });
    });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full px-4 md:px-[250px] mt-6 md:mt-12">
      <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
        Магазины{" "}
      </div>
      <div className="w-full flex items-center justify-end ">
        <div className="flex items-center gap-x-[15px]">
          <NavLink
            to="/store/location-add"
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium"
          >
            Добавить локацию
          </NavLink>
          <span className="w-[2px] h-[14px] bg-borderColor"></span>
          <NavLink
            to="/store/market-add"
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium"
          >
            Создать новый магазин
          </NavLink>
          <span className="w-[2px] h-[14px] bg-borderColor"></span>
          <button
            onClick={success2}
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium"
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="relative w-full h-[200px] md:h-[360px] flex items-center  justify-center rounded-lg ">
        <img src={backImg} className="w-full h-full" alt="" />
        <div className="absolute -bottom-11 md:bottom-[-60px] z-[20] bg-white overflow-hidden left-[30px] md:left-10 w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">
          <img src={adidas} className="w-full h-full " alt="" />
        </div>
      </div>
      <div className="w-full flex items-center justify-end mb-[69px] md:mb-20 mt-4">
        <div className="flex items-center">
          <button onClick={goLocation} className="flex items-end gap-x-2">
            <span>
              <LocationIcon colors="#007dca" />
            </span>
            <span className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-sm not-italic font-AeonikProMedium">
              Все локации
            </span>
          </button>
        </div>
      </div>
      <form
        action="#"
        className="w-full flex flex-col items-center justify-between  "
      >
        <div className="w-full flex flex-col md:flex-row items-start justify-between mb-10 md:mb-[60px] gap-x-10">
          <div className="w-full md:w-3/5 mb-[26px] md:mb-0 md:mt-7">
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-xs md:text-base text-mobileTextColor font-AeonikProRegular
                                        "
              >
                Название магазина
                <span className="ml-[5px]">
                  <StarLabel />{" "}
                </span>
              </label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                placeholder="Введите название магазина"
                className="w-[60%] md:w-[70%] border border-borderColor2 outline-none px-[15px] py-3 md:py-3 rounded-lg text-xs md:text-base font-AeonikProRegular"
              />
            </div>
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-xs md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular"
              >
                Пол
                <span className="ml-[5px]">
                  <StarLabel />{" "}
                </span>
              </label>
              <div className="w-[60%] md:w-[70%] md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                {genderCategory.map((data) => {
                  return (
                    <button
                      type="button"
                      key={data.id}
                      onClick={() => handleGenderCheck(data.id)}
                      className={`w-1/3 md:w-full flex items-center justify-center active:scale-95  border md:border-0 text-xs md:text-base font-AeonikProRegular md:my-[3px] md:mx-[3px] md:px-[12px] py-[8px] md:py-[10px] rounded-lg
                                                    ${
                                                      data.action
                                                        ? " h-full border-none py-[10px] bg-textBlueColor md:bg-btnLightBlueColor text-white md:text-textBlueColor my-auto mx-auto border-searchBgColor rounded-lg"
                                                        : ""
                                                    }    
                                                    `}
                    >
                      {data.gender}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] ">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-xs md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Метод доставки
                <span className="ml-[5px]">
                  <StarLabel />
                </span>
              </label>
              <div className="w-[60%] md:w-[70%] flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                <button
                  type="button"
                  className="group w-[28%] md:w-1/4 active:scale-95 focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg py-2 md:px-[15px] md:py-3"
                >
                  <span className="group-focus:text-white text-xs md:text-base">
                    Такси
                  </span>
                </button>
                <button
                  type="button"
                  className="group w-[72%] md:w-3/4 active:scale-95 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg py-2 md:px-[15px] md:py-3"
                >
                  <span className="group-focus:text-white text-xs md:text-base">
                    Собственная доставка
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 md:flex flex-col items-start">
            <div className="w-full relative mb-[6px]">
              <div className="block mb-3 md:mb-1">
                <span className="text-sm md:text-base mr-2 font-AeonikProRegular">
                  Описание магазина на русском
                </span>
                <span className="text-xs md:text-[13px] font-AeonikProRegular md:font-AeonikProMedium text-borderGrayColor">
                  (необязательно)
                </span>
              </div>
              <textarea
                name="storeDescription"
                id="storeDescription"
                className=" w-full h-[100px] text-[11px] md:text-[13px] bg-bgColor border border-borderColor2 outline-none rounded-lg p-3 resize-none"
                placeholder="Пишите здесь..."
              ></textarea>
              <span className="absolute cursor-pointer right-[6px] bottom-[12px] active:scale-90">
                {/* <AddBtn /> */}
              </span>
            </div>
            <div className="w-full relative">
              <div className="block mb-3 md:mb-1">
                <span className="text-sm md:text-base mr-2 font-AeonikProRegular">
                  Описание магазина на узбекском
                </span>
                <span className="text-xs md:text-[13px] font-AeonikProRegular md:font-AeonikProMedium text-borderGrayColor">
                  (необязательно)
                </span>
              </div>
              <textarea
                name="storeDescription"
                id="storeDescription"
                className=" w-full h-[100px] text-[11px] md:text-[13px] bg-bgColor border border-borderColor2 outline-none rounded-lg p-3 resize-none"
                placeholder="Пишите здесь..."
              ></textarea>
              <span className="absolute cursor-pointer right-[6px] bottom-[12px] active:scale-90">
                {/* <AddBtn /> */}
              </span>
            </div>
            <div className="w-full flex items-end justify-end mt-2">
              <p className="text-sm md:text-base font-AeonikProMedium text-mobileTextColor">
                Воспользоваться{" "}
                <Link
                  to="https://translate.google.com/?sl=ru&tl=uz&op=translate"
                  className="text-textBlueColor border-b border-textBlueColor font-AeonikProMedium ml-3"
                >
                  Google переводчиком
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center mb-10 md:mb-24">
        <button
          onClick={() => {
            goStore();
            success();
          }}
          className="inline-block px-[100px] py-[15px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >
          Сохранить{" "}
        </button>
        {contextHolder}
      </div>
    </div>
  );
}
export default React.memo(MarketEdit);
