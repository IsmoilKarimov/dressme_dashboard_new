import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BgSelectSkin, GoBackIcons, MenuCloseIcons, StarLabel } from "../../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHttp } from "../../../../hook/useHttp";
import { ClipLoader, PuffLoader } from "react-spinners";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";

function AddStore({ shopsList, onRefetch }) {
  const navigate = useNavigate();
  const { request } = useHttp();
  const url = "https://api.dressme.uz/api/seller";
  const [state, setState] = useState({
    magazinName: null,
    genderType: null,
    checkGender: 1,
    deliverList: null,
    deliverCheck: 1,
    errorGroup: "",
    // ---ForImg
    pictureBgFile: "",
    pictureBgView: "",
    pictureLogoFile: "",
    pictureLogoView: "",
    // Loader
    sendingLoader: false,
  });
  const [backImgUploadModal, setBackImgUploadModal] = useState(false)

  const handleChange = (e) => {
    setState({
      ...state,
      pictureBgFile: e.target.files[0],
      pictureBgView: URL.createObjectURL(e.target.files[0]),
    });
  };
  const clearBgImg = () => {
    setState({
      ...state,
      pictureBgFile: '',
      pictureBgView: '',
    });
  }
  const handleChangeBrand = (e) => {
    setState({
      ...state,
      pictureLogoFile: e.target.files[0],
      pictureLogoView: URL.createObjectURL(e.target.files[0]),
    });
  };

  // ------------GET METHOD Gender-type-----------------
  useQuery(["get_genders_market"], () => {
    return request({ url: "/genders", token: true })
  },
    {
      onSuccess: (res) => {
        setState({ ...state, genderType: res?.genders });
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // ------------GET METHOD delivery-method-----------------
  useQuery(["get_delivery_method"], () => {
    return request({ url: "/delivery-method", token: true })
  },
    {
      onSuccess: (res) => {
        setState({ ...state, deliverList: res?.delivery_methods });
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const sendFunc = () => {
    setState({ ...state, sendingLoader: true })
    let form = new FormData();
    state?.magazinName && form.append("name", state?.magazinName);
    state?.pictureBgFile &&
      form.append("background_photo", state?.pictureBgFile);
    form.append("logo_photo", state?.pictureLogoFile);
    form.append("gender_id", state?.checkGender);
    form.append("delivery_id", state?.deliverCheck);
    return fetch(`${url}/shops/store`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.errors && res?.message) {
          setState({ ...state, errorGroup: res?.errors, sendingLoader: false });
        } else if (res?.message) {
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/store");
          onRefetch()

          setState({ ...state, sendingLoader: false })
        }

      })
      .catch((err) => {
        toast.error(`${err}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setState({ ...state, sendingLoader: false })

      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full md:max-w-[1120px] md:mx-auto px-4 mt-6 md:mt-12">
      <section
        onClick={() => { setBackImgUploadModal(false) }}
        className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${backImgUploadModal ? "" : "hidden"}`}
      ></section>
      {backImgUploadModal && (
        <div className="max-w-[650px] h-fit w-full fixed z-[223]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  flex items-center  justify-center mx-auto ">
          {/* </div> */}
          <div className="relative z-[224]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
            <div
              className={`flex items-center justify-between  pb-3`}
            >
              <div className="w-fit flex items-center">
                <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                  Выберите фото
                </span>
              </div>
              <button
                className="py-2"
                type="button"
                onClick={() => setBackImgUploadModal(false)}
              >
                <MenuCloseIcons colors={"#000"} />
              </button>
            </div>
            <div className="w-full h-[50vh] flex items-center justify-center border border-searchBgColor rounded-lg overflow-hidden">

              {state?.pictureBgView ? (
                <img
                  src={state?.pictureBgView}
                  alt="backImg"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) :
                <span className="leading-none text-lg md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                  Фоновое фото
                </span>
              }
            </div>
            <div className="flex items-center justify-between  pt-2">
              <label
                htmlFor={"imageThree1"}
                className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
              >
                <input
                  className="hidden"
                  id={"imageThree1"}
                  type="file"
                  onChange={handleChange}
                  accept=" image/*"
                />
                {state?.pictureBgView ?
                  "Изменить фото" :
                  "Загрузить фото"
                }

              </label>

              {state?.pictureBgView ?
                <button
                  onClick={() => clearBgImg()}
                  className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"                    >
                  Удалить
                </button>
                :
                <button
                  onClick={() => setBackImgUploadModal(false)}
                  className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"                    >
                  Oтмена
                </button>
              }
            </div>
          </div>
        </div>
      )}
      <div className="w-full flex items-center">
        {/* {shopsList?.shops?.data?.length >= 1 && ( */}
        <div className="flex md:hidden items-start">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="flex items-center cursor-pointer justify-center "
          >
            <GoBackIcons />
          </button>
        </div>
        {/* )} */}
        <div className="w-full text-center text-tableTextTitle2 text-xl mb-0 pr-6 md:pr-0 md:mb-[50px] md:text-[35px] not-italic font-AeonikProMedium">
          Создать магазин
        </div>
      </div>
      {/* {shopsList?.shops?.data?.length >= 1 && ( */}
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
      {/* )} */}
      <div className={`${state?.errorGroup?.logo_photo && !state?.pictureLogoView ? 'mb-10' : 'mb-[69px]'} relative w-full h-[200px] md:h-[360px] border-2 border-dashed flex items-center justify-center rounded-lg md:mb-20`}>
        <button type="button" onClick={() => setBackImgUploadModal(true)} className="h-full w-full flex items-center justify-center ">
          {state?.pictureBgView ? (
            <img
              src={state?.pictureBgView}
              alt="backImg"
              className="w-full h-full object-contain rounded-lg"
            />
          )
            :
            <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
              Фоновое фото
            </span>
          }
          {/* <label
            htmlFor="DataImg"
            className="h-full w-full  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
          >
            <input
              className="hidden"
              id="DataImg"
              type="file"
              onChange={handleChange}
              accept=" image/*"
            />
            {!state?.pictureBgView && (
              <>
                <span className="flex text-xl items-center flex-col justify-center">
                  Фото
                </span>
                {state?.errorGroup?.background_photo &&
                  !state?.pictureBgView && (
                    <p className="text-[#D50000] text-[12px] ll:text-[12px] md:text-base">
                      {state?.errorGroup?.background_photo}
                    </p>
                  )}
              </>
            )}
            {state?.pictureBgView && (
              <img
                src={state?.pictureBgView}
                alt="backImg"
                className="w-full h-full object-contain rounded-lg"
              />
            )}
          </label> */}
        </button>
        <div className="absolute -bottom-11 overflow-hidden md:bottom-[-64px] bg-white left-[30px] md:left-10 w-[90px] h-[90px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full border border-dashed">
          <button className="h-full w-full  rounded-full flex items-center justify-center ">
            <label
              htmlFor="DataImgBrand"
              className="h-full w-full flex items-center flex-col justify-center  text-sm font-AeonikProMedium cursor-pointer  text-textBlueColor"
            >
              <input
                className="hidden"
                id="DataImgBrand"
                type="file"
                onChange={handleChangeBrand}
                accept=" image/*"
              />
              {!state?.pictureLogoView && (
                <>
                  <span className="flex items-center flex-col justify-center px-2">
                    <div className="flex items-center md:w-[85px]">
                      Выберите логотип
                      <span className="hidden md:block">
                        <StarLabel />
                      </span>
                    </div>
                    <BgSelectSkin />
                  </span>
                  {state?.errorGroup?.logo_photo && !state?.pictureLogoView && (
                    <p className="hidden md:block text-[#D50000] text-[12px] ll:text-[12px] ">
                      {state?.errorGroup?.logo_photo}
                    </p>
                  )}
                </>
              )}
              {state?.pictureLogoView && (
                <img
                  src={state?.pictureLogoView}
                  alt="backImg"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </label>
          </button>
        </div>
      </div>
      {!state?.pictureBgView && (
        <>
          {state?.errorGroup?.logo_photo && !state?.pictureLogoView && (
            <p className="w-full flex mb-5 pl-6 md:hidden text-[#D50000] text-[12px] ll:text-[12px] ">
              {state?.errorGroup?.logo_photo}
            </p>
          )}
        </>
      )}

      {/* Form */}
      <div className="w-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10">
          <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7">
            <div className="w-full flex items-center justify-between md:gap-x-[30px] ">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Название магазина
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />
                </span>
              </label>
              <input
                type="text"
                name="shopName"
                id="shopName"
                value={state?.magazinName}
                onChange={(e) =>
                  setState({ ...state, magazinName: e.target.value })
                }
                placeholder="Введите название магазина"
                className="w-[65%] md:w-[70%] border border-borderColor2 outline-none h-[32px] md:h-[42px] px-3  rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular"
              />
            </div>
            <div className="w-full flex items-center justify-end">
              {state?.errorGroup?.name && !state?.magazinName && (
                <p className="text-[#D50000] text-[12px] ll:text-[14px] md:text-base">
                  {state?.errorGroup?.name}
                </p>
              )}
            </div>
            <div className="w-full flex items-center justify-between md:gap-x-[30px] my-5">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular"
              >
                Пол
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />{" "}
                </span>
              </label>
              <div className="w-[69%] md:w-[72%] radio-toolbar md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                {state?.genderType?.map((data) => {
                  return (
                    <>
                      <input
                        type="radio"
                        id={data?.id}
                        value={data?.id}
                        name="checkGender"
                        checked={data?.id === Number(state?.checkGender)}
                        onChange={(e) =>
                          setState({ ...state, checkGender: e.target.value })
                        }
                      />
                      <label
                        htmlFor={data?.id}
                        className={`w-1/3 cursor-pointer md:w-full flex items-center justify-center   border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular h-[32px] md:h-[42px] rounded-lg`}
                      >
                        <span>{data?.name_ru}</span>
                      </label>
                    </>
                  );
                })}
              </div>
            </div>
            <div className="w-full flex items-center justify-between md:gap-x-[30px] ">
              <label
                htmlFor="shopName"
                className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
              >
                Метод доставки
                <span className="ml-[5px] hidden md:block">
                  <StarLabel />
                </span>
              </label>
              <div className="w-[65%] md:w-[70%] radio-toolbar flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                {state?.deliverList?.map((data) => {
                  return (
                    <>
                      <input
                        type="radio"
                        id={data?.name_uz}
                        value={data?.id}
                        name="checkDeliver"
                        checked={data?.id === Number(state?.deliverCheck)}
                        onChange={(e) =>
                          setState({ ...state, deliverCheck: e.target.value })
                        }
                      />
                      <label
                        htmlFor={data?.name_uz}
                        className={`w-1/2 h-[32px] md:h-[42px] flex items-center justify-center text-center cursor-pointer md:px-3 border border-searchBgColor text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                      >
                        <span className="leading-none">{data?.name_ru}</span>
                      </label>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mb-10 md:mb-24">
        <button
          onClick={sendFunc}
          className="w-full md:w-fit text xs:px-[100px] flex items-center justify-center h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
        >

          {state?.sendingLoader ?
            <ClipLoader
              className="h-full py-[2px]"
              color={"#fff"}
              size={40}
              loading={true}
            /> : " Создать магазин "}
        </button>
      </div>
    </div>
  );
}
export default React.memo(AddStore);
