import { Popover, Select, Space, Switch, TreeSelect } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  DownloadIcon,
  InputCheckedTrueIcons,
  LoaderIcon,
  MenuCloseIcons,
  StarLabel,
} from "../../../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import HeadWearAdd from "./Details/HeadWear/HeadWearAdd";
import OutWearAdd from "./Details/OutWear/OutWearAdd";
import AccessoriesAdd from "./Details/Accessories/AccessoriesAdd";
import ShoesAdd from "./Details/Shoes/ShoesAdd";
import UnderAddWear from "./Details/UnderAddWear/UnderAddWear";
import ClothingSection from "./DetailsForMobile/ClothesSection/ClothingSection";
import SubClothingSection from "./DetailsForMobile/SubClothesSection/SubClothingSection";
import DressSeason from "./DetailsForMobile/DressSeason/DressSeason";
import ColourGroup from "./DetailsForMobile/ColourList/ColourGroup";
import GenderList from "./DetailsForMobile/GenderList/GenderList";
import DressType from "./DetailsForMobile/DressType/DressType";
import MakeCountry from "./DetailsForMobile/CountrySize/MakeCountry";
import ClothingCategory from "./DetailsForMobile/ClothingCategory/ClothingCategory";
import { useHttp } from "../../../../hook/useHttp";
import { dressMainData } from "../../../../hook/ContextTeam";
import TextFormAdd from "./TextFormGroup/TextFormAdd";
import { BiCheck, BiCheckDouble } from "react-icons/bi";
// import { DownOutlined } from '@ant-design/icons'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;
const url = "https://api.dressme.uz/api/seller";

const AddingProduct = () => {
  const [dressInfo, setDressInfo] = useContext(dressMainData);
  const navigate = useNavigate()
  const { request } = useHttp();
  const [state, setState] = useState({
    buttonReviews: false,
    openDropModalButton: true,
    showColor: false,
    openSelect: false,
    // --------------
    ClothingSection: false,
    SubClothingSection: false,
    DressSeason: false,
    Colour: false,
    GenderModal: false,
    DressTypeModal: false,
    MakeCountryModal: false,
    ClothingCategoryModal: false,
    isCheckValid: false,
    errorList: null,
    type_Id: null,
    // --------------
    pictureBgFile1: "",
    pictureBgView1: "",
    pictureBgFile2: "",
    pictureBgView2: "",
    pictureBgFile3: "",
    pictureBgView3: "",
    pictureBgFile4: "",
    pictureBgView4: "",
    // ---------------
    shopId: null,
    shopLocationId: null,
    section_Id: [],
    sub_Section_Id: [],
    season_Id: [],
    color_Id: null,
    gender_Id: null,
    min_Age_Category: null,
    max_Age_Category: null,
    sku: null,
    category_Id: null,
    filterTypeId: null,
    producer_Id: null,
    photos1: [],
    amount: null,
    age: null,
    price: null,
    discount_percent: null,
    discount_price: null,

    // -----Details-----
    headWearList: null,
    outWearList: null,
    underWearList: null,
    shoesList: null,
    AccessoriesList: null,
    // -----TextForm-----
    textForm: null

  });

  const [productsData, setProductsData] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([{}]);
  const [incrementUz, setIncrementUz] = useState(1);

  const handleLocationImage2 = (e) => {
    setSelectedFiles((countryList) => [...countryList, {
      id: incrementUz, pictureBgFile: e.target.files[0],
      pictureBgView1: URL.createObjectURL(e.target.files[0]
      ),
    }])
    setIncrementUz(incrementUz + 1)
  };
  function CallBackTextForm(childData) {
    setState({ ...state, textForm: childData })
  }
  function CallBackHeadWear(childData) {
    console.log(childData);
    setState({
      ...state,
      headWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackOutWear(childData) {

    setState({
      ...state,
      outWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackUnderWear(childData) {
    setState({
      ...state,
      underWearList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackShoesWear(childData) {

    setState({
      ...state,
      shoesList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }
  function CallBackAccessoriesWear(childData) {

    setState({
      ...state,
      AccessoriesList: childData,
      category_Id: childData?.category_Id,
      amount: childData?.amount,
      age: childData?.age,
      price: childData?.price,
      discount_price: childData?.discountPrice,
      discount_percent: childData?.discountPercent,
    })
  }

  function randomCode(len) {
    let p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    setState({
      ...state,
      sku: [...Array(len)].reduce((a) => a + p[~~(Math.random() * p.length)], "")
    }
    )
  }

  // ---------Callback----
  const ClothingSectionToggle = React.useCallback(
    () => setState({ ...state, ClothingSection: false }),
    []
  ); // ClothingSection
  const SubClothingSectionToggle = React.useCallback(
    () => setState({ ...state, SubClothingSection: false }),
    []
  ); // ClothingSection
  const DressSeasonToggle = React.useCallback(
    () => setState({ ...state, DressSeason: false }),
    []
  ); // ClothingSection
  const ColourListToggle = React.useCallback(
    () => setState({ ...state, Colour: false }),
    []
  ); // ClothingSection
  const GenderListToggle = React.useCallback(
    () => setState({ ...state, GenderModal: false }),
    []
  ); // ClothingSection
  const DressTypeToggle = React.useCallback(
    () => setState({ ...state, DressTypeModal: false }),
    []
  ); // ClothingSection
  const MakeCountryToggle = React.useCallback(
    () => setState({ ...state, MakeCountryModal: false }),
    []
  ); // ClothingSection
  const ClothingCategoryToggle = React.useCallback(
    () => setState({ ...state, ClothingCategoryModal: false }),
    []
  ); // ClothingSection

  // ---------Callback----
  useEffect(() => {
    if (
      state?.showColor ||
      state?.ClothingCategoryModal ||
      state?.ClothingSection ||
      state?.Colour ||
      state?.DressSeason ||
      state?.DressTypeModal ||
      state?.GenderModal ||
      state?.MakeCountryModal ||
      state?.SubClothingSection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    state?.showColor,
    state?.ClothingCategoryModal,
    state?.ClothingSection,
    state?.Colour,
    state?.DressSeason,
    state?.DressTypeModal,
    state?.GenderModal,
    state?.MakeCountryModal,
    state?.SubClothingSection,

  ]);

  useQuery(
    ["products_get"],
    () => {
      return request({ url: "/products/get-product-info", token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setProductsData(res);
        }
      },
      onError: (err) => {
        console.log(err, "ERR PRODUCTS");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const toggleDropModalButton = () => {
    setState({ ...state, openDropModalButton: !state.openDropModalButton });
  };
  const newArray = []
  productsData?.sections?.filter(e => state?.section_Id?.includes(e?.id))?.map((data) => {
    return data?.sub_sections?.map(item => {
      newArray.push(item)
    })
  })
  // -----------------------------------------------------------

  const onSearch = (value) => {
    // console.log("search:", value);
  };


  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      if (getCurrentDimension().width < 758 && state?.showColor) {
        setState({ ...state, showColor: false });
      }
      setScreenSize(getCurrentDimension());
    };

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  console.log(state?.AccessoriesList, "AccessoriesList");
  console.log(state?.outWearList, "outWearList");

  // console.log(state?.underWearList?.underWearLetterSize, state?.underWearList?.underWearLetterSize?.length, "state?.underWearList?.underWearLetterSize");
  // console.log(state?.outWearList?.outWearLetterSize, state?.outWearList?.outWearLetterSize?.length, "state?.outWearList?.outWearLetterSize");
  // console.log(state?.AccessoriesList?.accessoryLetterSize, state?.AccessoriesList?.accessoryLetterSize?.length, "state?.AccessoriesList?.accessoryLetterSize");

  const LocationAddSubmit = () => {

    // console.log(
    //   state?.section_Id, "section_Id", '\n',
    //   state?.sub_Section_Id, "sub_Section_Id", ' \n',
    //   state?.season_Id, "season_Id \n",
    //   state?.color_Id, "color_Id \n",
    //   state?.gender_Id, "gender_Id \n",
    //   state?.min_Age_Category, "min_Age_Category \n",
    //   state?.max_Age_Category, "max_Age_Category \n",
    //   state?.sku, "sku \n",
    //   <br />,
    //   state?.category_Id, "category_Id \n",
    //   state?.type_Id, "type_Id \n",
    //   state?.filterTypeId, "filterTypeId \n",
    //   <br />,
    //   state?.producer_Id, "producer_Id \n",
    //   state?.photos1, "photos1 \n",
    //   state?.shopId, "shopId \n",
    //   state?.shopLocationId, "shopLocationId \n",
    //   state?.amount, 'amount \n',
    //   state?.age, 'age \n',
    //   state?.price, 'price \n',
    //   state?.discount_percent, 'discount_percent \n',
    //   state?.discount_price, 'discount_price \n',
    //   state?.headWearList, "headWearList \n",
    //   state?.outWearList, "outWearList \n",
    //   state?.underWearList, "underWearList \n",
    //   state?.shoesList, "shoesList \n",
    //   state?.AccessoriesList, "AccessoriesList \n",
    //   state?.textForm, "textForm \n",
    // );
    let form = new FormData();
    form.append("shop_id", state?.shopId);
    form.append("shop_location_id", state?.shopLocationId);
    state?.section_Id?.map((e, index) => {
      form.append("section_ids[]", state?.section_Id[index]);
    })
    state?.sub_Section_Id?.map((e, index) => {
      form.append("sub_section_ids[]", state?.sub_Section_Id[index]);
    })
    state?.season_Id?.map((e, index) => {
      form.append("season_ids[]", state?.season_Id[index]);
    })

    form.append("color_id", state?.color_Id);
    form.append("gender_id", state?.gender_Id);
    form.append("min_age_category", state?.min_Age_Category);
    form.append("max_age_category", state?.max_Age_Category);
    form.append("sku", state?.sku);
    form.append("category_id", parseFloat(state?.category_Id));
    form.append("type_id", parseFloat(state?.filterTypeId));
    form.append("producer_id", state?.producer_Id);
    selectedFiles?.map((item, index) => {
      item?.id && form.append("photos[]", item?.pictureBgFile);
    })
    // detailsForAll
    form.append("price", state?.price);
    state?.amount && form.append("amount", state?.amount);
    state?.age && form.append("age", state?.age);
    state?.discount_percent && form.append("discount_percent", state?.discount_percent);//no R
    state?.discount_price && form.append("discount_price", state?.discount_price);//no R
    // textForm
    form.append("name_uz", state?.textForm?.name_Uz);
    form.append("name_ru", state?.textForm?.name_Ru);
    form.append("quality_uz", state?.textForm?.quality_Uz);
    form.append("quality_ru", state?.textForm?.quality_Ru);
    form.append("description_uz", state?.textForm?.description_Uz);
    form.append("description_ru", state?.textForm?.description_Ru);
    state?.textForm?.composition_Uz && form.append("composition_uz", state?.textForm?.composition_Uz);//no R
    state?.textForm?.composition_Ru && form.append("composition_ru", state?.textForm?.composition_Ru);//no R
    state?.textForm?.brand_id && form.append("brand_id", state?.textForm?.brand_id);//no R
    // HeadWear
    state?.headWearList?.oneSiz && form.append("one_size", state?.headWearList?.oneSize);
    // form.append("one_size", true);
    state?.headWearList?.minHeadGirth && form.append("min_head_girth", state?.headWearList?.minHeadGirth);
    state?.headWearList?.maxHeadGirth && form.append("max_head_girth", state?.headWearList?.maxHeadGirth);
    // OutWear
    state?.outWearList?.outWearLetterSize && form.append("outwear_letter_size", state?.outWearList?.outWearLetterSize);
    state?.outWearList?.minOutWearSize && form.append("min_outwear_size", state?.outWearList?.minOutWearSize);
    state?.outWearList?.maxOutWearSize && form.append("max_outwear_size", state?.outWearList?.maxOutWearSize);
    state?.outWearList?.minChestGirth && form.append("min_chest_girth", state?.outWearList?.minChestGirth);
    state?.outWearList?.maxChestGirth && form.append("max_chest_girth", state?.outWearList?.maxChestGirth);
    state?.outWearList?.minOutWearWaistGirth && form.append("min_outwear_waist_girth", state?.outWearList?.minOutWearWaistGirth);
    state?.outWearList?.maxOutWearWaistGirth && form.append("max_outwear_waist_girth", state?.outWearList?.maxOutWearWaistGirth);
    state?.outWearList?.minOutWearHipGirth && form.append("min_outwear_hip_girth", state?.outWearList?.minOutWearHipGirth);
    state?.outWearList?.maxOutWearHipGirth && form.append("max_outwear_hip_girth", state?.outWearList?.maxOutWearHipGirth);
    // UnderWear
    state?.underWearList?.underWearLetterSize && form.append("underwear_letter_size", state?.underWearList?.underWearLetterSize);
    state?.underWearList?.minHeight && form.append("min_height", state?.underWearList?.minHeight);
    state?.underWearList?.maxHeight && form.append("max_height", state?.underWearList?.maxHeight);
    state?.underWearList?.minUnderWearSize && form.append("min_underwear_size", state?.underWearList?.minUnderWearSize);
    state?.underWearList?.maxUnderWearSize && form.append("max_underwear_size", state?.underWearList?.maxUnderWearSize);
    state?.underWearList?.minUnderwearWaistGirth && form.append("min_underwear_waist_girth", state?.underWearList?.minUnderwearWaistGirth);
    state?.underWearList?.maxUnderwearWaistGirth && form.append("max_underwear_waist_girth", state?.underWearList?.maxUnderwearWaistGirth);
    state?.underWearList?.minUnderWearHipGirth && form.append("min_underwear_hip_girth", state?.underWearList?.minUnderWearHipGirth);
    state?.underWearList?.maxUnderWearHipGirth && form.append("max_underwear_hip_girth", state?.underWearList?.maxUnderWearHipGirth);
    // FooterSize
    state?.shoesList?.footWearSize && form.append("footwear_size", state?.shoesList?.footWearSize);
    state?.shoesList?.minFootLength && form.append("min_foot_length", state?.shoesList?.minFootLength);
    state?.shoesList?.maxFootLength && form.append("max_foot_length", state?.shoesList?.maxFootLength);
    // Accessory
    state?.AccessoriesList?.accessoryLetterSize && form.append("accessory_letter_size", state?.AccessoriesList?.accessoryLetterSize);
    state?.AccessoriesList?.accessorySize && form.append("accessory_size", state?.AccessoriesList?.accessorySize);
    state?.AccessoriesList?.legnthAcc && form.append("length", state?.AccessoriesList?.legnthAcc);
    state?.AccessoriesList?.widthAcc && form.append("width", state?.AccessoriesList?.widthAcc);


    return fetch(`${url}/products/store`, {
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
          setState({ ...state, errorList: res?.errors })
        } else if (res?.message) {
          toast.success(`${res?.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
          // navigate("/products")
          // setDressInfo({ ...dressInfo, nextPageShowForm: true })
          // window.location.reload();
        }
        console.log(res, "ProductStore");
      })
      .catch((err) => console.log(err, "errImage"));
  };
  const handleNextPage = () => {
    setState({ ...state, isCheckValid: true })
    if (
      state?.shopId &&
      state?.shopLocationId &&
      state?.section_Id &&
      state?.color_Id &&
      state?.gender_Id &&
      state?.min_Age_Category &&
      state?.max_Age_Category &&
      state?.sku &&
      state?.category_Id &&
      state?.price &&
      state?.filterTypeId &&
      state?.producer_Id &&
      state?.producer_Id &&
      state?.season_Id &&
      selectedFiles?.length > 1
    ) {
      setDressInfo({ ...dressInfo, nextPageShowForm: false })
      setState({ ...state, isCheckValid: false })

    }
  }
  // console.log(state?.isCheckValid, "isCheckValid");


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [dressInfo?.nextPageShowForm]);

  return (
    <div className="w-full h-fit ">
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
      <div>{state?.errorList}</div>
      {/* {dressInfo?.nextPageShowForm ? */}
      <div className={`${dressInfo?.nextPageShowForm ? "flex" : "hidden"} relative w-full md:px-0  items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor `}>
        <section
          onClick={() =>
            setState({
              ...state,
              ClothingSection: false,
              SubClothingSection: false,
              DressSeason: false,
              Colour: false,
              GenderModal: false,
              DressTypeModal: false,
              MakeCountryModal: false,
              ClothingCategoryModal: false,
              showColor: false,
              openSelect: false,
            })
          }
          className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.ClothingSection ||
              state?.SubClothingSection ||
              state?.DressSeason ||
              state?.Colour ||
              state?.GenderModal ||
              state?.DressTypeModal ||
              state?.ClothingCategoryModal ||
              state?.showColor ||
              state?.openSelect ||
              state?.MakeCountryModal
              ? ""
              : "hidden"
            }`}
        ></section>

        {state?.showColor && (
          <div className="max-w-[576px] w-full fixed z-[221]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto ">
            {/* </div> */}
            <div className="relative z-[223]  top-0 w-full h-fit p-4 mx-auto bg-white rounded-md shadow-lg">
              <div
                className={`flex items-center justify-between border-b border-searchBgColor pb-3`}
              >
                <span className="text-black text-lg not-italic font-AeonikProRegular leading-5">
                  Выберите цвет
                </span>
                <button
                  className="py-2"
                  type=""
                  onClick={() => setState({ ...state, showColor: false })}
                >
                  <MenuCloseIcons colors={"#000"} />
                </button>
              </div>
              <div className="py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
                {productsData?.colors.map((data) => {
                  return (
                    <div className="flex flex-col items-center justify-center ">
                      <div
                        key={data?.id}
                        onClick={() => setState({ ...state, color_Id: data?.id })}
                        style={{ background: `${data.hex}` }}
                        className={`rounded-[12px] flex items-center justify-center  w-[65px] h-[40px] bg-[${data.hex
                          }] cursor-pointer ${data?.id == 2
                            ? "border border-setTexOpacity flex items-center justify-center"
                            : ""
                          }
                     `}
                      >
                        {data?.id === state?.color_Id && state?.color_Id !== 2 ? (
                          <InputCheckedTrueIcons colors={"#fff"} />
                        ) : null}

                        {state?.color_Id === 2 && data?.id === state?.color_Id ? (
                          <InputCheckedTrueIcons colors={"#000"} />
                        ) : null}
                      </div>
                      <span
                        className={`text-black text-center text-xs not-italic font-AeonikProRegular`}
                      >
                        {data?.name_ru}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-end  gap-x-5">

                {state?.color_Id &&
                  <button
                    onClick={() => setState({ ...state, color_Id: '', showColor: false })}
                    className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1"                    >
                    Отключить
                  </button>
                }
                <button onClick={() => setState({ ...state, showColor: false })}
                  className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                  Готово
                </button>
              </div>
            </div>
          </div>
        )}
        <section
          className={` max-w-[440px] md:max-w-[700px] z-[201] mx-auto w-full flex-col h-fit bg-white fixed px-4 py-5 md:py-[35px] md:px-[25px] rounded-t-lg md:rounded-b-lg left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${state?.openSelect ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
            }`}
        >
          <button
            onClick={() => setState({ ...state, openSelect: false })}
            type="button"
            className="absolute  right-3 top-3 w-5 h-5 "
          >
            <MenuCloseIcons className="w-full h-full" colors={"#a1a1a1"} />
          </button>
          <div className="w-full h-fit flex items-center justify-center py-5 border-b border-borderColor2">
            <p className="text-tableTextTitle2 text-2xl not-italic font-AeonikProRegular">
              Прикрепить к локация
            </p>
          </div>
          <div className="w-full px-[10px] py-[30px] flex flex-col gap-y-[10px]">
            {productsData?.shops?.filter(e => e?.id === state?.shopId).map((item) => {
              return item?.shop_locations?.map(data => {
                return (
                  <button
                    onClick={() => setState({ ...state, shopLocationId: data?.id, openSelect: false })}
                    key={data?.id}
                    className={`w-full py-[10px] px-[20px] flex items-center justify-between rounded-[8px] ${data?.id == state?.shopLocationId ? "bg-LocationSelectBg" : "bg-white"} hover:bg-LocationSelectBg focus:bg-LocationSelectBg`}
                  >
                    <span className="text-tableTextTitle2 text-xl not-italic font-AeonikProRegular">
                      {" "}
                      {data?.address}
                    </span>
                    {
                      data?.id == state?.shopLocationId &&
                      <BiCheckDouble size={25} color={"#007dca"} />
                    }
                  </button>
                )
              })
            })
            }

          </div>
        </section>

        <div className="absolute top-[0px] hidden md:flex items-center justify-center flex-col mr-[50px]">
          <div className="w-[45px] h-[45px] font-AeonikProMedium border-2 flex items-center justify-center bg-textBlueColor border-textBlueColor rounded-full text-2xl text-white mb-[5px]">
            1
          </div>
          <div className="w-[2px] h-[150px] bg-textBlueColor active:bg-textBlueColor mb-[5px] "></div>
          <div className="flex items-center justify-center font-AeonikProMedium text-textBlueColor text-2xl border border-textBlueColor w-[45px] h-[45px] rounded-full mb-[5px]">
            2
          </div>
          <div className="line flex-1"></div>
        </div>

        {/* ---------------------------------------- */}
        {/* Clothing Section */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <ClothingSection onClick={ClothingSectionToggle} />
        </section>

        {/*Sub Clothing Section */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.SubClothingSection ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <SubClothingSection onClick={SubClothingSectionToggle} />
        </section>
        {/*DressSeason */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressSeason ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <DressSeason onClick={DressSeasonToggle} />
        </section>
        {/*ColourList */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.Colour ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <ColourGroup onClick={ColourListToggle} />
        </section>
        {/*ColourList */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.GenderModal ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <GenderList onClick={GenderListToggle} />
        </section>
        {/*DressType */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.DressTypeModal ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <DressType onClick={DressTypeToggle} />
        </section>
        {/*MakeCountry */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.MakeCountryModal ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <MakeCountry onClick={MakeCountryToggle} />
        </section>
        {/*ClothingCategory */}
        <section
          className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingCategoryModal ? "bottom-0" : "bottom-[-800px] z-0"
            }`}
        >
          <ClothingCategory onClick={ClothingCategoryToggle} />
        </section>
        {/* ---------------------------------------- */}

        <div className="w-full md:mx-[140px] md:mb-[50px] xs:border border-borderColor rounded-xl md:px-0 p-1">
          <div className="w-full h-fit md:relative md:py-12">
            <div className=" w-full h-fit flex gap-x-4 flex-col-reverse md:flex-row md:px-7 ">
              <div className="w-full md:w-[70%] h-fit flex flex-col gap-y-6">
                <div className="w-full grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-6 mt-6 md:mt-0">
                  {/* Input Select 1.1 */}
                  <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Магазин
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      // onClick={() =>
                      //   setState({ ...state, ClothingSection: true })
                      // }
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className={`w-full hidden md:flex rounded-lg overflow-hidden`}>

                      <Select
                        className={`overflow-hidden rounded-lg w-full h-11 md:h-10  ${state?.isCheckValid && !state?.shopId ? "!border border-[#FFB8B8] !bg-[#FFF6F6]" : ""}`}
                        showSearch
                        placeholder="Выбрать"
                        optionFilterProp="children"
                        onChange={(e) => setState({ ...state, shopId: e })}
                        onSearch={onSearch}
                        size="large"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }

                      >
                        {productsData?.shops?.map((data) => {
                          return (
                            <>
                              {data?.shop_locations?.length >= 1 && <Option
                                key={data.id}
                                value={data?.id}
                              >
                                {data?.name}
                              </Option>}
                            </>
                          )
                        })}

                      </Select>
                    </div>
                  </div>
                  {/* Input Select 2.1 */}
                  <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className={`text-[13px] md:text-base font-AeonikProRegular ${state?.shopId ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                        Локация
                      </span>
                      <span className="ml-[5px]">
                        {state?.shopId ? (
                          <StarLabel />
                        ) : null}
                      </span>
                    </div>
                    <button
                      // onClick={() =>
                      //   setState({ ...state, SubClothingSection: true })
                      // }
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className="w-full h-fit hidden md:flex">
                      {state?.shopId ?
                        <button
                          onClick={() => setState({ ...state, openSelect: true })}
                          type="button"
                          className={`w-full h-11 md:h-10 overflow-hidden rounded-lg flex cursor-pointer items-center justify-between 
                           ${state?.isCheckValid && !state?.shopLocationId ? "border border-[#FFB8B8] " : "border border-borderColor"}

                           px-3`}
                        >

                          {state?.shopLocationId ? productsData?.shops?.filter(e => e?.id === state?.shopId).map((item) => {
                            return item?.shop_locations?.filter(e => e?.id == state?.shopLocationId)?.map(data => {
                              return (
                                <span
                                  className="w-[85%] whitespace-nowrap	flex items-center text-tableTextTitle2 text-[14px] not-italic font-AeonikProRegular"                                  // onClick={() => setState({ ...state, shopLocationId: data?.id, openSelect: false })}
                                  key={data?.id}
                                >
                                  <span className="w-full whitespace-nowrap flex items-center">{data?.address}</span>
                                </span>
                              )
                            })
                          })
                            :
                            <label className="text-[14px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                              Выбрать
                            </label>
                          }

                          <span className="rotate-[90deg]">
                            <ArrowRightIcon />
                            {/* <DownOutlined style={{ colors: "#b5b5b5" }} /> */}
                          </span>
                        </button>
                        :
                        <button
                          type="button"
                          className="w-full h-11 md:h-10  bg-[#F5F5F5] rounded-lg flex cursor-pointer items-center justify-between border border-borderColor px-3"
                        >
                          <label className="text-[15px] mt-[3px] font-AeonikProRegular text-[#b5b5b5] tracking-wider	ant-select-selection-placeholder">
                            Выбрать
                          </label>
                          <span className="rotate-[90deg]">
                            <ArrowRightIcon />
                            {/* <DownOutlined style={{ fontSize: "16px", colors: "#b5b5b5" }} /> */}
                          </span>
                        </button>}






                    </div>
                  </div>
                  {/* Input Select 1 */}
                  <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Раздел одежды
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setState({ ...state, ClothingSection: true })
                      }
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className={`w-full  hidden md:flex  rounded-lg focus:border-none overflow-hidden`}>
                      <Select
                        className={`overflow-hidden rounded-lg w-full  ${state?.isCheckValid && !state?.section_Id?.length ? "!border border-[#FFB8B8] !bg-[#FFF6F6]" : ""}`}
                        showSearch
                        mode="multiple"
                        placeholder="Выбрать"
                        optionLabelProp="label"
                        // optionFilterProp="children"
                        onChange={(e) => setState({ ...state, section_Id: e })}
                        onSearch={onSearch}
                        size="large"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }

                      >
                        {productsData?.sections?.map((item) => {
                          return (
                            <Option
                              key={item.id}
                              value={item.id}
                              label={item.name_ru}
                            >
                              <Space>
                                <span>{item.name_ru}</span>
                              </Space>
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  {/* Input Select 2 */}
                  <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className={`text-[13px] md:text-base font-AeonikProRegular ${newArray?.length ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                        Подраздел одежды
                      </span>
                      <span className="ml-[5px]">
                        {newArray?.length ? (
                          <StarLabel />
                        ) : null}
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setState({ ...state, SubClothingSection: true })
                      }
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className="w-full h-fit hidden md:flex">
                      <Select
                        className={` rounded-lg w-full h-11 md:h-10 ${state?.isCheckValid && !state?.sub_Section_Id?.length && newArray?.length ? " overflow-hidden border border-[#FFB8B8] " : ""}`}
                        showSearch
                        disabled={
                          newArray?.length ? false : true
                        }
                        placeholder="Выбрать"
                        mode="multiple"
                        optionLabelProp="label"
                        onChange={(e) => setState({ ...state, sub_Section_Id: e })}
                        onSearch={onSearch}
                        size="large"
                        allowClear
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }

                      >
                        {newArray?.map(item => {
                          return (
                            <Option
                              key={item.id}
                              value={item.id}
                              label={item.name_ru}
                            >
                              <Space>
                                <span>{item.name_ru}</span>
                              </Space>
                            </Option>
                          );

                        })
                        }
                      </Select>

                    </div>
                  </div>
                  {/* Input Select 3 */}
                  <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Сезон одежды
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() => setState({ ...state, DressSeason: true })}
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className="w-full h-fit hidden md:flex">
                      <Select
                        className={`overflow-hidden rounded-lg w-full  ${state?.isCheckValid && !state?.season_Id?.length ? "!border border-[#FFB8B8] !bg-[#FFF6F6]" : ""}`}
                        mode="multiple"
                        style={{
                          width: "100%",
                        }}
                        placeholder="Выбрать"
                        // defaultValue={["china"]}
                        size="large"
                        onChange={(e) => setState({ ...state, season_Id: e })}
                        optionLabelProp="label"
                      >
                        {productsData?.seasons?.map((item) => {
                          return (
                            <Option
                              key={item.id}
                              value={item.id}
                              label={item.name_ru}
                            >
                              <Space>
                                <span>{item.name_ru}</span>
                              </Space>
                            </Option>
                          );
                        })}
                      </Select>
                    </div>
                  </div>
                  {/* Input Select 4 */}
                  <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Цвет
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() => setState({ ...state, Colour: true })}
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-2"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className={`w-full hidden md:flex items-center gap-x-1 justify-between  overflow-hidden                   
                          ${state?.isCheckValid && !state?.color_Id ? "border border-[#FFB8B8] " : "border border-borderColor"}
 rounded-lg  h-[42px] md:h-10 px-[12px]`}>
                      {productsData.colors
                        ?.filter((e) => e?.id <= 9)
                        ?.map((data) => {
                          return (
                            <div key={data?.id} className="block ">
                              <div className="w-full ">
                                <label
                                  key={data?.id}
                                  htmlFor={data?.id}
                                  onClick={() => setState({ ...state, color_Id: data?.id })}

                                  style={{ background: `${data.hex}` }}
                                  className={`rounded-full border  w-[22px] h-[22px] p-[2px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
                                >
                                  {data?.id === state?.color_Id && state?.color_Id !== 2 ? (
                                    <BiCheck size={25} color={"#fff"} className="flex items-center justify-center" />
                                  ) : null}

                                  {state?.color_Id === 2 && data?.id === state?.color_Id ? (
                                    <BiCheck size={25} color={"#000"} className="flex items-center justify-center" />
                                  ) : null}
                                </label>
                                <input
                                  type="radio"
                                  id={data?.id}
                                  name="checkStatus"
                                  value={data?.id}
                                  className={"hidden w-full h-full"}
                                />
                              </div>
                            </div>
                          );
                        })}
                      <button
                        onClick={() => setState({ ...state, showColor: true })}
                        type="button"
                      >
                        <AddIconsCircle1 />
                      </button>
                    </div>
                  </div>
                  {/* Input Select 5 */}
                  <div className="w-full h-fit  flex items-center gap-x-3">
                    <div className="w-full md:w-1/2 flex flex-col gap-y-[5px]">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Пол
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <button
                        onClick={() => setState({ ...state, GenderModal: true })}
                        type="button"
                        className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                      >
                        <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                          Выбрать
                        </label>
                        <ArrowRightIcon />
                      </button>
                      <div className="w-full h-fit md:flex hidden">
                        <Select
                          className={` ${state?.isCheckValid && !state?.gender_Id ? "border border-[#FFB8B8] " : ""}
                          rounded-lg w-full h-11 md:h-10 overflow-hidden`}
                          showSearch
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onChange={(e) => setState({ ...state, gender_Id: e })}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={productsData?.gender?.map((item) => {
                            return {
                              value: item?.id,
                              label: item?.name_ru,
                            };
                          })}
                        />
                      </div>
                    </div>
                    <div className="w-1/2 hidden md:flex flex-col gap-y-[5px] ">
                      <div className="flex items-center">
                        <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                          Возраст
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit flex items-center gap-x-2">
                        <input
                          type="text"
                          name="age"
                          placeholder="Мин"
                          value={state?.min_Age_Category}
                          onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                          className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.min_Age_Category ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                        />
                        <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                        <input
                          type="text"
                          name="age"
                          placeholder="Мах"
                          value={state?.max_Age_Category}
                          onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                          className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.max_Age_Category ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Input Select 6 */}
                  <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                    <div className="flex items-center  ">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Артикул
                      </span>

                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full h-fit flex items-center justify-between gap-x-3">
                      <input
                        type="text"
                        value={state?.sku}
                        onChange={(e) => setState({ ...state, sku: e.target.value })}
                        placeholder=""
                        className={`inputStyle w-[calc(100%-42px)] h-10  flex items-center justify-between ${state?.isCheckValid && !state?.sku ? "border border-[#FFB8B8] " : "border border-borderColor"} rounded-lg px-[10px] outline-none`}
                      />
                      <button
                        onClick={() => randomCode(17)}
                        type={"button"}
                        className={`w-[40px] h-[40px] active:scale-95  active:opacity-70 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg`}
                      >
                        <LoaderIcon />
                      </button>
                    </div>
                  </div>
                  {/* Input Select 7 */}
                  <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Категория одежды
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full h-fit">
                      <button
                        onClick={toggleDropModalButton}
                        type="button"
                        className={`w-full overflow-hidden h-[40px] hidden md:flex items-center justify-between ${state?.isCheckValid && !state?.category_Id && !state?.price ? "border border-[#FFB8B8] " : "border border-borderColor"}  rounded-lg p-3 `}
                      >
                        {state?.type_Id ?
                          productsData?.categories?.filter(e => e?.id == state?.type_Id)?.map((item) => {
                            return (
                              <span className="text-[#000]">{item?.name_ru}</span>
                            )
                          })
                          : <span className="text-[#a1a1a1]"> Выбрать</span>
                        }
                        {state.openDropModalButton ? (
                          <span className="-rotate-90 transition duration-200 ease-out">
                            <ArrowRightIcon />
                          </span>
                        ) : (
                          <span className="rotate-90 transition duration-200 ease-out">
                            <ArrowRightIcon />
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() =>
                          setState({
                            ...state,
                            ClothingCategoryModal: !state?.ClothingCategoryModal,
                          })
                        }
                        type="button"
                        className={`w-full overflow-hidden h-[40px] md:hidden flex items-center justify-between border border-borderColor rounded-lg p-3 `}
                      >
                        <span className="text-[#a1a1a1]">Выбрать</span>
                        {state.openDropModalButton ? (
                          <span className="-rotate-90 transition duration-200 ease-out">
                            <ArrowRightIcon />
                          </span>
                        ) : (
                          <span className="rotate-90 transition duration-200 ease-out">
                            <ArrowRightIcon />
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                  {/* Input Select 8 */}
                  <div className="w-full   h-fit  hidden md:flex items-center gap-x-3">
                    <div className="w-1/2 flex flex-col gap-y-[5px] ">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Тип
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-fit">
                        <Select
                          className={`overflow-hidden block rounded-lg w-full h-11 md:h-10  ${state?.isCheckValid && !state?.filterTypeId ? "border border-[#FFB8B8] bg-[#FFF6F6]" : ""}`}
                          showSearch
                          allowClear
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onChange={(value, attribute2) => {
                            setState({ ...state, filterTypeId: value, type_Id: attribute2?.attribute2 })
                            // CategoryTypeId(value, attribute2?.attribute2)
                          }}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                        >
                          {dressInfo?.ProductFilterType ? productsData?.types?.filter(e => e?.category_id == dressInfo?.ProductFilterType)?.map((item) => {
                            return (
                              <Option
                                key={"item_" + item.id}
                                value={item?.id}
                                attribute2={item?.category_id}
                              >
                                {item.name_ru}
                              </Option>
                            )
                          }) : productsData?.types?.map((item) => {
                            return (
                              <Option
                                key={"item_" + item.id}
                                value={item?.id}
                                attribute2={item?.category_id}
                              >
                                {item.name_ru}
                              </Option>
                            )
                          })
                          }
                        </Select>
                      </div>
                    </div>
                    <div className="w-1/2 flex flex-col gap-y-[5px] ">
                      <div className="flex items-center">
                        <span className="text-[13px] md:text-base font-AeonikProRegular">
                          Производитель
                        </span>
                        <span className="ml-[5px]">
                          <StarLabel />
                        </span>
                      </div>
                      <div className="w-full h-11 md:h-10 overflow-hidden">
                        <Select
                          className={`overflow-hidden rounded-lg w-full  h-full ${state?.isCheckValid && !state?.producer_Id ? "border border-[#FFB8B8] " : ""}`}
                          showSearch
                          placeholder="Выбрать"
                          optionFilterProp="children"
                          onChange={(e) => setState({ ...state, producer_Id: e })}
                          onSearch={onSearch}
                          size="large"
                          filterOption={(input, option) =>
                            (option?.label ?? "")
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          options={productsData?.producers?.map((item) => {
                            return {
                              value: item?.id,
                              label: item?.name_ru,
                            };
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  {/* Input Select 9 mobile */}
                  <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Тип
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() => setState({ ...state, DressTypeModal: true })}
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className="w-full h-fit md:flex hidden">
                      <Select
                        className={`block rounded-lg w-full h-11 md:h-10  ${state?.isCheckValid && !state?.filterTypeId ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor"}`}
                        showSearch
                        placeholder="Выбрать"
                        optionFilterProp="children"
                        onChange={(value, attribute2) => {
                          setState({ ...state, filterTypeId: value, type_Id: attribute2?.attribute2 })
                        }}
                        onSearch={onSearch}
                        size="large"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      // options={productsData?.types?.map((item) => {
                      //   return {
                      //     value: item?.id,
                      //     label: item?.name_ru,
                      //   };
                      // })}
                      >
                        {dressInfo?.ProductFilterType ? productsData?.types?.filter(e => e?.category_id == dressInfo?.ProductFilterType)?.map((item) => {
                          return (
                            <Option
                              key={"item_" + item.id}
                              value={item?.id}
                              attribute2={item?.category_id}
                            >
                              {item.name_ru}
                            </Option>
                          )
                        }) : productsData?.types?.map((item) => {
                          return (
                            <Option
                              key={"item_" + item.id}
                              value={item?.id}
                              attribute2={item?.category_id}
                            >
                              {item.name_ru}
                            </Option>
                          )
                        })
                        }
                      </Select>
                    </div>
                  </div>
                  {/* Input Select 10 mobile */}
                  <div className="w-full  flex md:hidden flex-col gap-y-[5px]">
                    <div className="flex items-center">
                      <span className="text-[13px] md:text-base font-AeonikProRegular">
                        Производитель
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <button
                      onClick={() =>
                        setState({ ...state, MakeCountryModal: true })
                      }
                      type="button"
                      className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                    >
                      <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                        Выбрать
                      </label>
                      <ArrowRightIcon />
                    </button>
                    <div className="w-full h-fit md:flex hidden">
                      <Select
                        className=" rounded-lg w-full h-11 md:h-10"
                        showSearch
                        placeholder="Выбрать"
                        optionFilterProp="children"
                        onChange={(e) => setState({ ...state, producer_Id: e })}
                        onSearch={onSearch}
                        size="large"
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        options={productsData?.producers?.map((item) => {
                          return {
                            value: item?.id,
                            label: item?.name_ru,
                          };
                        })}
                      />
                    </div>
                  </div>
                  {/* Input Select 11 mobile */}
                  <div className="w-full  flex md:hidden flex-col gap-y-[5px] ">
                    <div className="flex items-center">
                      <span className="text-[12px] flex flex-wrap whitespace-nowrap md:text-base font-AeonikProRegular">
                        Возрастная категория
                      </span>
                      <span className="ml-[5px]">
                        <StarLabel />
                      </span>
                    </div>
                    <div className="w-full h-fit flex items-center justify-between gap-x-2">
                      <input
                        type="text"
                        name="age"
                        placeholder="Мин"
                        value={state?.min_Age_Category}
                        onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                        className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                      />
                      <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                      <input
                        type="text"
                        name="age"
                        placeholder="Мах"
                        value={state?.max_Age_Category}
                        onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                        className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                      />
                    </div>
                  </div>
                </div>

                <div>
                  {state.openDropModalButton ? (
                    <div className="w-full hidden md:flex items-center flex-wrap gap-3 ">
                      <HeadWearAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackHeadWear} />
                      <OutWearAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackOutWear} />
                      <UnderAddWear title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackUnderWear} />
                      <ShoesAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackShoesWear} />
                      <AccessoriesAdd title={productsData?.categories} typeId={state?.type_Id} handleCallBack={CallBackAccessoriesWear} />
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-[30%] h-fit flex md:flex-col flex-row  justify-center gap-x-4 ">
                <div className="hidden md:flex items-center  justify-start mb-[5px]">
                  <span className="text-base font-AeonikProRegular">Фото</span>
                  <span className="ml-[5px]">
                    <StarLabel />
                  </span>
                </div>
                <div className="w-[300px] md:w-full h-[350px] flex items-center justify-center ">
                  {
                    selectedFiles?.filter(e => e?.id <= 1)?.map((item, index) => {
                      return (
                        <>
                          {item?.id && <button
                            type="button"
                            className="h-full w-full flex items-center justify-center "
                          >
                            <label
                              htmlFor="DataImg1"
                              className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  text-textBlueColor "
                            >
                              <input
                                className="hidden"
                                id="DataImg1"
                                type="file"
                                onChange={handleLocationImage2}
                                accept=" image/*"
                              />
                              {!item?.pictureBgView1 && (
                                <div className="w-full h-full flex  bg-photoBg items-center justify-center border border-dashed rounded-lg">
                                  <span className="leading-none flex items-center text-textBlueColor border-b border-textBlueColor font-AeonikProMedium">
                                    Выберите фото   <span className="ml-[5px]">
                                      <StarLabel />
                                    </span>
                                  </span>
                                </div>
                              )}
                              {item?.pictureBgView1 && (
                                <img
                                  src={item?.pictureBgView1}
                                  alt="backImg"
                                  className="w-full h-full border border-searchBgColor object-contain rounded-lg"
                                />
                              )}
                            </label>
                          </button>
                          }
                        </>
                      )
                    })
                  }
                  {selectedFiles?.length <= 1 && <button
                    type="button"
                    className="h-full w-full flex items-center justify-center "
                  >
                    <label
                      htmlFor="DataImg1"
                      className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  text-textBlueColor "
                    >
                      <input
                        className="hidden"
                        id="DataImg1"
                        type="file"
                        onChange={handleLocationImage2}
                        accept=" image/*"
                      />
                      {/* {!item?.pictureBgView1 && ( */}
                      <div className={`w-full h-full flex  bg-photoBg items-center justify-center ${state?.isCheckValid && selectedFiles?.length <= 1 ? "border border-[#FFB8B8] " : "border border-dashed"}   rounded-lg`}>
                        <span className="leading-none flex items-center text-textBlueColor border-b border-textBlueColor font-AeonikProMedium">
                          Выберите фото   <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </span>
                      </div>
                      {/* )} */}

                    </label>
                  </button>}
                </div>
                <div className="w-[90px] md:w-full flex flex-col md:flex-row items-center justify-between gap-y-2 gap-x-[10px] md:mt-[10px]">
                  {
                    selectedFiles?.filter(e => e?.id >= 2)?.map((item, index) => {
                      return (
                        <>
                          {item?.id && <div className="w-[90px] h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                            <button
                              type="button"
                              className="h-full w-full flex items-center justify-center "
                            >
                              <label
                                htmlFor="DataImg1"
                                className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                              >
                                <input
                                  className="hidden"
                                  id="DataImg1"
                                  type="file"
                                  onChange={handleLocationImage2}
                                  accept=" image/*"
                                />
                                {!item?.pictureBgView1 && (
                                  <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                                    <DownloadIcon />
                                    <div className="text-[11px] text-textLightColor mt-[5px]">
                                      (необязательно)
                                    </div>
                                  </div>
                                )}
                                {item?.pictureBgView1 && (
                                  <img
                                    src={item?.pictureBgView1}
                                    alt="backImg"
                                    className="w-full h-full object-contain border border-searchBgColor rounded-lg"
                                  />
                                )}
                              </label>
                            </button>
                          </div>}
                        </>
                      )
                    })
                  }
                  {selectedFiles?.length <= 2 && <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                    <button
                      type="button"
                      className="h-full w-full flex items-center justify-center "
                    >
                      <label
                        htmlFor="DataImg1"
                        className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                      >
                        <input
                          className="hidden"
                          id="DataImg1"
                          type="file"
                          onChange={handleLocationImage2}
                          accept=" image/*"
                        />

                        <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                          <DownloadIcon />
                          <div className="text-[11px] text-textLightColor mt-[5px]">
                            (необязательно)
                          </div>
                        </div>


                      </label>
                    </button>
                  </div>}
                  {selectedFiles?.length <= 3 && <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center">
                    <button
                      type="button"
                      className="h-full w-full flex items-center justify-center "
                    >
                      <label
                        htmlFor="DataImg1"
                        className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center text-textBlueColor "
                      >
                        <input
                          className="hidden"
                          id="DataImg1"
                          type="file"
                          onChange={handleLocationImage2}
                          accept=" image/*"
                        />
                        {/* {!state?.pictureBgView1 && ( */}
                        <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                          <DownloadIcon />
                          <div className="text-[11px] text-textLightColor mt-[5px]">
                            (необязательно)
                          </div>
                        </div>
                        {/* )} */}

                      </label>
                    </button>
                  </div>}
                  {selectedFiles?.length <= 4 && <div className="w-full h-1/3 md:h-[73px] md:w-1/3 flex flex-col items-center justify-center ">
                    <button
                      type="button"
                      className="h-full w-full flex items-center justify-center "
                    >
                      <label
                        htmlFor="DataImg1"
                        className="h-full w-full cursor-pointer  text-sm font-AeonikProMedium flex items-center flex-col justify-center  cursor-pointer  text-textBlueColor "
                      >
                        <input
                          className="hidden"
                          id="DataImg1"
                          type="file"
                          onChange={handleLocationImage2}
                          accept=" image/*"
                        />
                        <div className="w-full h-full overflow-hidden bg-photoBg border border-dashed rounded-lg flex flex-col items-center justify-center">
                          <DownloadIcon />
                          <div className="text-[11px] whitespace-normal text-center text-textLightColor mt-[5px]">
                            (необязательно)
                          </div>
                        </div>


                      </label>
                    </button>
                  </div>}
                </div>
              </div>
            </div>
            <div className="md:relative w-full  md:mt-[200px]">
              <div className="flex md:hidden items-center justify-between mb-[40px]">
                <div className="w-1/3 h-[1px] bg-borderColor"></div>
                <div className="w-1/3 flex items-center justify-around">
                  <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full	">
                    <span className="w-2 h-2 rounded-full bg-textBlueColor block "></span>
                  </button>
                  <span className="w-1/2 h-[1px]  bg-textBlueColor "></span>
                  <button className="w-4 h-4 flex items-center justify-center border border-textBlueColor rounded-full"></button>
                </div>
                <div className="w-1/3 h-[1px] bg-borderColor"></div>
              </div>

              <button
                type="button"
                // to="/products/add-detail"
                onClick={handleNextPage}
                className="w-full h-[42px] md:h-[45px] flex items-center justify-center md:w-fit md:absolute active:scale-95 md:right-3 md:bottom-3 md:px-[50px] py-3 border border-textBlueColor bg-textBlueColor text-white rounded-lg text-base md:text-lg font-AeonikProMedium"
              >
                Продолжить
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`relative w-full ${dressInfo?.nextPageShowForm ? "hidden" : " flex"}`}>
        <TextFormAdd onClick={LocationAddSubmit} handlCallBack={CallBackTextForm} />
      </div>
      {/* } */}
    </div >
  );
};

export default AddingProduct;
