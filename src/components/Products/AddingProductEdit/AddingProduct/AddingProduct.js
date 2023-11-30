import { Popover, Select, Space, Switch, TreeSelect } from "antd";
import React, { useContext, useEffect, useState } from "react";
import {
  AddIconsCircle1,
  ArrowRightIcon,
  DeleteIcon,
  DownloadIcon,
  InputCheckedTrueIcons,
  LoaderIcon,
  MenuCloseIcons,
  StarLabel,
} from "../../../../assets/icons";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingForSeller from "../../../Loading/LoadingFor";
import AddSize from "./Details/AddSize/AddSize";
import AllSizeModalEdit from "./DetailsForMobile/CategoriesMobileDropUp/AllSizeModalEdit/AllSizeModalEdit";
import CategoriesMobileDropUp from "./DetailsForMobile/CategoriesMobileDropUp/CategoriesMobileDropUp";
import { ProductCarouselEdit } from "../../../MarketLocations/Locations/ProductEditInLocation/AddingProductPageOne/MobileDropUpSides/ProductCarouselEdit/ProductCarouselEdit";


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
    // ClothingCategoryModal: false,
    isCheckValid: false,
    errorList: null,
    errorListMessage: null,
    type_Id: null,
    // --------------
    pictureBgFile1: null,
    pictureBgView1: null,
    pictureBgFile2: null,
    pictureBgView2: null,
    pictureBgFile3: null,
    pictureBgView3: null,
    pictureBgFile4: null,
    pictureBgView4: null,
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
    textListOfFormList: null,
    headWearList: null,
    outWearList: null,
    underWearList: null,
    shoesList: null,
    AccessoriesList: null,
    titleUz: null,
    titleRu: null,
    selectedUz: [],
    PathnameToken: '',
    // ------
    sendingLoader: false,
    //productsDataIdEdit
    sizeGetList: null


  });

  const [productsData, setProductsData] = useState({});




  function CallBackHeadWear(childData) {
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
  // const ClothingCategoryToggle = React.useCallback(
  //   () => setState({ ...state, ClothingCategoryModal: false }),
  //   []
  // ); // ClothingSection


  useQuery(
    ["products_get"], () => { return request({ url: "/products/get-product-info", token: true }) },
    {
      onSuccess: (res) => {
        setProductsData(res);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { id } = useParams()
  const newProductId = id?.replace(":", "")

  const [openCategories, setOpenCategories] = useState();
  const toggleCategories = React.useCallback(
    () => setOpenCategories(false),
    []
  ); // Categories
  const [selectColorID, setSelectColorID] = useState()
  const [colorChecked, setColorChecked] = useState();
  const [colorAction, setColorAction] = useState(false);
  const [colorDelete, setColorDelete] = useState(false);
  const [colorListForTest, setColorListForTest] = useState([]);
  const [lastElement, setLastElement] = useState('')

  const [productsDataIdEdit, setProductsDataIdEdit] = useState();
  const [section_Id, setSection_Id] = useState([]);
  const [subSection_Id, setSubSection_Id] = useState([]);
  const [season_Id, setSeason_Id] = useState([]);
  const [colors_Id, setColors_Id] = useState([]);


  useQuery(
    ["products_id"], () => { return request({ url: `/products/${newProductId}`, token: true }) },
    {
      onSuccess: (res) => {
        setProductsDataIdEdit(res?.product)
        // console.log(res?.product, "product");
        res?.product?.sections?.map(value => {
          setSection_Id(section_Id => [...section_Id, value?.id])
        })
        res?.product?.sub_sections?.map(value => {
          setSubSection_Id(subSection_Id => [...subSection_Id, value?.id])
        })
        res?.product?.seasons?.map(value => {
          setSeason_Id(season_Id => [...season_Id, value?.id])
        })
        res?.product?.colors?.map(value => {

          if (!colors_Id?.includes(value?.id)) {
            setColors_Id(colors_Id => [...colors_Id, value?.id])
            setColorListForTest(colorListForTest => [...colorListForTest, value?.id])
            setColorChecked(value?.id)
          }
        })


        setState({
          ...state,
          gender_Id: res?.product?.gender_id,
          min_Age_Category: res?.product?.min_age_category,
          max_Age_Category: res?.product?.max_age_category,
          sku: res?.product?.sku,
          category_Id: res?.product?.category_id,
          filterTypeId: res?.product?.type_id,
          producer_Id: res?.product?.producer_id,
          shopId: res?.product?.locations[0]?.shop_id,
          shopLocationId: res?.product?.locations[0]?.id,
          sizeGetList: res?.product?.sizes

        })
      },
      keepPreviousData: true,
      refetchOnWindowFocus: true,
    }
  );
  // console.log(section_Id, "section_Id");
  // console.log(subSection_Id, "subSection_Id");
  // console.log(season_Id, "season_Id");
  // console.log(colors_Id, "colors_Id");
  // console.log(state?.gender_Id, "state?.gender_Id");
  // console.log(state?.shopId, "state?.shopId");
  // console.log(state?.shopLocationId, "state?.shopLocationId");
  // ------------------------------------------------------------------------ border-red-500
  // allSizeModalShow
  const [allSizeModalShow, setAllSizeModalShow] = useState(false);
  const toggleAllSizeModalShow = React.useCallback(
    () => setAllSizeModalShow(false),
    []
  );


  // ------------------------------------------------------------------------

  const [newArray, setNewArray] = useState([])
  useEffect(() => {
    productsData?.sections?.filter(e => section_Id?.includes(e?.id))?.map((data) => {
      return data?.sub_sections?.map(item => {
        if (!newArray?.includes(item)) {
          setNewArray(newArray => [...newArray, item])
        }
      })
    })

  }, [section_Id])
  // -----------------------------------------------------------
  // ColorHandle
  // ------------------------------------------------------------------------
  function onHanleColorList(e) {
    setSelectColorID(e)
    if (colors_Id?.length === 2 && e) {
      setColors_Id(colors_Id?.filter(e => e !== colors_Id[colors_Id?.length - 1]))
      setColors_Id(colors_Id => [...colors_Id, e])
    } else {
      setColors_Id(colors_Id => [...colors_Id, e])
    }
  }

  function onHandleColorUnchecked(id) {
    if (colorListForTest?.includes(id)) {
      setColorDelete(true)
    } else {
      setColors_Id(colors_Id?.filter(e => e !== id))
      setSelectColorID()
    }
  }
  // -----------------------------------------------------------
  // ------------------------------------------------------------------------
  // useEffect(() => {
  //   if (colors_Id?.length > colorListForTest?.length) {
  //     setLastElement(colors_Id[colors_Id?.length - 1])
  //   } else {
  //     setLastElement('')
  //   }
  // }, [colors_Id])

  useEffect(() => {
    if (colorChecked !== selectColorID && selectColorID > 0) {
      setColorAction(true)
    } else {
      setColorAction(false)
    }

  }, [selectColorID])
  // console.log(lastElement, "lastElement");
  // console.log(colorChecked, "colorChecked");
  // console.log(colorAction, "colorAction");
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

  const LocationAddSubmit = () => {
    console.log(state?.textListOfFormList, " state?.textListOfFormList");
  }
  const CallBackTextForm = (childData) => {
  };
  const handleNextPage = () => {
    setDressInfo({ ...dressInfo, nextPageShowForm: false })
  }
  const handleChangeSubSection = (e) => {
    setSubSection_Id(e)
  }


  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [dressInfo?.nextPageShowForm]);

  const location = useLocation();
  const pathname = window.location.pathname;
  useEffect(() => {
    if (pathname !== '/products')
      setState({ ...state, PathnameToken: pathname.replace("/products/location/:", "") })

  }, [location.pathname]);
  useEffect(() => {
    if (state?.PathnameToken) {
      setDressInfo({ ...dressInfo, productAddByIdForToggle: state?.PathnameToken })
    }
  }, [state?.PathnameToken]);


  // ---------Callback----
  useEffect(() => {
    if (
      state?.showColor ||
      // state?.ClothingCategoryModal ||
      state?.ClothingSection ||
      state?.Colour ||
      state?.DressSeason ||
      state?.DressTypeModal ||
      state?.GenderModal ||
      state?.MakeCountryModal ||
      state?.SubClothingSection ||
      allSizeModalShow
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [
    state?.showColor,
    // state?.ClothingCategoryModal,
    state?.ClothingSection,
    state?.Colour,
    state?.DressSeason,
    state?.DressTypeModal,
    state?.GenderModal,
    state?.MakeCountryModal,
    state?.SubClothingSection,
    allSizeModalShow

  ]);

  // console.log(productsData.colors, "productsData.colors");
  // var num = 1234567890
  // const result = num.toLocaleString()?.split(",").join(" ")
  // const priceSpace = result?.split(",").join(" ")

  // console.log(result, "buResult");
  console.log(selectColorID, "selectColorID");
  console.log(colorChecked, "colorChecked");
  return (
    <div className="w-full h-fit ">
      {state?.sendingLoader ? <LoadingForSeller /> :
        <div>
          <div className=" flex items-center grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 mt-5 ">
            {state?.errorListMessage && <div className="w-full  flex items-center gap-x-2 ">
              <span className="text-[16px] text-textRedColor font-AeonikProRegular">{state?.errorListMessage}</span>
            </div>}
            {state?.errorList?.shop_id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Магазин:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.shop_id[0]}</span>
            </div>}
            {state?.errorList?.shop_location_id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Локация:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.shop_location_id[0]}</span>
            </div>}
            {state?.errorList?.section_ids && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Раздел одежды:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.section_ids[0]}</span>
            </div>}
            {state?.errorList?.season_ids && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Сезон одежды:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.season_ids[0]}</span>
            </div>}
            {state?.errorList?.color_id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Цвет:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.color_id[0]}</span>
            </div>}
            {state?.errorList?.gender_id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Пол:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.gender_id[0]}</span>
            </div>}
            {state?.errorList?.min_age_category && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Возраст Min:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.min_age_category[0]}</span>
            </div>}
            {state?.errorList?.max_age_category && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Возраст Max:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.max_age_category[0]}</span>
            </div>}
            {state?.errorList?.category_id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Категория одежды:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.category_id[0]}</span>
            </div>}
            {state?.errorList?.type_id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Тип:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.type_id[0]}</span>
            </div>}
            {state?.errorList?.producer_Id && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Производитель:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.producer_Id[0]}</span>
            </div>}
            {state?.errorList?.amount && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Количество:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.amount[0]}</span>
            </div>}
            {state?.errorList?.price && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Цена:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.price[0]}</span>
            </div>}
            {state?.errorList?.photos && <div className="w-full  flex items-center gap-x-2 ">
              <span className=" md:text-base font-AeonikProRegular">Выберите фото:</span>
              <span className="text-[14px] text-textRedColor font-AeonikProRegular">{state?.errorList?.photos[0]}</span>
            </div>}

          </div>
          <div className={`${dressInfo?.nextPageShowForm ? "flex" : "hidden"}  relative w-full md:px-0  items-center justify-between mb-[50px] my-6 md:my-[50px] focus:bg-textBlueColor `}>
            <section
              onClick={() => {
                setState({
                  ...state,
                  ClothingSection: false,
                  SubClothingSection: false,
                  DressSeason: false,
                  Colour: false,
                  GenderModal: false,
                  DressTypeModal: false,
                  MakeCountryModal: false,
                  // ClothingCategoryModal: false,
                  showColor: false,
                  openSelect: false,
                })
                setAllSizeModalShow(false)
                setOpenCategories(false)
                setColorDelete(false)

              }
              }
              className={`fixed inset-0 z-[112] duration-200 w-full h-[100vh] bg-black opacity-50
         ${state?.ClothingSection ||
                  state?.SubClothingSection ||
                  state?.DressSeason ||
                  state?.Colour ||
                  state?.GenderModal ||
                  state?.DressTypeModal ||
                  // state?.ClothingCategoryModal ||
                  state?.showColor ||
                  state?.openSelect ||
                  state?.MakeCountryModal ||
                  allSizeModalShow ||
                  openCategories ||
                  colorDelete
                  ? ""
                  : "hidden"
                }`}
            ></section>
            <section
              onClick={() => { setColorDelete(false) }}
              className={`fixed inset-0 z-[222] duration-200 w-full h-[100vh] bg-black opacity-50 ${colorDelete ? "" : "hidden"}`}
            ></section>

            {state?.showColor && (
              <div className="max-w-[650px] w-full fixed z-[221]  left-1/2 right-1/2 top-[50%] translate-x-[-50%] translate-y-[-50%]  h-fit flex items-center  justify-center mx-auto ">
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
                  <div className="w-full py-4 gap-x-2 gap-y-4 grid gap-4 grid-cols-6">
                    {productsData?.colors.map((data) => {
                      return (
                        <div className="flex flex-col items-center justify-center ">
                          <div
                            key={data?.id}
                            className={` relative rounded-[12px] overflow-hidden flex items-center justify-center  w-[65px] h-[40px] bg-[${data.hex
                              }] cursor-pointer ${data?.id == 2
                                ? "border border-setTexOpacity flex items-center justify-center"
                                : ""
                              }
                     `}
                          >
                            <div
                              onClick={() => onHanleColorList(data?.id)}
                              style={{ background: `${data.hex}` }}
                              className="w-full h-full ">

                            </div>
                            {colors_Id?.includes(data?.id) ? (
                              <span onClick={() => onHandleColorUnchecked(data?.id)} className="absolute z-[221] w-[20px] h-[20px] rounded-b-md	 right-0 top-0 hover:opacity-70 absolute bg-black flex items-center justify-center p-[1px]"> <MenuCloseIcons colors={"#fff"} /></span>
                            ) : null}

                            {/* {state?.color_Id === 2 && data?.id === state?.color_Id ? (
                              <InputCheckedTrueIcons colors={"#000"} />
                            ) : null} */}
                          </div>
                          <span
                            className={`text-black text-center text-[14px] not-italic font-AeonikProRegular ${colors_Id?.includes(data?.id) ? "border-b border-fullBlue" : ""}`}
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
            {/* Color Delete Of Pop Confirm */}
            <section
              className={` max-w-[440px] md:max-w-[550px] mx-auto w-full flex-col h-fit bg-white mx-auto fixed px-4 py-5 md:py-[35px] md:px-[50px] rounded-t-lg md:rounded-b-lg z-[223] left-0 right-0 md:top-[50%] duration-300 overflow-hidden md:left-1/2 md:right-1/2 md:translate-x-[-50%] md:translate-y-[-50%] ${colorDelete ? " bottom-0 md:flex" : "md:hidden bottom-[-800px] z-[-10]"
                }`}
            >
              <button
                onClick={() => setColorDelete(false)}
                type="button"
                className="absolute  right-3 top-3 w-5 h-5 ">
                <MenuCloseIcons
                  className="w-full h-full"
                  colors={"#a1a1a1"} />
              </button>
              {/* {hideDeleteIcons ?
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
                      <span className="border-2 border-[#009B17] rounded-full flex items-center justify-center p-2"><FaCheck size={30} color="#009B17" /></span>
                      <span className="text-base not-italic font-AeonikProMedium">{SuccessMessage}</span>
                    </div>
                  }
                </div>
                : */}
              <div className="flex flex-col justify-center items-center gap-y-2 ll:gap-y-4">
                <span className="w-10 h-10 rounded-full border border-[#a2a2a2] flex items-center justify-center">
                  <span className="cursor-pointer active:translate-y-[2px] text-[#a2a2a2] transition-colors duration-[0.2s] ease-linear">
                    <DeleteIcon width={30} />
                  </span>
                </span>
                <span className=" text-black text-lg xs:text-xl not-italic font-AeonikProMedium text-center">
                  Вы уверены?
                </span>
              </div>

              {/* } */}
              <div className="w-full flex items-center justify-between mt-5 xs:mt-10 gap-x-2">

                <button
                  onClick={() => setColorDelete(false)}
                  type="button"
                  className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textBlueColor text-textBlueColor bg-white h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                  Oтмена
                </button>
                <button
                  onClick={() => setColorDelete(false)}
                  type="button"
                  className="w-1/2 xs:w-[45%] active:scale-95  active:opacity-70 flex items-center justify-center rounded-[12px] border border-textRedColor text-white bg-[#FF4747]  h-[42px] px-4  text-center text-base not-italic font-AeonikProMedium">
                  Удалить из адреса</button>
              </div>

            </section>
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
            {/* Categories Mobile Bottom Modal Animation Section */}
            <div className="">

              <section
                className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${openCategories ? "bottom-0" : "bottom-[-800px] z-[-10]"
                  }`}
              >
                {openCategories &&
                  <CategoriesMobileDropUp
                    onClick1={toggleCategories}
                    colorGroup={productsData.colors}
                    onClick2={toggleAllSizeModalShow}
                    modalOpenColor={false}
                  />
                }
              </section>
            </div>
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
            {/* <section
              className={`fixed z-[113] left-0 right-0 md:hidden duration-300 overflow-hidden ${state?.ClothingCategoryModal ? "bottom-0" : "bottom-[-800px] z-0"
                }`}
            >
              <ClothingCategory onClick={ClothingCategoryToggle} />
            </section> */}
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
                          type="button"
                          className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                        >
                          <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                            Выбрать
                          </label>
                          <ArrowRightIcon />
                        </button>
                        <div className={`w-full  cursor-not-allowed hidden md:flex rounded-lg overflow-hidden`}>
                          <button
                            type="button"
                            className="w-full cursor-not-allowed h-[40px]  bg-[#F5F5F5] rounded-lg flex items-center justify-between border border-borderColor px-3"
                          >
                            <span>
                              {productsData?.shops?.filter(e => e?.id == state?.shopId)?.map((item) => {
                                return (
                                  <span
                                    className=" mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                                    {item?.name}
                                  </span>
                                )
                              })}

                            </span>
                            <span className="rotate-[90deg]"><ArrowRightIcon /></span>
                          </button>

                        </div>
                      </div>
                      {/* Input Select 2.1 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className={`text-[13px] md:text-base font-AeonikProRegular ${state?.shopId ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                            Локация
                          </span>

                        </div>
                        <button

                          type="button"
                          className="w-full h-[40px] rounded-lg flex md:hidden items-center justify-between border border-borderColor px-3"
                        >
                          <label className="text-[11px] mt-[3px] font-AeonikProRegular text-[#b5b5b5]">
                            Выбрать
                          </label>
                          <ArrowRightIcon />
                        </button>

                        <div className="w-full  cursor-not-allowed h-fit hidden md:flex">
                          <button
                            type="button"
                            className="w-full cursor-not-allowed h-[40px] overflow-hidden bg-[#F5F5F5] rounded-lg flex items-center justify-between border border-borderColor px-3"
                          >
                            <span>
                              {productsData?.shops?.filter(e => e?.id == state?.shopId).map((item) => {
                                return item?.shop_locations?.filter(e => e?.id == state?.shopLocationId)?.map(data => {
                                  return (
                                    <span
                                      className="w-[85%] whitespace-nowrap  overflow-hidden	flex items-center text-tableTextTitle2 text-[14px] not-italic font-AeonikProRegular"                                  // onClick={() => setState({ ...state, shopLocationId: data?.id, openSelect: false })}
                                      key={data?.id}
                                    >
                                      <span className="w-full overflow-hidden whitespace-nowrap text-[#b5b5b5] flex items-center">{data?.address}</span>
                                    </span>
                                  )
                                })
                              })

                              }

                            </span>
                            <span className="rotate-[90deg]"><ArrowRightIcon /></span>
                          </button>

                        </div>
                      </div>
                      {/* Input Select 1 */}
                      <div className=" w-full h-fit flex flex-col gap-y-[5px] overflow-hidden">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Раздел товара
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
                            disabled={colorAction ? true : false}
                            // optionFilterProp="children"section_Id
                            value={productsData?.sections?.filter(e => section_Id?.includes(e?.id))?.map((item) => { return item?.id })}
                            onChange={(e) => setSection_Id(e)}
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
                          <span className={`text-[13px] md:text-base font-AeonikProRegular ${true ? "text-[#000]" : "text-[#b5b5b5]"}`}>
                            Подраздел товара
                          </span>
                          <span className="ml-[5px]">
                            {true ? (
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
                            className={` rounded-lg w-full h-11 md:h-10 ${state?.isCheckValid && !subSection_Id?.length && true ? " overflow-hidden border border-[#FFB8B8] " : ""}`}
                            showSearch
                            disabled={subSection_Id?.length === 0 || colorAction ? true : false}
                            placeholder="Выбрать"
                            mode="multiple"
                            optionLabelProp="label"
                            // value={state?.sub_Section_Id}
                            value={newArray?.filter(e => subSection_Id?.includes(e?.id))?.map((item) => { return item?.id })}
                            // value={productsData?.sections?.filter(e => section_Id?.includes(e?.id))?.map((data) => {
                            //   return data?.sub_sections?.filter(e => subSection_Id?.includes(e?.id))?.map(item => { return item.id })
                            // })
                            // }
                            onChange={handleChangeSubSection}
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
                                  <span>{item.name_ru}</span>
                                </Option>
                              )
                            })
                            }


                          </Select>

                        </div>
                      </div>
                      {/* Input Select 3 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Сезон товара
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
                            disabled={colorAction ? true : false}
                            placeholder="Выбрать"
                            value={productsData?.seasons?.filter(e => season_Id?.includes(e?.id))?.map((item) => { return item?.id })}
                            size="large"
                            onChange={(e) => setSeason_Id(e)}
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
                        <div className={` w-fit ${colorAction ? "p-[4px] border-[3px] border-yellow-500 rounded-lg " : ""}`}>
                          <div className={`w-fit hidden md:flex items-center gap-x-2 justify-start  overflow-hidden                   
                         border border-borderColor rounded-lg  h-[42px] md:h-10 px-[12px]`}>
                            {productsData.colors
                              ?.filter((e) => colors_Id?.includes(e?.id))
                              ?.map((data) => {
                                return (
                                  <div key={data?.id} className="block w-fit">
                                    <div className="w-full ">
                                      <label
                                        key={data?.id}
                                        htmlFor={data?.id}
                                        onClick={() => setSelectColorID(data?.id)}

                                        style={{ background: `${data.hex}` }}
                                        className={`rounded-full border  w-[22px] h-[22px] p-[2px] cursor-pointer flex items-center justify-center hover:scale-110 duration-300 `}
                                      >

                                        {data?.id === (selectColorID || colorChecked) && (selectColorID || colorChecked) !== 1 ? (
                                          <BiCheck size={28} color={"#000"} className="flex items-center justify-center" />
                                        ) : null}

                                        {(selectColorID || colorChecked) === 1 && data?.id === (selectColorID || colorChecked) ? (
                                          <BiCheck size={28} color={"#fff"} className="flex items-center justify-center" />
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
                              disabled={colorAction ? true : false}
                              value={productsData?.gender?.filter(e => e?.id == state?.gender_Id)?.map((item) => { return item?.id })}
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
                            {colorAction ? <span className={` cursor-not-allowed outline-none w-[55px] h-10 text-center text-[#b5b5b5] bg-[#F5F5F5] border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                            >{state?.min_Age_Category}</span> :
                              <input
                                type="text"
                                name="age"
                                placeholder="Мин"
                                value={state?.min_Age_Category}
                                onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                                className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.min_Age_Category ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                              />}
                            <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                            {colorAction ? <span className={` cursor-not-allowed outline-none w-[55px] h-10 text-center text-[#b5b5b5] bg-[#F5F5F5] border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                            >{state?.max_Age_Category}</span> :
                              <input
                                type="text"
                                name="age"
                                placeholder="Мах"
                                value={state?.max_Age_Category}
                                onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                                className={`inputStyle outline-none w-[55px] h-10 text-center  ${state?.isCheckValid && !state?.max_Age_Category ? "border border-[#FFB8B8] " : "border border-borderColor"}  flex items-center justify-center rounded-lg font-AeonikProRegular `}
                              />}
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
                          {colorAction ? <span className={` cursor-not-allowed px-3 outline-none w-[calc(100%-42px)] h-10 text-start text-[#b5b5b5] bg-[#F5F5F5] border border-borderColor  flex items-center  rounded-lg font-AeonikProRegular `}
                          >{state?.sku}</span> :
                            <input
                              type="text"
                              value={state?.sku}
                              onChange={(e) => setState({ ...state, sku: e.target.value })}
                              placeholder=""
                              className={`inputStyle w-[calc(100%-42px)] h-10  flex items-center justify-between ${state?.isCheckValid && !state?.sku ? "border border-[#FFB8B8] " : "border border-borderColor"} rounded-lg px-[10px] outline-none`}
                            />}
                          {colorAction ?
                            <button
                              type={"button"}
                              className={`w-[40px] h-[40px] cursor-not-allowed  opacity-50 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg`}
                            >
                              <LoaderIcon />
                            </button> :
                            <button
                              onClick={() => randomCode(17)}
                              type={"button"}
                              className={`w-[40px] h-[40px] active:scale-95  active:opacity-70 flex items-center justify-center  bg-textBlueColor border border-borderColor rounded-lg`}
                            >
                              <LoaderIcon />
                            </button>}
                        </div>
                      </div>
                      {/* Input Select 7 */}
                      <div className="w-full h-fit  flex flex-col gap-y-[5px]">
                        <div className="flex items-center">
                          <span className="text-[13px] md:text-base font-AeonikProRegular">
                            Категория товара
                          </span>
                          <span className="ml-[5px]">
                            <StarLabel />
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setOpenCategories(true)}
                          className="w-full flex md:hidden items-center justify-between border border-borderColor rounded-lg h-[40px] px-3"
                        >
                          <span className="text-[#b5b5b5] mt-[3px] font-AeonikProRegular text-[11px] ">
                            Выбрать
                          </span>
                          <span className="rotate-[90deg]">
                            <ArrowRightIcon />
                          </span>
                        </button>
                        <div className="w-full  cursor-not-allowed h-fit md:flex flex-col hidden">
                          <button
                            type="button"
                            className={`w-full cursor-not-allowed overflow-hidden ${colorAction ? "text-[#b5b5b5] bg-[#F5F5F5]" : ""} cursor-text h-[40px] hidden md:flex items-center justify-between border border-borderColor  rounded-lg p-3 `}
                          >
                            {productsData?.categories?.filter(e => e?.id == state?.category_Id)?.map(item => {
                              return <span className="text-[#a1a1a1]">{item?.name_ru}</span>

                            })}
                          </button>

                          {/* <p
                            className={`w-full overflow-hidden cursor-text h-[40px] md:hidden flex items-center justify-between border border-borderColor rounded-lg p-3 `}
                          >
                            {productsData?.categories?.filter(e => e?.id == state?.category_Id)?.map(item => {
                              return <span className="text-[#a1a1a1]">{item?.name_ru}</span>

                            })}
                          </p> */}
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
                              disabled={colorAction ? true : false}
                              placeholder="Выбрать"
                              value={productsData?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => { return item?.name_ru })}
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
                              {state?.category_Id ? productsData?.types?.filter(e => e?.category_id == state?.category_Id)?.map((item) => {
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
                              disabled={colorAction ? true : false}
                              placeholder="Выбрать"
                              optionFilterProp="children"
                              value={productsData?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => { return item?.name_ru })}
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
                            className={`overflow-hidden block rounded-lg w-full h-11 md:h-10  ${state?.isCheckValid && !state?.filterTypeId ? "border border-[#FFB8B8] bg-[#FFF6F6]" : ""}`}
                            showSearch
                            allowClear
                            disabled={colorAction ? true : false}
                            placeholder="Выбрать"
                            value={productsData?.types?.filter(e => e?.id == state?.filterTypeId)?.map((item) => { return item?.name_ru })}
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
                            {state?.category_Id ? productsData?.types?.filter(e => e?.category_id == state?.category_Id)?.map((item) => {
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
                            className={`overflow-hidden rounded-lg w-full  h-full ${state?.isCheckValid && !state?.producer_Id ? "border border-[#FFB8B8] " : ""}`}
                            showSearch
                            placeholder="Выбрать"
                            disabled={colorAction ? true : false}
                            optionFilterProp="children"
                            value={productsData?.producers?.filter(e => e?.id == state?.producer_Id)?.map((item) => { return item?.name_ru })}
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
                          {colorAction ? <span className=" cursor-not-allowed inputStyle outline-none w-[40%] h-10 bg-[#f5f5f5] text-[#b5b5b5] text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                          >{state?.min_Age_Category}</span> :
                            <input
                              type="text"
                              name="age"
                              placeholder="Мин"
                              value={state?.min_Age_Category}
                              onChange={(e) => setState({ ...state, min_Age_Category: e.target.value })}
                              className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                            />}
                          <span className="w-[15px] h-[2px] border-b border-borderColor "></span>
                          {colorAction ? <span className=" cursor-not-allowed inputStyle outline-none w-[40%] h-10 bg-[#f5f5f5] text-[#b5b5b5] text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                          >{state?.min_Age_Category}</span> : <input
                            type="text"
                            name="age"
                            placeholder="Мах"
                            value={state?.max_Age_Category}
                            onChange={(e) => setState({ ...state, max_Age_Category: e.target.value })}
                            className="inputStyle outline-none w-[40%] h-10 text-center border border-borderColor  flex items-center justify-center rounded-lg font-AeonikProRegular "
                          />}
                        </div>
                      </div>
                      <div className={`w-full hidden md:flex items-center rounded-lg overflow-hidden  justify-between gap-x-3 ${colorAction ? "p-[4px] border-[3px] border-yellow-500" : ""}`} >
                        <button
                          type="button"
                          onClick={() => setAllSizeModalShow(true)}
                          className="group w-[165px] flex items-center justify-center h-[38px] whitespace-nowrap border-textBlueColor text-textBlueColor border-[1.5px] font-AeonikProMedium flex items-center text-sm justify-center cursor-pointer  rounded-lg focus:bg-textBlueColor focus:text-white transition duration-300"
                        >
                          Все размеры{" "}
                        </button>
                        <button className=" w-fit">
                          <AddSize title={productsData?.categories} typeId={state?.category_Id} handleCallBack={CallBackHeadWear} />
                        </button>
                      </div>
                    </div>
                    <section
                      className={`fixed z-[115]   w-fit h-fit m-auto cursor-pointer flex items-center justify-center inset-0  overflow-hidden ${allSizeModalShow ? "" : "hidden"
                        }`}
                    >
                      {allSizeModalShow && (
                        <AllSizeModalEdit colorGroup={productsData.colors} stateList={state} onClick={toggleAllSizeModalShow} sizeOfColor={colorListForTest} colorSelect={colors_Id} />
                      )}{" "}
                    </section>


                  </div>
                  <div className={`w-full md:w-[30%] h-fit flex md:flex-col flex-row  justify-center gap-x-4 ${colorAction ? "p-[4px] border-[3px] border-yellow-500 rounded-lg " : ""}`}>

                    {/* Img Carousel */}
                    <div className="w-full h-[510px] mx-auto flex flex-col gap-y-[120px] ">
                      <ProductCarouselEdit />
                    </div>

                  </div>
                </div>
                <div className="md:relative w-full mt-[60px]  md:mt-[200px] ">
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
                  <div className=" flex items-center md:justify-end justify-between md:gap-x-4">
                    <button
                      type="button"
                      className="w-[45%] md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center cursor-pointer  active:scale-95  py-3 border border-textBlueColor hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Сохранить
                    </button>
                    <button
                      type="button"
                      // to="/products/add-detail"
                      onClick={handleNextPage}
                      className="w-[45%] md:w-[200px] h-[42px] md:h-[45px] flex items-center justify-center  cursor-pointer active:scale-95  py-3 border border-textBlueColor  hover:bg-textBlueColor hover:text-white text-textBlueColor rounded-lg text-base md:text-lg font-AeonikProMedium"
                    >
                      Продолжить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`relative w-full ${dressInfo?.nextPageShowForm ? "hidden" : " flex"} `}>
            <ToastContainer
              style={{ zIndex: "1000", top: "80px" }}
              position="top-right"
              autoClose={5000}
              limit={1}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"

            />
            <TextFormAdd productsEdit={productsDataIdEdit} handlCallBack={CallBackTextForm} />
          </div>
        </div>}
    </div >
  );
};

export default AddingProduct;
