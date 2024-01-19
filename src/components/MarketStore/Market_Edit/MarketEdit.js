import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, GoBackIcons, LocationIcon, MenuCloseIcons, StarLabel } from "../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";

import { useHttp } from "../../../hook/useHttp";
import { FaCheck } from "react-icons/fa6";
import LoadingForSeller from "../../Loading/LoadingFor";

function MarketEdit() {
  const { request } = useHttp();
  const [state, setState] = useState({
    marketName: "",
    marketDeliverId: "",
    marketGenderId: "",
    marketId: "",
    pictureBgFile1: "",
    pictureBgView1: "",
    pictureBgViewTest: "",
    picturelogoFile2: "",
    picturelogoView2: "",
    checkGender: "",
    deliverCheck: "",
    // -----
    genderList: null,
    deliverList: null,
  });
  const [loaderEdit, setLoaderEdit] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [hideDeleteIcons, setHideDeleteIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openStoreList, setOpenStoreList] = useState(false);
  const [backImgUploadModal, setBackImgUploadModal] = useState(false);


  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      pictureBgFile1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0]),
    });
  };
  // const clearBgImg = () => {
  //   setState({
  //     ...state,
  //     pictureBgFile: null,
  //     pictureBgView: null,
  //   });
  // }
  const handleLocationImageTwo = (e) => {
    setState({
      ...state,
      picturelogoFile2: e.target.files[0],
      picturelogoView2: URL.createObjectURL(e.target.files[0]),
    });
  };

  const navigate = useNavigate();
  const pathname = window.location.pathname;
  let id = pathname.replace("/store/market-list/:", "");
  const url = "https://api.dressme.uz/api/seller";

  // // ------------GET  Has Magazin ?-----------------
  const { refetch } = useQuery(
    ["magazin"],
    () => {
      return request({ url: `/shops/${id}`, token: true });
    },
    {
      onSuccess: (res) => {
        setState({
          ...state,
          marketName: res?.shop?.name,
          deliverCheck: res?.shop?.delivery_id,
          checkGender: res?.shop?.gender_id,
          marketId: res?.shop?.id,
          pictureBgView1: res?.shop?.url_background_photo,
          pictureBgViewTest: res?.shop?.url_background_photo,
          picturelogoView2: res?.shop?.url_logo_photo,
        });
      },
      onError: (err) => {
        console.log(err, "err getDelivery-method");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // ------------GET METHOD Gender-type-----------------
  useQuery(
    ["get_genders"],
    () => {
      return request({ url: "/genders", token: true });
    },
    {
      onSuccess: (res) => {
        setState({ ...state, genderList: res?.genders });
      },
      onError: (err) => {
        console.log(err, "err getGenderlist-method");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // ------------GET METHOD delivery-method-----------------
  useQuery(
    ["get_delivery_method"],
    () => {
      return request({ url: "/delivery-method", token: true });
    },
    {
      onSuccess: (res) => {
        setState({ ...state, deliverList: res?.delivery_methods });
      },
      onError: (err) => {
        console.log(err, "err getDelivery-method");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );


  const deleteProductByAddress = useMutation(() => {
    return request({ url: `/shops/${id}`, method: "DELETE", token: true });
  });
  function onUserDelete() {
    setLoader(true)
    setHideDeleteIcons(true)
    deleteProductByAddress.mutate({},
      {
        onSuccess: res => {
          if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            // onRefetch()
            setTimeout(() => {
              setDeleteModal(false)
              navigate("/store");
            }, 2000);
          }

        },
        onError: err => {
          console.log(err);
        }
      })
  }
  const deleteProductByImage = useMutation(() => {
    return request({ url: `/shops/${id}/delete-shop-background-photo`, method: "DELETE", token: true });
  });

  function onUserDeleteBackgroundImg() {
    setLoader(true)
    setHideDeleteIcons(true)
    deleteProductByImage.mutate({},
      {
        onSuccess: res => {
          if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            refetch()
            setTimeout(() => {
              setBackImgUploadModal(false)
              setHideDeleteIcons(false)
            }, 1000);
          }

        },
        onError: err => {
          console.log(err);
        }
      })

    if (!state?.pictureBgViewTest) {
      setBackImgUploadModal(false)
      setState({
        ...state,
        pictureBgFile1: '',
        pictureBgView1: '',
      });
    }
  }

  // ---------Handle Edit---------
  const handleEditShops = () => {
    setLoaderEdit(true)
    let form = new FormData();
    form.append("name", state?.marketName);
    form.append("gender_id", state?.checkGender);
    form.append("delivery_id", state?.deliverCheck);
    state?.pictureBgFile1 &&
      form.append("background_photo", state?.pictureBgFile1);
    state?.picturelogoFile2 &&
      form.append("logo_photo", state?.picturelogoFile2);
    return fetch(`${url}/shops/edit/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: form,
    })
      .then((res) => res.json())
      .then((res) => {
        setLoaderEdit(false)
        if (res?.fields || res?.message) {
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
          refetch()

          // navigate("/store");
        }
      })
      .catch((err) => {
        setLoaderEdit(false)
        console.log(err, "errImage")
      });
  };

  const goLocation = (id) => {
    navigate(`/store/locations/shop/:${id}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full  h-full ">
      {loaderEdit ? <LoadingForSeller /> :
        <div className="w-full   h-full mx-auto md:max-w-[1120px]  md:mt-12   md:px-0 px-4">


          {/* <ToastContainer
        style={{ zIndex: "1000", top: "80px" }}
        position="top-right"
        autoClose={5000}
        limit={4}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      /> */}
          <section
            onClick={() => {
              setDeleteModal(false)
              setOpenStoreList(false)
              setSuccessMessage(null)
              // setDeleteMessage(null)
              // setHideProductList(false)
              setBackImgUploadModal(false)

            }}
            className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || backImgUploadModal ? "" : "hidden"}`}
          ></section>
          {/* Delete Product Of Pop Confirm */}
          <section
            className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
              }`}
          >
            <button
              onClick={() => setDeleteModal(false)}
              type="button"
              className="absolute  right-3 top-3 w-5 h-5 ">
              <MenuCloseIcons
                className="w-full h-full"
                colors={"#a1a1a1"} />
            </button>
            {hideDeleteIcons ?
              <div className="w-full flex items-center justify-center">
                {loader && hideDeleteIcons ?
                  <PuffLoader
                    // className={styles.loader1}
                    color={"#007DCA"}
                    size={80}
                    loading={true}
                  />
                  :
                  <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>
                    <span className="text-base not-italic font-AeonikProMedium">{SuccessMessage}</span>
                  </div>
                }
              </div>
              :
              <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={30} />
                  </span>
                </span>
                <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                  Вы уверены?
                </span>
              </div>

            }
            <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

              <button
                onClick={() => setDeleteModal(false)}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                Oтмена
              </button>
              <button
                onClick={() => onUserDelete()}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                Удалить </button>
            </div>

          </section>
          {/* Background Img Edit */}

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
                  {hideDeleteIcons ?
                    <div className="w-full flex items-center justify-center">
                      {loader && hideDeleteIcons ?
                        <PuffLoader
                          color={"#007DCA"}
                          size={80}
                          loading={true}
                        />
                        :
                        <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                          <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                            <FaCheck size={30} color="#009B17" />
                          </span>
                          <span className="text-base not-italic font-AeonikProMedium">{SuccessMessage}</span>
                        </div>
                      }
                    </div>
                    :
                    state?.pictureBgView1 ?
                      <img
                        src={state?.pictureBgView1}
                        alt="backImg"
                        className="w-full h-full object-contain rounded-lg"
                      />
                      :
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
                      onChange={handleLocationImageOne}
                      accept=" image/*"
                    />
                    {state?.pictureBgView1 ?
                      "Изменить фото" :
                      "Загрузить фото"
                    }

                  </label>


                  {state?.pictureBgView1 ?
                    <button
                      onClick={() => onUserDeleteBackgroundImg()}
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
          <div className="text-center mb-6 text-5 md:text-[35px] font-AeonikProMedium">
            <div className="mt-6 flex items-center justify-center  ">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
              >
                <GoBackIcons />
              </button>
              <div className="w-fit">
                <span className="md:hidden block text-tableTextTitle2 text-xl not-italic font-AeonikProMedium">
                  Создать магазин
                </span>
                <span className="md:block hidden">Магазины</span>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-2 md:border-0 border-borderColor">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="md:w-8 md:h-8 w-6 h-6 hidden md:flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
            >
              <AiOutlineLeft />
            </button>
            <div className="flex items-center gap-x-[8px] xs:gap-x-[15px]">
              <button
                onClick={() => setDeleteModal(true)}
                className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[10px] ls:text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
              >
                Удалить
              </button>
            </div>
          </div>
          <div className="relative w-full md:h-[360px] h-[200px] flex items-center  border border-[#f2f2f2]  justify-center rounded-lg ">
            <button
              type="button"
              onClick={() => setBackImgUploadModal(true)}
              className="h-full w-full  rounded-lg overflow-hidden flex items-center justify-center ">

              {!state?.pictureBgView1 ?
                <div className="w-fit h-fit flex items-center">
                  <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                    Фоновое фото
                  </span>

                </div>
                :
                <img
                  src={state?.pictureBgView1}
                  alt="backImg"
                  className="w-full h-full object-contain rounded-lg"
                />
              }
            </button>
            <div className="absolute bottom-[-30px] ll:-bottom-11 overflow-hidden border border-searchBgColor md:bottom-[-60px] z-[20] bg-white left-[15px] ll:left-[30px] md:left-10 w-[60px] h-[60px] ll:w-[80px] ll:h-[80px] md:w-[130px] md:h-[130px] flex items-center justify-center text-center rounded-full ">
              <button className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center">
                <label
                  htmlFor="DataImg2"
                  className="h-full w-full text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                >
                  <input
                    className="hidden"
                    id="DataImg2"
                    type="file"
                    onChange={handleLocationImageTwo}
                    accept=" image/*"
                  />
                  {!state?.picturelogoView2 && (
                    <div className="w-fit h-fit flex items-center">
                      <span className="leading-none text-[11px] flex md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                      </span>
                    </div>
                  )}
                  {state?.picturelogoView2 && (
                    <img
                      src={state?.picturelogoView2}
                      alt="backImg"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </label>
              </button>
            </div>
          </div>
          <div className="w-full flex items-center justify-end mb-[24px] md:mb-20 mt-4">
            <div className="flex items-center">
              <button
                onClick={() => goLocation(state?.marketId)}
                className="flex items-end gap-x-2"
              >
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
          <form className="w-full flex flex-col items-center justify-between  ">
            <div className="w-full flex flex-col md:flex-row items-center justify-center mb-10 md:mb-[60px] gap-x-10 ">
              <div className="w-full md:w-3/5 mb-[24px] md:mb-0 md:mt-7 ">
                <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] mb-5">
                  <label
                    htmlFor="shopName"
                    className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
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
                    value={state?.marketName}
                    onChange={(e) =>
                      setState({ ...state, marketName: e.target.value })
                    }
                    placeholder="Введите название магазина"
                    className="w-[65%] md:w-[70%] h-[32px] md:h-[42px] border border-borderColor2 outline-none px-3 rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular"
                  />
                </div>
                <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] mb-5">
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
                    {state?.genderList?.map((data) => {
                      return (
                        <>
                          <input
                            type="radio"
                            id={data?.id}
                            value={data?.id}
                            name="checkGender"
                            checked={data?.id === Number(state?.checkGender)}
                            onChange={() =>
                              setState({ ...state, checkGender: data?.id })
                            }
                          />
                          <label
                            htmlFor={data?.id}
                            className={`w-1/3 h-[32px] md:h-[42px] cursor-pointer md:w-full flex items-center justify-center border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                          >
                            <span>{data?.name_ru}</span>
                          </label>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] ">
                  <label
                    htmlFor="shopName"
                    className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular"
                  >
                    Метод доставки
                    <span className="ml-[5px] hidden md:block">
                      <StarLabel />
                    </span>
                  </label>
                  <div className="w-[65%] md:w-[70%] radio-toolbar  flex items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                    {state?.deliverList?.map((data) => {
                      return (
                        <>
                          <input
                            type="radio"
                            id={data?.name_uz}
                            value={data?.id}
                            name="checkDeliver"
                            checked={data?.id === Number(state?.deliverCheck)}
                            onChange={() =>
                              setState({ ...state, deliverCheck: data?.id })
                            }
                          />
                          <label
                            htmlFor={data?.name_uz}
                            className={`w-1/2 h-[32px] md:h-[42px] flex items-center justify-center text-center cursor-pointer md:px-3 border border-searchBgColor text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                          >
                            <span className="leading-normal">{data?.name_ru}</span>
                          </label>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="flex items-center justify-center mb-10 md:mb-24">
            <button
              onClick={handleEditShops}
              className="inline-block px-[100px] flex items-center justify-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
            >
              Сохранить{" "}
            </button>
          </div>
        </div>}
    </div>
  );
}
export default React.memo(MarketEdit);
