import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { GoBackIcons, LocationIcon, StarLabel } from "../../../assets/icons";
import { adidas, backImg } from "../../../assets";
import { message } from "antd";
import { AiOutlineLeft } from "react-icons/ai";

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
  // const warning = () => {
  //   messageApi.open({
  //     type: "warning",
  //     content: "Delete",
  //   });
  // };
  const navigate = useNavigate();
  const goStore = (id) => {
    navigate(`/store`);
  };
  const goLocation = (id) => {
    navigate(`/locations-store`);
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
    <div className="w-full mx-auto md:max-w-[1120px]   md:mt-12 ">
      <div className="text-center mb-3 md:mb-[22px] text-5 md:text-[35px] font-AeonikProMedium">
        <div className="mt-3 md:hidden flex">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="  md:hidden flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
        </div>{" "}
        <div>
          <span className="md:hidden block text-tableTextTitle2 text-xl not-italic font-AeonikProMedium">
            Создать магазин
          </span>{" "}
          <span className="md:block hidden">Магазины </span>
        </div>
      </div>
      <div className="w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-[8px] md:border-0 border-b border-borderColor">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <AiOutlineLeft />
        </button>
        <div className="flex items-center gap-x-[8px] xs:gap-x-[15px]">
          <NavLink
            to="/store/location-add"
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[10px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
          >
            Добавить локацию
          </NavLink>
          <span className="w-[2px] h-[12px] xs:h-[14px] bg-borderColor"></span>
          <NavLink
            to="/store/market-add"
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[10px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
          >
            Создать новый магазин
          </NavLink>
          <span className="w-[2px] h-[12px] xs:h-[14px] bg-borderColor"></span>
          <button
            onClick={success2}
            className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[10px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
          >
            Удалить
          </button>
        </div>
      </div>
      <div className="relative w-full md:h-[360px] h-[200px] md:h-fit flex items-center   justify-center rounded-lg ">
        <img
          src={backImg}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
        <div className="absolute bottom-[-30px] ll:-bottom-11  md:bottom-[-60px] z-[20] bg-white overflow-hidden left-[15px] ll:left-[30px] md:left-10 w-[60px] h-[60px] ll:w-[80px] ll:h-[80px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full ">
          <img src={adidas} className="w-full h-full " alt="" />
        </div>
      </div>
      <div className="w-full flex items-center justify-end mb-[24px] md:mb-20 mt-4">
        <div className="flex items-center">
          <button onClick={goLocation} className="flex items-end gap-x-2">
            <span>
              <LocationIcon colors="#007dca" />
            </span>
            <span className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] ll:text-sm not-italic font-AeonikProMedium">
              Все локации
            </span>
          </button>
        </div>
      </div>
      {/* Form */}
      <form
        action="#"
        className="w-full flex flex-col items-center justify-between  "
      >
        <div className="w-full flex flex-col md:flex-row items-start justify-between mb-10 md:mb-[60px] gap-x-10">
          <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7">
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular
                                        "
              >
                Название магазина
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />{" "}
                </span>
              </label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                value={"Dressme"}
                placeholder="Введите название магазина"
                className="w-[70%] border border-borderColor2 outline-none h-[32px] md:h-[42px] px-3  rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular"
              />
            </div>
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] mb-5">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular"
              >
                Пол
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />{" "}
                </span>
              </label>
              <div className="w-[70%] md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                {genderCategory.map((data) => {
                  return (
                    <button
                      type="button"
                      key={data.id}
                      onClick={() => handleGenderCheck(data.id)}
                      className={`w-1/3 md:w-full flex items-center justify-center   border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular flex items-center justify-center h-[32px] md:h-[42px] rounded-lg
                                                    ${
                                                      data.action
                                                        ? " md:h-full border-none h-[32px] md:py-[10px] bg-textBlueColor md:bg-btnLightBlueColor text-white md:text-textBlueColor my-auto mx-auto border-searchBgColor rounded-lg"
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
            <div className="w-full flex items-center justify-between gap-x-[8px] md:gap-x-[30px] ">
              <label
                htmlFor="shopName"
                className="w-[40%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Метод доставки
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />
                </span>
              </label>
              <div className="w-[70%] flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                <button
                  type="button"
                  className="group w-[28%] md:w-1/4 active:scale-95 focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Такси
                  </span>
                </button>
                <button
                  type="button"
                  className="group w-[72%] md:w-3/4 active:scale-95 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Собственная доставка
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-2/5 md:flex flex-col items-start">
            <div className="w-full relative mb-[6px]">
              <div className="block mb-[5px] md:mb-1">
                <span className="text-[12px] md:text-base mr-2 font-AeonikProRegular">
                  Описание магазина на русском
                </span>
                <span className="text-[10px] ls:text-[12px]  md:text-[13px] font-AeonikProRegular md:font-AeonikProMedium text-textLightColor">
                  (не обязательно)
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
              <div className="block mb-[5px] md:mb-1">
                <span className="text-[12px] md:text-base mr-2 font-AeonikProRegular">
                  Описание магазина на узбекском
                </span>
                <span className="text-[10px] ls:text-[12px]  md:text-[13px] font-AeonikProRegular md:font-AeonikProMedium text-textLightColor">
                  (не обязательно)
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
              <p className="text-sm md:text-base font-AeonikProRegular md:font-AeonikProMedium text-mobileTextColor">
                Воспользоваться{" "}
                <Link
                  target={"_blank"}
                  to="https://translate.google.com/?sl=ru&tl=uz&op=translate"
                  className="text-textBlueColor border-b border-textBlueColor font-AeonikProRegular md:font-AeonikProMedium ml-3"
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
          className="inline-block px-[100px] flex items-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >
          Сохранить{" "}
        </button>
        {contextHolder}
      </div>
    </div>
  );
}
export default React.memo(MarketEdit);
