import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  ArrowTopIcons,
  GoBackIcons,
  MenuCloseIcons,
  SearchIcon,
  StarLabel,
  MapLocationIcon,
  DeleteIcon,
} from "../../../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputMask from "react-input-mask";
import {
  YMaps,
  Map,
  ZoomControl,
  GeolocationControl,

} from "react-yandex-maps";

import { BiCheckDouble } from "react-icons/bi";
import { GrClose } from "react-icons/gr";
import { clsx } from "clsx";
import "../LocationAddById/yandexmapsStore.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PuffLoader from "react-spinners/PuffLoader";

import { useHttp } from "../../../../hook/useHttp";
import { FaCheck } from "react-icons/fa6";
import LoadingForSeller from "../../../Loading/LoadingFor";
export default function LocationMapCity() {
  const { request } = useHttp()
  const [state, setState] = useState({
    idAddress: "",
    idAssistantMessenger: "",
    idAssistantName: "",
    idAssistantPhone: "",
    idAssistantPhoneCode: "998",
    idSecondAssistantMessegner: "",
    idSecondAssistantName: "",
    idSecondAssistantPhone: "",
    idSecondAssistantPhoneCode: "998",
    idLongitudeById: "",
    idLatitudeById: "",
    idAssistantName: "",
    idShopId: "",
    idRegionId: "",
    idSupRregionId: "",
    idImageOne: "",
    idImageTwo: "",
    idImageThree: "",
    idWorkTimeFrom: "",
    idWorkTimeTo: "",
    // ---------------
    getRegionList: "",
    //------forImg
    pictureBgFile1: "",
    pictureBgView1: "",
    pictureBgView2: "",
    pictureBgFile2: "",
    pictureBgTest2: "",
    pictureBgView3: "",
    pictureBgFile3: "",
    pictureBgTest3: "",
    // ----

  })
  const [loaderEdit, setLoadingEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [hideDeleteIcons, setHideDeleteIcons] = useState(false);
  const [SuccessMessage, setSuccessMessage] = useState(null);
  const [loader, setLoader] = useState(false);
  const [openStoreList, setOpenStoreList] = useState(false);
  const handleLocationImageOne = (e) => {
    setState({
      ...state,
      pictureBgFile1: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0])
    });
  }

  const [pictureFile2, setPictureFile2] = useState('');
  const [pictureView2, setPictureView2] = useState('');
  const [pictureTest2, setPictureTest2] = useState('');
  const handleLocationImageTwo = (e) => {
    // setState({
    //   ...state,
    //   pictureBgFile2: e.target.files[0],
    //   pictureBgView2: URL.createObjectURL(e.target.files[0])
    // });
    setPictureFile2(e.target.files[0])
    setPictureView2(URL.createObjectURL(e.target.files[0]))
  }
  const handleLocationImageThree = (e) => {
    setState({
      ...state,
      pictureBgFile3: e.target.files[0],
      pictureBgView3: URL.createObjectURL(e.target.files[0])
    });
  }


  const [isSendedLocation, setIsSendedLocation] = useState(true);
  const [forMaps, setForMaps] = useState({
    title: "",
    center: [],
    zoom: 12,
  });
  const { id } = useParams();
  const NewId = id.replace(":", "");

  const navigate = useNavigate();

  const url = "https://api.dressme.uz/api/seller"

  // // ------------GET  Has Magazin ?-----------shops/locations/:id------
  // const { mutate } = useMutation(() => {
  //   return request({ url: `/shops/locations/${NewId}`, method: "DELETE", token: true });
  // });

  // const onLocaTionDelete = () => {
  //   mutate({},
  //     {
  //       onSuccess: res => {
  //         console.log(res, "location delte");
  //         toast.success(`${res?.message}`, {
  //           position: "top-right",
  //           autoClose: 3000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //         navigate("/locations-store")
  //       },
  //       onError: err => {
  //         console.log(err);
  //       }
  //     })
  // }

  const deleteProductByAddress = useMutation(() => {
    return request({ url: `/shops/locations/${NewId}`, method: "DELETE", token: true });
  });

  function onLocaTionDelete() {
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
              navigate("/locations-store");
            }, 2000);
          }

        },
        onError: err => {
          console.log(err);
        }
      })
  }



  // // ------------GET  location id?-----------------
  const { refetch } = useQuery(["location_index_id"], () => { return request({ url: `/shops/locations/${NewId}`, token: true }); },
    {
      onSuccess: (res) => {
        console.log(res, "res_id");
        if (res?.errors && res?.message) {
          // setLoader(false)
        } else if (res?.location) {
          setState({
            ...state,
            idAddress: res?.location?.address,
            idAssistantMessenger: res?.location?.assistant_messenger,
            idAssistantName: res?.location?.assistant_name,
            idSecondAssistantMessegner: res?.location?.second_assistant_messenger,
            idSecondAssistantName: res?.location?.second_assistant_name,
            idLecondAssistantPhone: res?.location?.second_assistant_phone,
            idLongitudeById: res?.location?.longitude,
            idLatitudeById: res?.location?.latitude,
            idShopId: res?.location?.shop_id,
            idRegionId: res?.location?.region_id,
            idSupRregionId: res?.location?.sub_region_id,
            idWorkTimeFrom: res?.location?.work_time_from,
            idWorkTimeTo: res?.location?.work_time_to,
            // -
            idAssistantPhoneCode: res?.location?.assistant_phone && res?.location?.assistant_phone?.slice(0, 3),
            idAssistantPhone: res?.location?.assistant_phone && res?.location?.assistant_phone?.slice(3, 12),
            // -
            idSecondAssistantPhoneCode: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(0, 3),
            idSecondAssistantPhone: res?.location?.second_assistant_phone && res?.location?.second_assistant_phone?.slice(3, 12),
            // --------ForImg
            pictureBgView1: res?.location?.url_image_path_one,
            // pictureBgView2: res?.location?.url_image_path_two,
            pictureBgTest2: res?.location?.url_image_path_two,
            pictureBgView3: res?.location?.url_image_path_three,
            pictureBgTest3: res?.location?.url_image_path_three,
          })
          setPictureView2(res?.location?.url_image_path_two)
          setForMaps({
            ...forMaps,
            title: res?.location?.address,
            center: [parseFloat(res?.location?.latitude?.slice(0, 9)), parseFloat(res?.location?.longitude?.slice(0, 9))]
          })
        }
      },
      onError: (err) => {
        console.log(err, "BU -- LocationMapCity -- Error");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  // console.log(state, "BuLocationMapCity");
  // ------------GET METHOD Region-----------------
  useQuery(["getRegionList_map_city"], () => { return request({ url: "/regions", token: true }); },
    {
      onSuccess: (res) => {
        setState({ ...state, getRegionList: res, })
      },
      onError: (err) => {
        console.log(err, "err get region");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [backImgUploadModal, setBackImgUploadModal] = useState(false);
  const [backImgOrder, setBackImgOrder] = useState('');
  const [openRegionModal, setOpenRegionModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0)
    } else {
      setActiveIndex(id)
    }
  }
  // ----------phone Number----------1
  const assistantPhoneNumberFirst = state.idAssistantPhoneCode?.split("+")?.join("") + state?.idAssistantPhone?.split("-")?.join("")?.split(")")?.join("")?.split("(")?.join("")?.split(" ")?.join("");
  const assistantPhoneNumberSecond = state.idSecondAssistantPhoneCode?.split("+")?.join("") + state?.idSecondAssistantPhone?.split("-")?.join("")?.split(")")?.join("")?.split("(")?.join("")?.split(" ")?.join("");
  // ----------phone Number----------2

  // -------------------------------------------Maps---------------------------------
  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true },
  };

  const [mapConstructor, setMapConstructor] = useState(null);
  const mapRef = useRef(null);
  const searchRef = useRef(null);

  const handleSubmit = () => {

    setForMaps({
      ...forMaps,
      title: forMaps?.title,
      center: [mapRef.current.getCenter()[0], mapRef.current.getCenter()[1]]
    })

    setIsSendedLocation(false);
  };
  // reset state & search
  const handleReset = () => {
    setForMaps({ ...forMaps, title: "" });
    searchRef.current.value = "";

  };

  // search popup
  useEffect(() => {

    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current).events.add(
        "select",
        function (e) {
          const selectedName = e.get("item").value;
          mapConstructor.geocode(selectedName).then((result) => {
            const newCoords = result.geoObjects
              .get(0)
              .geometry.getCoordinates();
            setForMaps((prevState) => ({ ...prevState, center: newCoords }));
          });
        }
      );
    }
  }, [mapConstructor]);

  // change title
  const handleBoundsChange = (e) => {
    setIsSendedLocation(true);

    const newCoords = mapRef.current.getCenter();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = forMaps.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setForMaps((prevState) => ({ ...prevState, title: foundAddress }));
      }
    });
  };

  // -------------------------------------------Maps---------------------------------
  const handleEditLocation = () => {
    setLoadingEdit(true)

    let form = new FormData()
    form.append("address", forMaps?.title);
    form.append("latitude", forMaps?.center[0]);
    form.append("longitude", forMaps?.center[1]);
    form.append("shop_id", state?.idShopId);
    form.append("region_id", state?.idRegionId);
    form.append("sub_region_id", state?.idSupRregionId);
    form.append("work_time_from", state?.idWorkTimeFrom);
    form.append("work_time_to", state?.idWorkTimeTo);
    form.append("assistant_name", state?.idAssistantName);
    form.append("assistant_phone", assistantPhoneNumberFirst);
    state?.idSecondAssistantName && form.append("second_assistant_name", state?.idSecondAssistantName);
    state?.idSecondAssistantPhone && state?.idSecondAssistantPhoneCode && form.append("second_assistant_phone", assistantPhoneNumberSecond);
    state?.pictureBgFile1 && form.append("shop_photo_one", state?.pictureBgFile1);
    // state?.pictureBgFile2 && form.append("shop_photo_two", state?.pictureBgFile2);
    pictureFile2 && form.append("shop_photo_two", pictureFile2);
    state?.pictureBgFile3 && form.append("shop_photo_three", state?.pictureBgFile3);
    return fetch(`${url}/shops/locations/edit/${NewId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('DressmeUserToken')}`,
      },
      body: form
    })
      .then((res) => res.json())
      .then(res => {
        console.log(res, "editL=City");
        setLoadingEdit(false)
        if (res?.message) {
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
          // navigate('/locations-store')
        }
      })
      .catch(err => {
        setLoadingEdit(false)
        console.log(err, "errImage")
      })
  }
  // const deleteProductByImage = useMutation(() => {
  //   return request({ url: `/shops/locations/${NewId}/delete-location-photo`, method: "DELETE", token: true });
  // }); locations/store
  // console.log(pictureFile2, "pictureFile2,");
  // console.log(pictureView2, "pictureView2,");
  // console.log(state?.pictureBgTest2, "state?.pictureBgTest2,");
  function onUserDeleteBackgroundImg() {

    if (state?.pictureBgTest2) {
      let form = new FormData();
      setLoader(true)
      setHideDeleteIcons(true)
      pictureView2 &&
        form.append("image_two", pictureView2);
      return fetch(`${url}/shops/locations/${NewId}/delete-location-photo`, {
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
            setLoader(false)
            // setBackImgUploadModal(false)
            setSuccessMessage(res?.message)

          } else if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            refetch()
            setTimeout(() => {
              setBackImgUploadModal(false)
              setHideDeleteIcons(false)
            }, 1000);
          }
        })
        .catch((err) => console.log(err, "errImage"));
    }
    if (state?.pictureBgTest3) {
      let form = new FormData();
      setLoader(true)
      setHideDeleteIcons(true)
      state?.pictureBgView3 &&
        form.append("image_three", state?.pictureBgView3);
      return fetch(`${url}/shops/locations/${NewId}/delete-location-photo`, {
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
            setLoader(false)
            // setBackImgUploadModal(false)
            setSuccessMessage(res?.message)

          } else if (res?.message) {
            setSuccessMessage(res?.message)
            setLoader(false)
            refetch()
            setTimeout(() => {
              setBackImgUploadModal(false)
              setHideDeleteIcons(false)
            }, 1000);
          }
        })
        .catch((err) => console.log(err, "errImage"));
    }
    console.log("ishga tushdi 1");
    if (!state?.pictureBgTest2) {
      // setState({
      //   ...state,
      //   pictureBgFile2: '',
      //   pictureBgView2: ''
      // });
      setPictureView2('')
      setPictureTest2('')
      setBackImgUploadModal(false)
      console.log("ishga tushdi 2");

    }
    if (!state?.pictureBgTest3) {
      setState({ ...state, pictureBgFile3: '', pictureBgView3: '' })
    }
  }
  // console.log(state?.pictureBgView2, "state?.pictureBgView2");
  // console.log(state?.pictureBgTest2, "state?.pictureBgTest2");
  // console.log(state?.pictureBgView3, "state?.pictureBgView3");
  // console.log(state?.pictureBgTest3, "state?.pictureBgTest3");


  // For DropUp
  useEffect(() => {
    if (openRegionModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openRegionModal]);

  // length
  return (
    <div className="w-full h-full ">
      {loaderEdit ? <LoadingForSeller /> :
        <div className="w-full md:px-10 ">
          <ToastContainer
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
          />
          <div className="w-full max-w-[920px] mx-auto mt-6 md:mt-12 mb-[30px]">
            <div
              onClick={() => {

                setOpenRegionModal(false)
              }}
              className={`fixed inset-0 z-[99999] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${openRegionModal ? "" : "hidden"
                }`}
            ></div>
            <section
              onClick={() => {
                setDeleteModal(false)
                setOpenStoreList(false)
                setSuccessMessage(null)
                // setDeleteMessage(null)
                // setHideProductList(false)
                setBackImgUploadModal(false)

              }}
              className={`fixed inset-0 z-[99999] duration-200 w-full h-[100vh] bg-black opacity-50
         ${deleteModal || openStoreList || backImgUploadModal ? "" : "hidden"}`}
            ></section>
            {/* Delete Product Of Pop Confirm */}
            <section
              className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[100000] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${deleteModal ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
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
                  onClick={() => onLocaTionDelete()}
                  type="button"
                  className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                  Удалить </button>
              </div>

            </section>
            {/* Background Img Edit */}
            {backImgUploadModal && backImgOrder && (
              <div className="max-w-[650px] h-fit w-full fixed z-[100000]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  flex items-center  justify-center mx-auto ">
                {/* </div> */}

                {backImgOrder === 1 && <div className="relative z-[100001]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
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
                          Фото
                        </span>
                    }
                  </div>
                  <div className="flex items-center justify-between  pt-2">
                    <label
                      htmlFor={"imageOne1"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"imageOne1"}
                        type="file"
                        onChange={handleLocationImageOne}
                        accept=" image/*"
                      />
                      {state?.pictureBgView1 ?
                        "Изменить фото" :
                        "Загрузить фото"
                      }
                    </label>
                    <button
                      onClick={() => setBackImgUploadModal(false)}
                      className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"                    >
                      Oтмена
                    </button>
                  </div>
                </div>}
                {backImgOrder === 2 && <div className="relative z-[100001]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
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
                      pictureView2 ?
                        <img
                          src={pictureView2}
                          alt="backImg"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        :
                        <span className="leading-none text-lg md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                          Фото
                        </span>
                    }
                  </div>
                  <div className="flex items-center justify-between  pt-2">
                    <label
                      htmlFor={"imageTwo2"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"imageTwo2"}
                        type="file"
                        onChange={handleLocationImageTwo}
                        accept=" image/*"
                      />
                      {pictureView2 ?
                        "Изменить фото" :
                        "Загрузить фото"
                      }
                    </label>
                    {pictureView2 ?
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
                </div>}
                {backImgOrder === 3 && <div className="relative z-[100001]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
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
                      state?.pictureBgView3 ?
                        <img
                          src={state?.pictureBgView3}
                          alt="backImg"
                          className="w-full h-full object-contain rounded-lg"
                        />
                        :
                        <span className="leading-none text-lg md:text-sm font-AeonikProRegular md:font-AeonikProMedium text-textBlueColor">
                          Фото
                        </span>
                    }
                  </div>
                  <div className="flex items-center justify-between  pt-2">
                    <label
                      htmlFor={"imagethree3"}
                      className="w-fit   flex items-center justify-center cursor-pointer  active:scale-95   text-textBlueColor   md:text-lg font-AeonikProMedium"
                    >
                      <input
                        className="hidden"
                        id={"imagethree3"}
                        type="file"
                        onChange={handleLocationImageThree}
                        accept=" image/*"
                      />
                      {state?.pictureBgView3 ?
                        "Изменить фото" :
                        "Загрузить фото"
                      }
                    </label>
                    {state?.pictureBgView3 ?
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
                </div>}
              </div>
            )}
            <div className="my-4 ">
              <div className="flex items-center justify-center mb-6">
                <button
                  onClick={() => {
                    navigate(-1);
                  }}
                  className="  md:hidden absolute left-2 flex items-center cursor-pointer justify-center "
                >
                  <GoBackIcons />
                </button>
                <div className="text-center text-xl md:text-[35px] font-AeonikProMedium md:px-0">
                  Редактировать местоположения
                </div>
              </div>
              <div className=" px-4 md:px-0 w-full flex items-center justify-end md:justify-between mb-2 md:mb-3 md:pb-0 pb-[8px] md:border-0 border-b border-borderColor">
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
                    to="/store/market-add"
                    className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
                  >
                    Одежда{" "}
                  </NavLink>
                  <span className="w-[2px] h-[12px] xs:h-[14px] bg-borderColor"></span>
                  <button
                    onClick={() => setDeleteModal(true)}
                    // onClick={onLocaTionDelete}
                    className="w-fit text-weatherWinterColor hover:underline cursor-pointer text-[12px] xs:text-sm not-italic font-AeonikProRegular xs:font-AeonikProMedium"
                  >
                    Удалить
                  </button>
                </div>
              </div>
              {/* Location of Maps edit page */}
              <div className="h-[400px]">
                <div className={`w-full `}>
                  <div className={"mapRoot"}>
                    <YMaps
                      query={{
                        apikey: "8b56a857-f05f-4dc6-a91b-bc58f302ff21",
                        lang: "uz",
                      }}
                    >
                      <Map
                        className={` overflow-hidden w-full h-full`}
                        {...mapOptions}
                        state={{
                          center: forMaps?.center,
                          zoom: forMaps?.zoom,
                          title: forMaps?.title
                        }}
                        // defaultState={forMaps}
                        onLoad={setMapConstructor}
                        onBoundsChange={handleBoundsChange}
                        instanceRef={mapRef}
                      >
                        <div className="h-fit p-1 md:p-[10px] absolute top-2 z-40 gap-x-5 mx-1 md:mx-2 backdrop-blur-sm bg-yandexNavbar left-0 right-0 flex items-center justify-between border px-1 md:px-3 rounded-lg">
                          <label
                            htmlFor="ForSearch"
                            className="w-[100%] h-full flex items-center justify-between bg-white  border border-textLightColor px-1 md:px-3 rounded-lg"
                          >
                            <input
                              ref={searchRef}
                              placeholder="Введите адрес"
                              id="ForSearch"
                              className={`w-full outline-none text-sm font-AeonikProMedium mr-3 h-10  rounded-lg ${!Boolean(forMaps?.title?.length) ? "" : "hidden"
                                }`}
                            />

                            <div
                              className={clsx(["titleBox"], {
                                ["titleBox_show"]: Boolean(forMaps?.title?.length),
                              })}
                            >
                              <p className=" w-[90%] "> {forMaps?.title} </p>
                            </div>


                            {forMaps?.title?.length ? (
                              <button
                                onClick={handleReset}
                                className="cursor-pointer flex items-center h-10 justify-center "
                              >
                                <GrClose className="pointer-events-none" />
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="cursor-pointer flex items-center h-10 justify-center "
                              >
                                <SearchIcon />
                              </button>
                            )}
                          </label>
                          {forMaps?.title?.length ? (
                            <button
                              type="button"
                              className="w-[40px] md:w-[150px] h-10 border cursor-pointer active:scale-95 px-3  flex items-center justify-center bg-textBlueColor text-white rounded-lg text-sm font-AeonikProMedium"
                              onClick={handleSubmit}
                              disabled={Boolean(!forMaps.title.length)}
                            >
                              {isSendedLocation ? (
                                <>
                                  {" "}
                                  <span className="md:flex hidden">Подтвердить</span>
                                  <span className="md:hidden flex">OK</span>
                                </>
                              ) : (
                                <span>
                                  <BiCheckDouble size={30} />
                                </span>
                              )}
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="w-[40px] md:w-[150px] h-10 px-3  flex items-center justify-center bg-borderColor text-textLightColor rounded-lg text-sm font-AeonikProMedium"
                            >
                              <span className="md:flex hidden">Подтвердить</span>
                              <span className="md:hidden flex">OK</span>{" "}
                            </button>
                          )}
                        </div>

                        <span className={"placemark"}>
                          <MapLocationIcon color="primary" />
                        </span>
                        <ZoomControl
                          options={{
                            float: "right",
                            position: { bottom: 200, right: 10, size: "small" },
                            size: "small",
                          }}
                        />{" "}
                        <GeolocationControl
                          options={{
                            float: "right",
                            position: { bottom: 60, right: 10 },
                            size: "small",
                          }}
                        />
                      </Map>
                    </YMaps>
                  </div>
                </div>
              </div>
              <div className=" px-4 md:px-0  flex mt-[10px] justify-between items-centers gap-x-[5px] ls:gap-x-[10px] md:gap-[25px] mb-[25px] ">
                <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setBackImgOrder(1)
                      setBackImgUploadModal(true)
                    }}
                    className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">

                    {state?.pictureBgView1 ?
                      <img src={state?.pictureBgView1} alt="backImg" className="w-full h-full object-contain rounded-lg" />
                      :
                      <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                      </span>
                    }
                  </button>
                </div>
                <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setBackImgOrder(2)
                      setBackImgUploadModal(true)
                    }}
                    className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center">
                    {pictureView2 ?
                      <img src={pictureView2} alt="backImg" className="w-full h-full object-contain rounded-lg" />
                      :
                      <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                      </span>
                    }
                  </button>
                </div>
                <div className=" w-full md:w-[31%]  h-[75px] md:h-[130px] flex items-center justify-center rounded-lg">
                  <button
                    onClick={() => {
                      setBackImgOrder(3)
                      setBackImgUploadModal(true)
                    }}
                    type="button"
                    className="h-full w-full border border-searchBgColor rounded-lg overflow-hidden flex items-center justify-center ">
                    {state?.pictureBgView3 ?
                      <img src={state?.pictureBgView3} alt="backImg" className="w-full h-full object-contain rounded-lg" />
                      :
                      <span className="leading-none text-[11px] md:text-sm font-AeonikProRegular md:font-AeonikProMedium border-b border-textBlueColor text-textBlueColor">
                        Фото локации
                      </span>
                    }
                  </button>
                </div>
              </div>
              <div className="w-full  px-4 md:px-0  ">
                <div className="flex flex-wrap items-center justify-between gap-3 md:gap-4 ">
                  <label className="w-full md:w-[31%] xs:w-[48%]   ">
                    <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                      Имя администратора{" "}
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg w-full md:max-w-[287px] text-base font-AeonikProMedium">
                      <input
                        type="text"
                        name="fname"
                        value={state?.idAssistantName}
                        onChange={(e) => setState({ ...state, idAssistantName: e.target.value })}
                        placeholder=" Имя администратора"
                        className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2"
                      />
                    </div>
                  </label>
                  <label className="w-full md:w-[31%] xs:w-[48%]  ">
                    <div className="w-full text-[12px] md:text-base flex items-center mb-[10px]">
                      Имя второго администратора{" "}
                    </div>
                    <div className="w-full flex items-center border border-borderColor h-[32px] md:h-[45px] rounded md:rounded-lg md:max-w-[287px] text-base font-AeonikProMedium">
                      <input
                        type="text"
                        name="fname"
                        value={state?.idSecondAssistantName}
                        onChange={(e) => setState({ ...state, idSecondAssistantName: e.target.value })}
                        placeholder=" Имя администратора"
                        className="w-full outline-none text-[12px] md:text-[14px] font-AeonikProRegular px-2 "
                      />
                    </div>
                  </label>
                  <div className="w-full md:w-[31%] xs:w-[48%]">
                    <div className="text-[12px] md:text-base flex items-center mb-1 md:mb-[10px]">
                      Рабочее время
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full flex  items-center">
                      {" "}
                      <span className="w-fit text-[12px] md:text-base flex items-center">
                        от
                      </span>
                      <input
                        className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-8 md:h-11 rounded md:rounded-lg md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                        type="time"
                        min="00:00"
                        max="23:59"
                        pattern="[0-2][0-9]:[0-5][0-9]"
                        value={state?.idWorkTimeFrom}
                        onChange={(e) => setState({ ...state, idWorkTimeFrom: e.target.value })}
                        required />

                      <span className="w-fit text-[12px] md:text-base flex items-center ">
                        до
                      </span>
                      <input
                        className="without_ampm mr-5 ml-[5px]  outline-none w-[45%] xs:w-[40%] border border-borderColor text-center flex items-center justify-center h-8 md:h-11 rounded-lg md:w-[80px] text-[12px] md:text-[14px] font-AeonikProRegular "
                        type="time"
                        min="00:00"
                        max="23:59"
                        pattern="[0-2][0-9]:[0-5][0-9]"
                        value={state?.idWorkTimeTo}
                        onChange={(e) => setState({ ...state, idWorkTimeTo: e.target.value })}
                        required />

                    </div>
                  </div>
                  <label className="w-full md:w-[31%] xs:w-[48%]">
                    <div className="text-xs md:text-base flex items-center mb-[10px]">
                      Номер администратора
                      <span className="ml-[5px]"><StarLabel /></span>
                    </div>
                    <div className="mt-[6px] h-8 md:h-11 flex items-center justify-center overflow-hidden border border-searchBgColor rounded md:rounded-lg">
                      <div className="ss:w-[35%] md:w-[30%] h-8 md:h-11 flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                        <div
                          className="w-[40px] flex items-center outline-none h-full select-none mx-2 not-italic font-AeonikProRegular text-xs md:text-base leading-4 text-black"
                        > {state?.idAssistantPhoneCode ? "+" + state?.idAssistantPhoneCode : "+998"}</div>
                      </div>
                      <div className="w-[65%] md:w-[70%] h-[42px] overflow-hidden">
                        <InputMask
                          mask="(99) 999-99-99"
                          name="phone"
                          value={state?.idAssistantPhone || null}
                          onChange={(e) => setState({ ...state, idAssistantPhone: e.target.value })}
                          className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.idAssistantPhone ? "font-AeonikProMedium" : null
                            } text-xs md:text-base leading-4 text-black`}
                          placeholder={"(99) 999-99-99"}
                        ></InputMask>
                      </div>
                    </div>

                  </label>
                  <label className="w-full md:w-[31%] xs:w-[48%]">
                    <div className="text-[12px] md:text-base flex items-center mb-[10px]">
                      Номер второго администратора{" "}
                      <span className="ml-[5px]">{/* <StarLabel /> */}</span>
                    </div>

                    <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded md:rounded-lg h-8 md:h-11">
                      <div className="w-[35%] md:w-[30%] flex items-center justify-center cursor-pointer border-r border-searchBgColor overflow-hidden">
                        <div
                          className="w-[40px] flex items-center outline-none h-full select-none mx-2 not-italic font-AeonikProRegular leading-4 text-black text-xs md:text-base"

                        > {state?.idSecondAssistantPhoneCode ? "+" + state?.idSecondAssistantPhoneCode : "+998"}</div>
                      </div>
                      <div className="w-[65%] md:w-[70%] h-8 md:h-11 overflow-hidden">
                        <InputMask
                          mask="(99) 999-99-99"
                          name="phone"
                          value={state?.idSecondAssistantPhone || null}
                          onChange={(e) => setState({ ...state, idSecondAssistantPhone: e.target.value })}
                          className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.idSecondAssistantPhone ? "font-AeonikProMedium" : null
                            } text-xs md:text-base leading-4 text-black`}
                          placeholder={"(99) 999-99-99"}
                        ></InputMask>
                      </div>
                    </div>
                  </label>
                  <div className="w-full md:w-[31%] xs:w-[48%]">
                    <div className="w-full h-fit flex justify-center ">
                      <div className={`max-w-[600px] h-fit fixed px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-l rounded-t-lg mx-auto w-full duration-500 z-[999999] md:top-[50%] md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${openRegionModal ? " bottom-0 md:flex flex-col" : "md:hidden bottom-[-1500px] z-[-10]"}`} >
                        <div className="w-full flex items-center justify-between">
                          <span className="text-black text-lg not-italic font-AeonikProRegular">Выберите регион</span>
                          <span
                            className="select-none cursor-pointer"
                            onClick={() => setOpenRegionModal(false)}
                          >
                            <MenuCloseIcons colors="#000" /></span>
                        </div>


                        <div className="w-full overflow-auto  flex flex-col gap-y-4 pt-3  overflow-x-hidden mt-3 h-[50vh] md:h-[60vh] VerticelScroll pr-2 ">
                          {state?.getRegionList?.regions ?
                            state?.getRegionList?.regions?.map((data, index) => {
                              return (
                                <div key={data?.id} className="w-full  h-fit  ">
                                  <div
                                    onClick={() => accordionCityList(data?.id)}
                                    className="w-full cursor-pointer flex items-center pr-1 justify-between border-b border-[#F0F0F0] "
                                  >
                                    <span className="text-[#303030] text-lg not-italic font-AeonikProRegular">
                                      {data?.name_ru}
                                    </span>
                                    <span
                                      className={`${activeIndex == data?.id ? "rotate-[0deg]" : "rotate-[180deg]"} `}
                                    >
                                      <ArrowTopIcons colors={"#a1a1a1"} />
                                    </span>
                                  </div>

                                  <div
                                    className={`w-full grid grid-cols-2 xs:grid-cols-3 duration-[400ms]
                             ${activeIndex == data?.id ? "openAccardion" : "CloseAccardion"} `}
                                  >
                                    {data?.sub_regions?.map((item) => {
                                      return (
                                        <div key={item?.id} className="flex items-center px-[2px] gap-x-[4px] cursor-pointer">
                                          <label
                                            htmlFor={item?.name_ru}
                                            className="flex items-center gap-x-[6px]"
                                          >
                                            <input
                                              type="radio"
                                              id={item?.name_ru}
                                              name="type_work"
                                              value={item?.region_id}
                                              checked={state?.idSupRregionId == item?.id}
                                              className="border border-borderColor  cursor-pointer  flex items-center justify-center"
                                              onChange={(e) => {
                                                setState({ ...state, idRegionId: e.target.value, idSupRregionId: item?.id })
                                              }}
                                              required

                                            />
                                            <span className="text-[#303030]  cursor-pointer text-[15px] not-italic font-AeonikProRegular"
                                            >{item?.name_ru}</span>
                                          </label>
                                        </div>

                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            }) :
                            <p className="w-full h-full flex flex-col items-center justify-center">Malumotlar yuklanyapti...</p>}

                        </div>
                        <div className="w-full flex items-center justify-end mt-2">
                          <span
                            onClick={() => setOpenRegionModal(false)}
                            className="cursor-pointer text-textBlueColor text-lg not-italic font-AeonikProMedium">Готово</span>
                        </div>
                      </div>

                      {/* Region INput  */}
                      <div className={"w-full"}>
                        <label htmlFor="" >
                          <span className="flex items-center text-[#303030] text-xs md:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                            Выберите регион
                          </span>
                          <div
                            onClick={() => setOpenRegionModal(true)}
                            className="w-full h-8 md:h-11 mt-[6px] md:mt-[10px] px-[15px] flex items-center justify-between rounded md:rounded-lg cursor-pointer border border-searchBgColor">
                            <span className=" w-full h-8 md:h-11 flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] text-xs md:text-base leading-4 ">
                              {!state?.idRegionId && !state?.idSupRregionId && "Выберите регион"}

                              {state?.getRegionList?.regions?.filter(e => e.id == state?.idRegionId).map(item => {
                                return <span className="flex items-center text-[#000] text-xs md:text-base">
                                  {item?.name_ru},
                                  {item?.sub_regions?.filter(i => i.id == state?.idSupRregionId).map(item => {
                                    return <span className="ml-1">{item?.name_ru}</span>
                                  })}
                                </span>
                              })
                              }
                            </span>
                            <span className="rotate-[180deg]"><ArrowTopIcons colors={"#a1a1a1"} /></span>
                          </div>


                        </label>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-[50px]  px-4 md:px-0 ">
                <button
                  onClick={() => handleEditLocation()}

                  className="w-full md:w-fit h-[42px] flex items-center justify-center md:px-[100px]  bg-textBlueColor text-white rounded md:rounded-lg active:scale-95"
                >
                  Cохранит
                </button>
              </div>
            </div>

          </div >
        </div >}
    </div >
  );
}
// export default LocationMapCity;
// export default React.memo(LocationMapCity);
