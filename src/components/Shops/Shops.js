import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BgSelectSkin, CopyIcon, StarLabel } from "../../assets/icons";
import AddBtn from "../Products/AddingProductPageTwo/AddingProduct/AddBtn/AddBtn";

export default function Shops() {

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


  return (
    <div className="w-full px-4 md:px-[250px] mt-6 md:mt-12">
      <div className="text-center mb-6 md:mb-[50px] text-5 md:text-[35px] font-AeonikProMedium">
        Создать магазин
      </div>
      <div className="relative w-full h-[200px] md:h-[360px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">
        <Link to="#" className="flex items-center justify-center">
          <span className="text-sm font-AeonikProMedium border-b border-textBlueColor text-textBlueColor mr-[5px]">
            выберите облошка
          </span>
          <BgSelectSkin />
        </Link>
        <div className="absolute -bottom-11 md:bottom-[-64px] bg-white left-[30px] md:left-10 w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">
          <Link
            to="#"
            className="text-[11px] md:text-sm font-AeonikProMedium text-textBlueColor p-3"
          >
            выберите Логотип
            <span className="absolute top-[47px] left-[67px] md:left-[95px] md:top-[70px]"><StarLabel /> </span>
          </Link>
        </div>
      </div>
      <form
        action="#"
        className="w-full flex flex-col items-center justify-between mb-10 md:mb-24"
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
                        <span className="ml-[5px]"><StarLabel /> </span>
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
                        <span className="ml-[5px]"><StarLabel /> </span>
                    </label>
                    <div  className="w-[60%] md:w-[70%] md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                        {genderCategory.map((data) => {
                            return(
                                <button type="button" 
                                    key={data.id} 
                                    onClick={() => handleGenderCheck(data.id)}
                                    className={`w-1/3 md:w-full flex items-center justify-center active:scale-95  border md:border-0 text-xs md:text-base font-AeonikProRegular md:my-[3px] md:mx-[3px] md:px-[12px] py-[8px] md:py-[10px] rounded-lg
                                    ${
                                        data.action
                                        ?" h-full border-none py-[10px] bg-textBlueColor md:bg-btnLightBlueColor text-white md:text-textBlueColor my-auto mx-auto border-searchBgColor rounded-lg"
                                        : ""
                                    }    
                                    `}
                                >
                                    {data.gender}
                                </button>                            
                                )
                            })
                        }
                    </div>
                </div>
                <div className="w-full flex items-center justify-between gap-x-[15px] md:gap-x-[30px] ">
                    <label
                        htmlFor="shopName"
                        className="w-[40%] md:w-[30%] flex items-center text-xs md:text-base text-mobileTextColor font-AeonikProRegular"
                    >
                        Метод доставки
                        <span className="ml-[5px]"><StarLabel /></span>
                    </label>
                    <div className="w-[60%] md:w-[70%] flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                        <button type="button" className="group w-[28%] md:w-1/4 active:scale-95 focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg py-2 md:px-[15px] md:py-3">
                        <span className="group-focus:text-white text-xs md:text-base">
                            Такси
                        </span>
                        </button>
                        <button type="button" className="group w-[72%] md:w-3/4 active:scale-95 group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg py-2 md:px-[15px] md:py-3">
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
                    >
                    </textarea>
                    <span className="absolute cursor-pointer right-[6px] bottom-[12px] active:scale-90">
                        <AddBtn/>
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
                    >
                    </textarea>
                    <span className="absolute cursor-pointer right-[6px] bottom-[12px] active:scale-90">
                        <AddBtn/>
                    </span>
                </div>
                <div className="w-full flex items-end justify-end mt-2">
                    <p className="text-sm md:text-base font-AeonikProMedium text-mobileTextColor">Воспользоваться <Link to="https://translate.google.com/?sl=ru&tl=uz&op=translate" className="text-textBlueColor border-b border-textBlueColor font-AeonikProMedium ml-3">Google переводчиком</Link></p>
                </div>
            </div>
        </div>

        <Link
          className="inline-block px-[100px] py-[15px] bg-textBlueColor text-white rounded-lg active:scale-95"
          to={"/addshop"}
        >
          Создать магазин
        </Link>
      </form>
    </div>
  );
}
