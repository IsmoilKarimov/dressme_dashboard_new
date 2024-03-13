import React, { createRef, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, GoBackIcons, LocationIcon, MenuCloseIcons, StarLabel } from "../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useHttp } from "../../../hook/useHttp";
import { FaCheck } from "react-icons/fa6";
import LoadingForSeller from "../../Loading/LoadingFor";
import axios from "axios";
import { dressMainData } from "../../../hook/ContextTeam";
import { HelperData } from "../../../hook/HelperDataStore";
import imageCompression from "browser-image-compression";
import { useTranslation } from "react-i18next";
import { LanguageDetectorDress } from "../../../language/LanguageItem";

const { REACT_APP_BASE_URL } = process.env;

function MarketEdit() {
  const { request } = useHttp();
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [helperDatainform, setHelperDatainform] = useContext(HelperData);

  const { t } = useTranslation("shops");
  const [languageDetector] = useContext(LanguageDetectorDress);

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
  const [backImgOrder, setBackImgOrder] = useState();


  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    try {
      const compressedFile = await imageCompression(imageFile, options);
      setState({
        ...state,
        pictureBgFile1: compressedFile,
        pictureBgView1: URL.createObjectURL(event.target.files[0]),
      });
    } catch (error) {
      console.log(error);
    }
  }

  const navigate = useNavigate();
  const pathname = window.location.pathname;
  let id = pathname.replace("/store/market-list/:", "");
  const url = "https://api.dressme.uz/api/seller";
  // ------------------------------------------------------------
  const [cropData, setCropData] = useState();
  const [image, setImage] = useState(cropData ? cropData : "");
  const [cropFile, setCropFile] = useState();

  const cropperRef = createRef();

  const onChange = (e) => {
    e.preventDefault();
    setState({
      ...state,
      pictureLogoFile: e.target.files[0],
      pictureLogoView: URL.createObjectURL(e.target.files[0]),
    });

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime, name: fileName });
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const croppedData = cropperRef.current?.cropper.getCroppedCanvas().toDataURL('image/jpeg');
      setCropFile(dataURLtoFile(croppedData, 'cropped_image.jpg'))
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      setBackImgUploadModal(false)
    }
  };
  // ------------------------------------------------------------

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
        setCropData(res?.shop?.url_logo_photo)
      },
      onError: (err) => {
        throw new Error(err || "something wrong");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // ------------GET METHOD delivery-method-----------------
  useEffect(() => {
    const fetchGender = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/genders`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          }
        });
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, genderList: data?.data?.genders })
        }
      } catch (error) {
      }
    };
    if (!dressInfo?.genderList) {
      fetchGender();
    }
    const fetchDelivery = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/delivery-method`, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,
          }
        });
        if (data?.status >= 200 && data?.status < 300) {
          setHelperDatainform({ ...helperDatainform, deliveryList: data?.data?.delivery_methods })

        }
      } catch (error) {
      }
    };
    if (!helperDatainform?.deliveryList) {
      fetchDelivery();
    }
  }, []);


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
          throw new Error(err || "something wrong");
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
          throw new Error(err || "something wrong");
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
    cropFile && form.append("logo_photo", cropFile);
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
          // setImage('')

          // navigate("/store");
        }
      })
      .catch((err) => {
        setLoaderEdit(false)
        throw new Error(err || "something wrong");
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
  const handleInputChange = (e) => {
    if (e.target.value) {
      setState({ ...state, marketName: e.target.value?.charAt(0).toUpperCase() + e.target.value?.slice(1) })
    } else {
      setState({ ...state, marketName: null })
    }
  }
  return (
    <div className="w-full  h-full ">
      {loaderEdit ? (
        <LoadingForSeller />
      ) : (
        <div className="w-full   h-full mx-auto md:max-w-[1120px]  md:mt-12  md:px-10 px-4">
          <section
            onClick={() => {
              setDeleteModal(false);
              setOpenStoreList(false);
              setSuccessMessage(null);
              setBackImgUploadModal(false);
            }}
            className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || backImgUploadModal ? "" : "hidden"}`}
          ></section>
          {/* Delete Product Of Pop Confirm */}
          <section
            className={` max-w-[440px] md:max-w-[550px] w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${
              deleteModal
                ? " bottom-0 md:flex"
                : "md:hidden bottom-[-800px] z-[-10]"
            }`}
          >
            <button
              onClick={() => setDeleteModal(false)}
              type="button"
              className="absolute  right-3 top-3 w-5 h-5 "
            >
              <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
            </button>
            {hideDeleteIcons ? (
              <div className="w-full flex items-center justify-center">
                {loader && hideDeleteIcons ? (
                  <PuffLoader color={"#007DCA"} size={80} loading={true} />
                ) : (
                  <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                    <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                      <FaCheck size={30} color="#009B17" />
                    </span>
                    <span className="text-base not-italic font-AeonikProMedium">
                      {SuccessMessage}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                  <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={30} />
                  </span>
                </span>
                <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                  {t("sure")}?
                </span>
              </div>
            )}
            <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
              <button
                onClick={() => setDeleteModal(false)}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
              >
                {t("cancel")}
              </button>
              <button
                onClick={() => onUserDelete()}
                type="button"
                className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
              >
                {t("delete")}
              </button>
            </div>
          </section>
          {/* Background Img Edit */}

          {backImgUploadModal && (
            <div className="max-w-[440px] md:max-w-[650px] h-fit w-full fixed z-[223]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  flex items-center  justify-center mx-auto ">
              {backImgOrder === 1 && (
                <div className="relative z-[224]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className={`flex items-center justify-between  pb-3`}>
                    <div className="w-fit flex items-center">
                      <span className="text-black text-sm md:text-lg not-italic font-AeonikProRegular leading-5">
                        {t("select_photo")}
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
                  <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center border border-searchBgColor rounded-lg overflow-hidden">
                    {hideDeleteIcons ? (
                      <div className="w-full flex items-center justify-center">
                        {loader && hideDeleteIcons ? (
                          <PuffLoader
                            color={"#007DCA"}
                            size={80}
                            loading={true}
                          />
                        ) : (
                          <div className="w-full flex gap-y-2 flex-col items-center justify-center ">
                            <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2">
                              <FaCheck size={30} color="#009B17" />
                            </span>
                            <span className="text-sm md:text-base not-italic font-AeonikProMedium">
                              {SuccessMessage}
                            </span>
                          </div>
                        )}
                      </div>
                    ) : state?.pictureBgView1 ? (
                      <img
                        src={state?.pictureBgView1}
                        alt="backImg"
                        className="w-full h-full object-contain rounded-lg"
                      />
                    ) : (
                      <span className="leading-none text-[12px]  md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                        {t("background_photo")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between  pt-2">
                    <label
                      htmlFor={"imageThree1"}
                      className="w-fit flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"imageThree1"}
                        type="file"
                        name="fileUpload1"
                        onChange={handleImageUpload}
                        accept=" image/*"
                      />
                      {state?.pictureBgView1
                        ? `${t("change_photo")}`
                        : `${t("upload_a_photo")}`}
                    </label>

                    {state?.pictureBgView1 ? (
                      <button
                        onClick={() => onUserDeleteBackgroundImg()}
                        className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                      >
                        {t("delete")}
                      </button>
                    ) : (
                      <button
                        onClick={() => setBackImgUploadModal(false)}
                        className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                      >
                        {t("cancel")}
                      </button>
                    )}
                  </div>
                </div>
              )}
              {backImgOrder === 2 && (
                <div className="relative z-[224]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
                  <div className={`flex items-center justify-between  pb-3`}>
                    <div className="w-fit flex items-center">
                      <span className="text-black text-sm md:text-lg not-italic font-AeonikProRegular leading-5">
                        {t("select_logo")}
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
                  <div className="w-full h-[40vh] md:h-[50vh] flex items-center justify-center border border-searchBgColor rounded-lg overflow-hidden">
                    {image ? (
                      <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                        dragMode="move"
                        aspectRatio={1}
                      />
                    ) : (
                      <span className="leading-none text-[12px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                        {t("select_logo")}{" "}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between  pt-2">
                    <label
                      htmlFor={"logoBrand"}
                      className="w-fit flex items-center justify-center cursor-pointer active:scale-95   text-textBlueColor text-sm md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"logoBrand"}
                        type="file"
                        name="fileUploadLogo"
                        onChange={onChange}
                        accept=" image/*"
                      />
                      {image
                        ? `${t("change_photo")}`
                        : `${t("upload_a_photo")}`}
                    </label>

                    {image && (
                      <button
                        className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   text-sm md:text-lg font-AeonikProMedium"
                        onClick={getCropData}
                      >
                        Обрезать
                      </button>
                    )}
                    <button
                      onClick={() => setBackImgUploadModal(false)}
                      className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-sm md:text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"
                    >
                      {t("cancel")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="text-center mb-6 text-5 md:text-[35px] font-AeonikProMedium">
            <div className="mt-6 flex items-center justify-center  ">
              <button
                onClick={() => {
                  navigate(-1);
                }}
                className="md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
              >
                <GoBackIcons />
              </button>
              <div className="w-fit">
                <span className="md:hidden block text-tableTextTitle2 text-xl not-italic font-AeonikProMedium">
                  {t("create_a_store")}
                </span>
                <span className="md:block hidden">{t("shops")}</span>
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
                {t("delete")}
              </button>
            </div>
          </div>
          <div className="relative w-full md:h-[360px] h-[200px] flex items-center  border border-[#f2f2f2]  justify-center rounded-lg ">
            <button
              type="button"
              onClick={() => {
                setBackImgOrder(1);
                setBackImgUploadModal(true);
              }}
              className="h-full w-full  rounded-lg overflow-hidden flex items-center justify-center "
            >
              {!state?.pictureBgView1 ? (
                <div className="w-fit h-fit flex items-center">
                  <span className="leading-none text-[12px] font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                    {t("background_photo")}
                  </span>
                </div>
              ) : (
                <img
                  src={state?.pictureBgView1}
                  alt="backImg"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </button>
            <div className="absolute bottom-[-30px] ll:-bottom-11 overflow-hidden border border-searchBgColor md:bottom-[-60px] z-[20] bg-white left-[15px] ll:left-[30px] md:left-10 w-[60px] h-[60px] ll:w-[80px] ll:h-[80px] md:w-[120px] md:h-[120px] flex items-center justify-center text-center rounded-full ">
              <button
                type="button"
                onClick={() => {
                  setBackImgOrder(2);
                  setBackImgUploadModal(true);
                }}
                className="h-full w-full  rounded-full flex items-center justify-center "
              >
                {cropData ? (
                  <img
                    src={cropData}
                    alt="backImg"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col item-center">
                    <span className="flex items-center flex-col justify-center px-2">
                      <div className="flex items-center md:w-[85px] text-[12px] md:text-sm font-AeonikProMedium cursor-pointer  text-textBlueColor">
                        {t("select_logo")}
                        <span className="hidden md:block">
                          <StarLabel />
                        </span>
                      </div>
                    </span>
                  </div>
                )}
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
                  {t("all_locations")}
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
                    {t("store_name")}
                    <span className="ml-[5px] hidden md:block">
                      <StarLabel />{" "}
                    </span>
                  </label>
                  <input
                    type="text"
                    name="shopName"
                    id="shopName"
                    value={state?.marketName}
                    onChange={handleInputChange}
                    placeholder={t("enter_store_name")}
                    className="w-[65%] md:w-[70%] h-[32px] md:h-[42px] border border-borderColor2 outline-none px-3 rounded-lg text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular"
                  />
                </div>
                <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] mb-5">
                  <div className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor mr-[5px] font-AeonikProRegular">
                    {t("gender")}
                    <span className="ml-[5px] hidden md:block">
                      <StarLabel />{" "}
                    </span>
                  </div>
                  <div className="w-[69%] md:w-[72%] radio-toolbar md:border md:border-borderColor2 outline-none text-base flex items-center justify-between rounded-lg gap-x-1 md:gap-x-0">
                    {dressInfo?.genderList?.map((data, index) => {
                      return (
                        <div className="w-[30%]" key={index}>
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
                            className={`h-[32px] md:h-[42px] cursor-pointer w-full flex items-center justify-center border md:border-0 text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                          >
                            <span>
                              {languageDetector?.typeLang === "ru" &&
                                data?.name_ru}
                              {languageDetector?.typeLang === "uz" &&
                                data?.name_uz}
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="w-full flex items-center justify-between gap-x-2 md:gap-x-[30px] ">
                  <div className="w-[35%] md:w-[30%] flex items-center text-[10px] ls:text-[12px] md:text-base text-mobileTextColor font-AeonikProRegular">
                    {t("delivery_method")}
                    <span className="ml-[5px] hidden md:block">
                      <StarLabel />
                    </span>
                  </div>
                  <div className="w-[65%] md:w-[70%] radio-toolbar grid grid-cols-2 items-center justify-between outline-none rounded-lg gap-x-1 md:gap-x-[14px]">
                    {helperDatainform?.deliveryList?.map((data, index) => {
                      return (
                        <div className="w-full " key={index}>
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
                            className={`w-full h-[32px] md:h-[42px] flex items-center justify-center text-center cursor-pointer md:px-3 border border-searchBgColor text-[10px] ls:text-[12px] md:text-base font-AeonikProRegular rounded-lg`}
                          >
                            <span className="leading-normal">
                              {languageDetector?.typeLang === "ru" &&
                                data?.name_ru}
                              {languageDetector?.typeLang === "uz" &&
                                data?.name_uz}
                            </span>
                          </label>
                        </div>
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
              className="px-[100px] flex items-center justify-center  md:w-fit w-full h-[42px] bg-textBlueColor text-white rounded-lg active:scale-95"
            >
              {t("save")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default React.memo(MarketEdit);
