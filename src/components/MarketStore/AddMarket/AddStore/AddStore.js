import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BgSelectSkin, GoBackIcons, StarLabel } from "../../../../assets/icons";
import AddBtn from "../../../Products/AddingProductPageTwo/AddingProduct/AddBtn/AddBtn";
import { AiOutlineLeft } from "react-icons/ai";

function AddStore({ onClick }) {
  const navigate = useNavigate();
  const [uploadImg, setUploadImg] = useState(null);
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
    <div className="w-full md:max-w-[1120px] md:mx-auto px-4 mt-6 md:mt-12">
      <div className=" flex  items-center justify-center  mb-6">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="  md:hidden flex items-center absolute left-2 cursor-pointer justify-center "
        >
          <GoBackIcons />
        </button>
        <div className="text-center text-tableTextTitle2 text-xl  md:mb-[50px] md:text-[35px] not-italic font-AeonikProMedium">
          Создать магазин
        </div>
      </div>{" "}
      <div className="mb-3">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
        >
          <AiOutlineLeft />
        </button>
      </div>
      <div className="relative w-full h-[200px] md:h-[360px] border-2 border-dashed flex items-center justify-center rounded-lg mb-[69px] md:mb-20">
        {uploadImg ? (
          <img
            src={uploadImg}
            className="w-full h-full object-cover rounded-lg"
            alt=""
          />
        ) : (
          <button className="flex items-center justify-center ">
            <label
              htmlFor="DataImg"
              className="text-sm font-AeonikProMedium cursor-pointer border-b border-textBlueColor text-textBlueColor mr-[5px]"
            >
              выберите облошка
              <input
                className="hidden"
                value={uploadImg}
                onChange={(e) => setUploadImg(e.target.value)}
                id="DataImg"
                type="file"
                accept=" image/*"
              />
            </label>
            <BgSelectSkin />
          </button>
        )}
        <div className="absolute -bottom-11 md:bottom-[-64px] bg-white left-[30px] md:left-10 w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">
          <Link
            to="#"
            className="text-[11px] md:text-sm font-AeonikProMedium text-textBlueColor p-3"
          >
            выберите Логотип
            <span className="absolute top-[47px] left-[67px] md:left-[95px] md:top-[70px]">
              <StarLabel />{" "}
            </span>
          </Link>
        </div>
      </div>
      {/* Form */}
      <form
        action="#"
        className="w-full flex flex-col items-center justify-between  "
      >
        <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10">
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
                                                    ${data.action
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
                  className="group w-[28%] md:w-1/4  focus:bg-textBlueColor font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Такси
                  </span>
                </button>
                <button
                  type="button"
                  className="group w-[72%] md:w-3/4  group-focus:text-white focus:bg-textBlueColor text-base font-AeonikProRegular border border-borderColor2 rounded-lg h-[32px] md:h-[42px] flex items-center justify-center"
                >
                  <span className="group-focus:text-white text-[10px] ls:text-[12px] md:text-base">
                    Собственная доставка
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex items-center justify-center mb-10 md:mb-24">
        <button
          onClick={onClick}
          className="inline-block w-full md:w-fit text xs:px-[100px] flex items-center justify-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >
          Создать магазин
        </button>
      </div>
    </div>
  );
}
export default React.memo(AddStore);
