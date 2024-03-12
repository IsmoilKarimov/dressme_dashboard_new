import React, { useContext, useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  ArrowTopIcons,
  CircleNextIcon,
  CreditCardNumber,
  DeleteIcon,
  DownArrowAntd,
  MenuCloseIcons,
  SuccessIconsForMail,
  UserMailIcon,
} from "../../../../assets/icons";
import '../../SellerAuthentication/SignUp/style.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MobileHumburgerMenu from "../../../Navbar/mobileHamburgerMenu/MobileMenu";
import EditPassword from "./EditPassword/EditPassword";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { dressMainData } from "../../../../hook/ContextTeam";
import axios from "axios";
import { SellerMainData } from "../../../../hook/SellerUserContext";
import { SellerRefresh } from "../../../../hook/SellerRefreshToken";
import { ClipLoader } from "react-spinners";
const { REACT_APP_BASE_URL } = process.env;

function EditProfilePage() {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const [sellerInformation, setSellerInformation] = useContext(SellerMainData);
  const [sellerRefreshToken] = useContext(SellerRefresh)

  const navigate = useNavigate();

  const [state, setState] = useState({
    sellerFname: "",
    sellerLname: "",
    sellerEmail: "",
    sellerCardNumber: "",
    sellerRegionId: "",
    sellerSubRegionId: "",
    sellerTypeId: "",
    sellerStatus: "",
    sellerPhoneCode: "",
    sellerPhoneNum: "",
    companyName: "",
    // -------------
    validateConfirm: true,
    eyesShow: true,
    requestPerson: true,
    // ------Regions Get -----
    getRegionList: "",
    // ------ Get Profile-----
    getProfileList: "",
    // ------ Get getSellerList-----
    getSellerList: "",
    // -----region Modal-----
    openModalRegions: false,
    // ----popConfirmDelete
    popConfirmDelete: false,
    sellerTypes: null,
    sellerUpdateInput: false,
    sellerUpdateEmail: false,
    sellerEmailModal: false,
    sellerEmailConfirm: false,

    sendingLoader: false,
    isCheckInput: false,
  });
  const [openEditModal, setOpenEditModal] = useState(false);

  // -------------------------------------
  const togglePassword = React.useCallback(() => setOpenEditModal(false), []);
  // -------------------------------------
  // ------------------
  const url = "https://api.dressme.uz/api/seller";

  useEffect(() => {
    setState({
      ...state,
      sellerFname: sellerInformation?.sellerUserData?.name,
      sellerLname: sellerInformation?.sellerUserData?.surname,
      sellerEmail: sellerInformation?.sellerUserData?.email,
      sellerCardNumber: sellerInformation?.sellerUserData?.card_number,
      sellerRegionId: sellerInformation?.sellerUserData?.region_id,
      sellerSubRegionId: sellerInformation?.sellerUserData?.sub_region_id,
      sellerTypeId: sellerInformation?.sellerUserData?.seller_type_id,
      sellerTypes: sellerInformation?.sellerUserData?.seller_type_id >= 3 ? 'ENTITY' : 'INDIVIDUAL',
      companyName: sellerInformation?.sellerUserData?.company?.name,
      sellerStatus: sellerInformation?.sellerUserData?.status,
      sellerPhoneCode:
        sellerInformation?.sellerUserData?.phone && sellerInformation?.sellerUserData?.phone.slice(0, 3),
      sellerPhoneNum:
        sellerInformation?.sellerUserData?.phone && sellerInformation?.sellerUserData?.phone.slice(3, 12),
    });
  }, [sellerInformation?.sellerUserData]);

  // ------------GET METHOD Region-----------------
  useEffect(() => {
    const fetchDataRegions = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/regions`)
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, regionList: data?.data })
        }

      } catch (error) {

      }
    };
    if (!dressInfo?.regionList) {
      fetchDataRegions();
    }
    const fetchDataTypes = async () => {
      try {
        const data = await axios.get(`${REACT_APP_BASE_URL}/seller-types`)
        if (data?.status >= 200 && data?.status < 300) {
          setDressInfo({ ...dressInfo, typeList: data?.data })
        }

      } catch (error) {

      }
    };
    if (!dressInfo?.typeList) {
      fetchDataTypes();
    }
  }, [dressInfo?.regionList, dressInfo?.typeLis]);

  const fetchData = async (customHeaders) => {
    try {
      const response = await axios.get(`${url}/profile`, {
        headers: customHeaders,
      });
      const status = response.status;
      const data = response.data;

      return { data, status };
    } catch (error) {
      const status = error.response ? error.response.status : null;
      return { error, status };
    }
  };

  const customHeaders = {
    'Content-type': 'application/json; charset=UTF-8',
    "Authorization": `Bearer ${localStorage.getItem("DressmeUserToken")}`,    // Add other headers as needed
  };

  const { refetch } = useQuery(['get_profile_axios11'], () => fetchData(customHeaders), {
    onSuccess: (data) => {
      if (data?.status >= 200 && data?.status < 300) {
        setSellerInformation({ ...sellerInformation, sellerUserData: data?.data })
      }
      if (data?.status === 401) {
        setSellerInformation({ ...sellerInformation, sellerUserData: [] })
        sellerRefreshToken()
      }
    },
    onError: (error) => {
      if (error?.response?.status === 401) {
        sellerRefreshToken()
        setSellerInformation({ ...sellerInformation, sellerUserData: [] })
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  // -----------------------Seller Delete---------------
  const { mutate } = useMutation(() => {
    return fetch(`${url}/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
    }).then((res) => res.json());
  });

  const onUserDelete = () => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message) {
            localStorage.clear();
            navigate("/signup-seller");
            window.location.reload();
            setState({ ...state, popConfirmDelete: false });
            toast.warn(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        },
        onError: (err) => {
          throw new Error(err || "something wrong");

        },
      }
    );
  };

  const [activeIndex, setActiveIndex] = useState();
  const accordionCityList = (id) => {
    if (activeIndex == id) {
      setActiveIndex(0);
    } else {
      setActiveIndex(id);
    }
  };

  const card1 = state?.sellerCardNumber?.split("-")
  const BankCard = card1?.join("")
  const UpdateSeller = () => {
    setState({ ...state, isCheckInput: true })
    if (state?.sellerTypes === 'ENTITY' && state?.companyName && state?.sellerTypeId >= 3) {
      setState({ ...state, sendingLoader: true })
      let form = new FormData();
      form.append("name", state?.sellerFname);
      form.append("surname", state?.sellerLname);
      form.append("phone", state?.sellerPhoneCode + state?.sellerPhoneNum);
      form.append("card_number", BankCard);
      form.append("seller_type_id", state?.sellerTypeId);
      state?.companyName && form.append("company_name", state?.companyName);
      form.append("region_id", state?.sellerRegionId);
      form.append("sub_region_id", state?.sellerSubRegionId);

      return fetch(`${url}/update-seller-info`, {
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
            setState({ ...state, sendingLoader: false, isCheckInput: false, sellerUpdateInput: false })
            toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
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
            refetch()
            setState({ ...state, sendingLoader: false, isCheckInput: false, sellerUpdateInput: false })
          }
        })
        .catch((err) => {
          setState({ ...state, sendingLoader: false, isCheckInput: false, sellerUpdateInput: false })
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
        });
    }
    if (state?.sellerTypes === 'INDIVIDUAL' && state?.sellerTypeId < 3) {
      setState({ ...state, sendingLoader: true })
      let form = new FormData();
      form.append("name", state?.sellerFname);
      form.append("surname", state?.sellerLname);
      form.append("phone", state?.sellerPhoneCode + state?.sellerPhoneNum);
      form.append("card_number", BankCard);
      form.append("seller_type_id", state?.sellerTypeId);
      form.append("region_id", state?.sellerRegionId);
      form.append("sub_region_id", state?.sellerSubRegionId);
      return fetch(`${url}/update-seller-info`, {
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
            setState({ ...state, sendingLoader: false, isCheckInput: false, sellerUpdateInput: false })
            toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
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
            refetch()
            setState({ ...state, sendingLoader: false, isCheckInput: false, sellerUpdateInput: false })
          }
        })
        .catch((err) => {
          setState({ ...state, sendingLoader: false, isCheckInput: false, sellerUpdateInput: false })
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
        });
    }
  };

  const dataMutateEmail = useMutation(() => {
    return fetch(`${url}/update-seller-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: JSON.stringify({ email: state?.sellerEmail, }),
    }).then((res) => res.json());
  });
  const UpdateEmailSeller = () => {
    setState({ ...state, sendingLoader: true })
    dataMutateEmail.mutate(
      {},
      {
        onSuccess: (res) => {
          if (res?.message && res?.errors) {
            setState({ ...state, sendingLoader: false, sellerUpdateEmail: false })
            toast.error(`${res?.message}`, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else if (res?.message) {
            setState({ ...state, sendingLoader: false, sellerUpdateEmail: false, sellerEmailModal: false, sellerEmailConfirm: true })
          }
        },
        onError: (err) => {
          setState({ ...state, sendingLoader: false, sellerUpdateEmail: false })
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
        },
      }
    );
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
    document.title = "Pедактировать профиль";
  }, []);
// Если вы удалите аккаунт
  return (
    <div className="w-full h-fit md:h-[100vh]  flex flex-col gap-y-4 md:gap-y-[40px] items-center justify-center px-4 md:px-0">
      <ToastContainer
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
      <div className="w-full flex items-center justify-start md:hidden mt-4">
        <span>
          {" "}
          <MobileHumburgerMenu />
        </span>{" "}
      </div>{" "}
      <div
        onClick={() => {
          setOpenEditModal(false);
          setState({
            ...state,
            popConfirmDelete: false,
            openModalRegions: false,
            sellerEmailConfirm: false,
            sellerEmailModal: false,
          });
          setDressInfo({ ...dressInfo, logOutSeller: false });
          // setState({...state, openModalRegions: false })
        }}
        className={`fixed inset-0 z-[112] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.popConfirmDelete || openEditModal || state?.openModalRegions || state?.sellerEmailModal
            ? ""
            : "hidden"
          }`}
      ></div>
      <div
        onClick={() => {
          navigate('/login-seller')
          setState({ ...state, sellerEmailConfirm: false });
        }}
        className={`fixed inset-0 z-[112] cursor-pointer duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.sellerEmailConfirm ? "" : "hidden"}`}
      ></div>
      {/* Confirm Email Confirm Modal */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sellerEmailConfirm
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >

        <div className="flex items-center w-full justify-end"><button
          type="button"
          className="select-none  cursor-pointer"
          onClick={() => {
            navigate('/login-seller')
            setState({ ...state, sellerEmailConfirm: false })
          }}
        >
          <MenuCloseIcons colors="#000" />
        </button></div>
        <div className="w-full flex items-center justify-center flex-col">
          <button className="flex p-4 items-center justify-center rounded-full mt-4 bg-[#D8EDFF]">
            <SuccessIconsForMail />
          </button>
          <p className="text-[#1F1F1F] text-3xl not-italic font-AeonikProMedium mt-5">Мы отправили вам ссылку</p>
          <p className="text-[#8B8B8B] text-xl not-italic font-AeonikProRegular mt-[30px]">Проверьте свой E-mail</p>
        </div>

      </section>
      {/* Confirm Email Update */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.sellerEmailModal
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >

        <div className="flex items-center w-full justify-end"><button
          type="button"
          className="select-none  cursor-pointer"
          onClick={() => setState({ ...state, sellerEmailModal: false })}
        >
          <MenuCloseIcons colors="#000" />
        </button></div>
        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            Вы уверены?
          </span>
          <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
            Если вы обновите почту, то ваш аккаунт станет недоступным, пока вы не проверите новую почту
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, sellerEmailModal: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
          >
            Oтмена
          </button>
          {state?.sendingLoader ?
            <button
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-white bg-textBlueColor  h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              <ClipLoader
                className="h-full py-[2px]"
                color={"#fff"}
                size={40}
                loading={true}
              />
            </button>
            :
            <button
              onClick={() => UpdateEmailSeller()}
              type="button"
              className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-white bg-textBlueColor  h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
            >
              Обновить
            </button>}
        </div>
      </section>
      {/* Delete Account Of Pop Confirm */}
      <section
        className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[113] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.popConfirmDelete
          ? " bottom-0 md:flex"
          : "md:hidden bottom-[-800px] z-[-10]"
          }`}
      >
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            className="select-none  cursor-pointer"
            onClick={() => setState({ ...state, popConfirmDelete: false })}
          >
            <MenuCloseIcons colors="#000" />
          </button>
        </div>
        <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
          <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
            <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
              <DeleteIcon width={30} />
            </span>
          </span>
          <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
            Вы уверены?
          </span>
          <span className=" text-[#a2a2a2] text-base xs:text-lg not-italic font-AeonikProMedium text-center">
            Если вы удалите аккаунт, все ваши товары и магазины удалятся, если
            они имеются
          </span>
        </div>
        <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">
          <button
            onClick={() => setState({ ...state, popConfirmDelete: false })}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
          >
            Oтмена
          </button>
          <button
            onClick={onUserDelete}
            type="button"
            className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[38px] md:h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium"
          >
            Удалить
          </button>
        </div>
      </section>
      {/* ---password change----- */}
      <section
        className={`fixed  max-w-[440px] md:max-w-[550px] mx-auto w-full md:w-auto z-[113] bottom-0 md:bottom-auto  duration-300 overflow-hidden ${openEditModal ? "" : "hidden z-0"
          }`}
      >
        <EditPassword onClick={togglePassword} />
      </section>
      {state?.sellerStatus === "pending" && (
        <div className="max-w-[800px] w-full md:text-center flex items-center md:justify-center">
          <span className="text-black text-[16px] md:text-3xl not-italic md:font-AeonikProMedium  font-AeonikProRegular tracking-[1px]">
            Скоро с вами свяжутся, ожидайте одобрения от администраторов{" "}
          </span>
        </div>
      )}
      <div className="max-w-[800px] w-full h-fit border border-lightBorderColor flex flex-col gap-y-6 rounded-[12px] p-4 md:p-[30px]">
        {/* title */}
        <div className="w-full flex items-center justify-between ">
          <span className="text-black text-[20px] md:text-2xl not-italic font-AeonikProMedium leading-6">
            Мои данные
          </span>
          <button
            onClick={() => setState({ ...state, popConfirmDelete: true })}
            className="h-5 flex items-center text-[14px] xs:text-base not-italic font-AeonikProRegular leading-5"
          >
            {/* <VerticalMenuIcons className="h-full" /> */}
            <span className="cursor-pointer active:scale-95  active:opacity-70 text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
              <DeleteIcon width={30} />
            </span>
          </button>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 w-full h-fit ">
          {/* Name */}
          <div className="w-full h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
              Имя{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	text-[12px] xs:text-[14px] md:text-base w-full h-[38px] md:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                type="text"
                name="fname"
                placeholder="Имя"
                value={state?.sellerFname || null}
                onChange={(e) =>
                  setState({ ...state, sellerFname: e.target.value, sellerUpdateInput: true })
                }
                required
              />
            </div>
          </div>
          {/*  surname */}
          <div className="w-full h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
              Фамилия{" "}
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	text-[12px] xs:text-[14px] md:text-base w-full h-[38px] md:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                type="text"
                name="lname"
                placeholder="Фамилия"
                value={state?.sellerLname || null}
                onChange={(e) =>
                  setState({ ...state, sellerLname: e.target.value, sellerUpdateInput: true })
                }
                required
              />
            </div>
          </div>
          {/* Mail */}
          <div className="w-full h-fit  ">
            <div className=" flex items-center justify-between w-full">
              <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
                Электронная почта{" "}
              </div>
              {state?.sellerUpdateEmail ?
                <button
                  type="button"
                  onClick={() => setState({ ...state, sellerEmailModal: true })}
                  className={" text-textBlueColor not-italic font-AeonikProRegular text-sm leading-4  tracking-[0,16px] hover:underline"}>
                  Обновить почту
                </button>
                :
                <span
                  className={" text-[#b5b5b5] not-italic font-AeonikProRegular text-sm leading-4   tracking-[0,16px] "}>
                  Обновить почту
                </span>
              }
            </div>
            <div className="mt-[6px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              <input
                className=" outline-none	text-[12px] xs:text-[14px] md:text-base w-full h-[38px] md:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                type="email"
                name="email"
                placeholder="Адрес электронной почты"
                value={state?.sellerEmail || null}
                onChange={(e) =>
                  setState({ ...state, sellerEmail: e.target.value, sellerUpdateEmail: true })
                }
                required
              />
              <span>
                <UserMailIcon />
              </span>{" "}
            </div>
          </div>
          {/* Номер */}
          <div className="w-full h-fit ">
            <div className="not-italic font-AeonikProRegular text-sm md:text-base leading-4 text-black  tracking-[0,16px] ">
              Номер телефона{" "}
            </div>
            <div className="mt-[6px] flex items-center justify-center overflow-hidden border border-searchBgColor rounded-lg">
              <div className="ss:w-[35%] md:w-[30%] box-border	 h-[38px] md:h-[42px] flex items-center justify-center  cursor-pointer border-r border-searchBgColor overflow-hidden">
                <span
                  className="w-[40px] outline-none flex items-center h-[38px] md:h-[42px] select-none  not-italic font-AeonikProRegular text-[12px] xs:text-[14px] md:text-base leading-4 text-black"
                >+998</span>
              </div>
              <div className="ss:w-[65%] md:w-[70%] h-[38px] md:h-[42px] overflow-hidden">
                <InputMask
                  mask="(99) 999-99-99"
                  name="phone"
                  value={state?.sellerPhoneNum || null}
                  onChange={(e) =>
                    setState({ ...state, sellerPhoneNum: e.target.value, sellerUpdateInput: true })
                  }
                  className={`w-full px-4 outline-none font-AeonikProRegular h-full not-italic ${state?.sellerPhoneNum ? "font-AeonikProMedium" : null
                    } text-[12px] xs:text-[14px] md:text-base leading-4 text-black`}
                  placeholder={"(99) 999-99-99"}
                ></InputMask>
              </div>
            </div>
          </div>
          {/* Выберите регион, */}
          <div className="w-full h-fit flex justify-center ">
            <div
              className={` max-w-[600px] h-fit fixed    px-3 md:px-6  py-2 md:py-4 bg-white rounded-b-none md:rounded-b-lg	 rounded-t-lg  mx-auto w-full duration-500 z-[113] md:top-[50%] left-1/2 right-1/2 translate-x-[-50%] md:translate-y-[-50%] overflow-hidden ${state?.openModalRegions
                ? " bottom-0 md:flex flex-col"
                : "md:hidden bottom-[-1500px] z-[-10]"
                }`}
            >
              <div className="w-full flex items-center justify-between  ">
                <span className="text-black text-base   md:text-2xl not-italic font-AeonikProRegular">
                  Выберите регион
                </span>
                <button
                  type="button"
                  className="select-none  cursor-pointer"
                  onClick={() => {
                    setState({ ...state, openModalRegions: false });
                  }}
                >
                  <MenuCloseIcons colors="#000" />
                </button>
              </div>

              <div className="w-full overflow-auto  flex flex-col gap-y-4 pt-3  overflow-x-hidden mt-3 h-[50vh] md:h-[60vh] VerticelScroll pr-2 ">
                {dressInfo?.regionList?.regions ?
                  (
                    dressInfo?.regionList?.regions?.map((data, index) => {
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
                              className={`${Number(activeIndex) === Number(data?.id)
                                ? "rotate-[0deg]"
                                : "rotate-[180deg]"
                                } `}
                            >
                              <ArrowTopIcons colors={"#a1a1a1"} />
                            </span>
                          </div>

                          <div
                            className={`w-full grid grid-cols-2 xs:grid-cols-3 duration-[400ms]
                             ${Number(activeIndex) === Number(data?.id)
                                ? "openAccardion"
                                : "CloseAccardion"
                              } `}
                          >
                            {data?.sub_regions?.map((item) => {
                              return (
                                <div
                                  key={item?.id}
                                  className="flex items-center px-[2px] gap-x-[4px] cursor-pointer"
                                >
                                  <label
                                    htmlFor={item?.name_uz}
                                    className="flex items-center gap-x-[6px]"
                                  >
                                    <input
                                      type="radio"
                                      id={item?.name_uz}
                                      name="type_work"
                                      value={item?.region_id}
                                      checked={
                                        Number(state?.sellerSubRegionId) === Number(item?.id)
                                      }
                                      className="border border-borderColor  cursor-pointer  flex items-center justify-center"
                                      onChange={(e) => {
                                        setState({
                                          ...state,
                                          sellerRegionId: e.target.value,
                                          sellerSubRegionId: item?.id,
                                          sellerUpdateInput: true
                                        });
                                      }}
                                      required
                                    />
                                    <span className="text-[#303030]  cursor-pointer text-[15px] not-italic font-AeonikProRegular">
                                      {item?.name_ru}
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="w-full h-full flex flex-col items-center justify-center">
                      Malumotlar yuklanyapti...
                    </p>
                  )}
              </div>
              <div className="w-full flex items-center justify-end  mt-2">
                <span
                  onClick={() => {
                    setState({ ...state, openModalRegions: false });
                  }}
                  className="cursor-pointer text-textBlueColor text-lg not-italic font-AeonikProMedium"
                >
                  Готово
                </span>
              </div>
            </div>

            {/* Region INput  */}
            <div className={"w-full"}>
              <label htmlFor="selectRegion1">
                <span className="flex items-center text-[#303030] text-sm md:text-base not-italic font-AeonikProRegular leading-4 tracking-[0,16px] ">
                  Выберите регион
                </span>
                <div
                  onClick={() => {
                    setState({ ...state, openModalRegions: true });
                  }}
                  className="w-full h-[38px] md:h-[42px] mt-[6px] px-[15px] flex items-center justify-between rounded-lg cursor-pointer border border-searchBgColor"
                >
                  <span className=" w-full h-[38px] md:h-[42px] flex items-center not-italic font-AeonikProRegular text-[#B5B5B5] ll:text-[14px] sm:text-[16px] text-base leading-4 ">
                    {!state?.sellerRegionId &&
                      !state?.sellerSubRegionId &&
                      "Выберите регион"}
                    {state?.sellerRegionId &&
                      state?.sellerSubRegionId &&
                      <div className="flex items-center">
                        {dressInfo?.regionList?.regions
                          ?.filter((e) => Number(e.id) === Number(state?.sellerRegionId))
                          .map((item) => {
                            return (
                              <div className="flex items-center text-[#000] text-[14px] md:text-base">
                                {item?.name_ru},
                                {item?.sub_regions?.map((data) => {
                                  return (
                                    <span className="ml-1 text-[14px] md:text-base">{Number(data?.id) == Number(state?.sellerSubRegionId) && data?.name_ru}</span>
                                  );
                                })}
                              </div>
                            );
                          })}
                      </div>}
                  </span>
                  <span className=" iconArrow ">

                    <DownArrowAntd colors={"#a1a1a1"} />
                  </span>
                </div>
              </label>
            </div>
          </div>
          {/*  CardNumber */}
          <div className="w-full  h-fit   ">
            <span className="flex items-center text-[#303030] text-sm md:text-base not-italic font-AeonikProRegular  leading-4 tracking-[0,16px] ">
              Номер банковской карты
            </span>
            <div className="mt-[6px] gap-x-[10px] px-[16px] w-full flex items-center border border-searchBgColor rounded-lg ">
              {/* CredtCardicons */}
              <span>
                <CreditCardNumber />
              </span>
              <InputMask
                value={state?.sellerCardNumber}
                mask="9999-9999-9999-9999"
                name="credit-card-number"
                className="outline-none	  w-full h-[38px] md:h-[42px]  text-black  not-italic font-AeonikProRegular placeholder-text-[#B5B5B5] text-[12px] xs:text-[14px] md:text-base leading-4"
                onChange={(e) =>
                  setState({ ...state, sellerCardNumber: e.target.value, sellerUpdateInput: true })
                }
                placeholder="0000-0000-0000-0000"
              />
            </div>
          </div>
          {/* Type */}
          <div className="w-full ">
            <div className="w-full justify-between flex ">
              <span
                onClick={() => setState({ ...state, sellerTypes: "INDIVIDUAL" })}>
                <span className={`${state?.sellerTypes === 'INDIVIDUAL' ? 'text-fullBlue' : 'text-[#b5b5b5]'} w-full justify-start cursor-pointer flex items-center text-[12px] md:text-sm not-italic font-AeonikProRegular  leading-4 tracking-[0,16px]`}>
                  ФИЗИЧЕСКОЕ ЛИЦО</span>
              </span>
              <span
                onClick={() => setState({ ...state, sellerTypes: 'ENTITY' })}>
                <span className={`${state?.sellerTypes === 'ENTITY' ? 'text-fullBlue' : 'text-[#b5b5b5]'} w-full justify-start cursor-pointer flex items-center text-[12px] md:text-sm not-italic font-AeonikProRegular  leading-4 tracking-[0,16px] whitespace-nowrap	`}>
                  ЮРИДИЧЕСКОЕ ЛИЦО</span>
              </span>
            </div>

            {state?.sellerTypes === 'ENTITY' &&
              <div className="w-full flex flex-col h-fit  mt-[6px]">
                {/* Имя организации */}
                <div className="w-full h-fit  ">

                  <div className={` w-full flex items-center  rounded-lg ${state?.isCheckInput && !state?.companyName ? "border border-[#FFB8B8] " : "border border-searchBgColor"}`}>
                    <input
                      className="outline-none  text-[14px] md:text-base px-[16px] rounded-lg w-full h-[38px] md:h-[42px] placeholder-not-italic placeholder-font-AeonikProMedium md:placeholder-text-base placeholder-text-[14px] placeholder-leading-4 placeholder-text-black"
                      type="text"
                      name="companyName"
                      placeholder="Имя организации"
                      value={state?.companyName}
                      onChange={(e) => setState({ ...state, companyName: e?.target?.value, sellerUpdateInput: true })}
                      required
                    />
                  </div>
                </div>
              </div>}
            {state?.sellerTypes === 'INDIVIDUAL' &&
              <div className="w-full flex items-center ">
                <Select
                  className= "h-[38px] md:h-[42px]  text-[14px] md:text-base z-[0] flex items-center rounded-lg w-full focus:border border-searchBgColor cursor-pointer"
                  placeholder="Тип предприятия"
                  optionFilterProp="children"
                  onChange={(e) => setState({ ...state, sellerTypeId: e, sellerUpdateInput: true })}
                  value={dressInfo?.typeList?.individual?.filter(e => (e?.id) == state?.sellerTypeId)?.map((item) => { return item?.name_ru })}
                  size="large"
                  options={dressInfo?.typeList?.individual?.map((item) => {
                    return {
                      value: item?.id,
                      label: item?.name_ru,
                    };
                  })}
                />
              </div>
            }
          </div>
          <div className={`${state?.sellerTypes === 'ENTITY' ? "flex" : "hidden"}  w-full h-fit flex flex-col items-center justify-start `}>
            <div className="w-full justify-start  flex items-center text-[#303030] text-sm md:text-base not-italic font-AeonikProRegular  leading-4 tracking-[0,16px] ">
              Тип предприятия
            </div>
            <div className={`h-[44px] w-full mt-[6px] overflow-hidden rounded-lg  ${state?.isCheckInput && state?.sellerTypes === 'ENTITY' ? "border border-[#FFB8B8] bg-[#FFF6F6] " : "focus:border border-searchBgColor"}`}>
              <Select
                className={`SelectAntdStyle   h-[38px] md:h-[42px] text-[14px] md:text-base z-[0] flex items-center rounded-lg w-full  cursor-pointer`}
                placeholder="Тип предприятия"
                style={{ height: 42 }}
                optionFilterProp="children"
                onChange={(e) => { setState({ ...state, sellerTypeId: e, sellerUpdateInput: true }) }}
                value={dressInfo?.typeList?.company?.filter(e => (e?.id) == state?.sellerTypeId)?.map((item) => { return item?.name_ru })}
                // size="large"
                options={dressInfo?.typeList?.company?.map((item) => {
                  return {
                    value: item?.id,
                    label: item?.name_ru,
                  };
                })}
              />
            </div>
          </div>

          {/* EditPassword */}
          <div className={`w-full  flex items-center   xs:mt-5  ${state?.sellerTypes === 'ENTITY' ? 'justify-start' : 'justify-end'}`}>

            <button
              onClick={() => setOpenEditModal(true)}
              className={
                " text-textBlueColor flex items-center text-sm md:text-base not-italic font-AeonikProRegular hover:underline"
              }
            >
              Изменить пароль
            </button>
          </div>
        </div>

        {/* Button */}
        <div className="w-full  flex items-center justify-between gap-x-6 mt-7">
          {state?.sellerUpdateInput ?
            state?.sendingLoader ?
              <button
                type="button"
                onClick={() => UpdateSeller()}
                className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor">
                <ClipLoader
                  className="h-full py-[2px]"
                  color={"#fff"}
                  size={40}
                  loading={true}
                />
              </button> :
              <button
                type="button"
                onClick={() => UpdateSeller()}
                className="w-full active:scale-95  active:opacity-70 h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center bg-weatherWinterColor">
                <span className="text-center text-base text-white not-italic font-AeonikProMedium">
                  Сохранить данные
                </span>
                <span>
                  <CircleNextIcon />
                </span>
              </button>
            :
            <button
              type="button"
              className="w-full  h-[40px] xs:h-12 rounded-lg flex items-center gap-x-[10px] justify-center opacity-30 bg-weatherWinterColor">
              <span className="text-center text-base text-white not-italic font-AeonikProMedium">
                Сохранить данные
              </span>
              <span>
                <CircleNextIcon />
              </span>
            </button>}
        </div>
      </div>
    </div >
  );
}
export default React.memo(EditProfilePage);
