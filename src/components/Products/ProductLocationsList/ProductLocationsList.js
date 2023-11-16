import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import LocationItem from "./LocationItem/LocationItem";
import {
  AddIconsCircle,
  AddLocationIcon,
  CalendarIcons,
  CheckIcons,
  DeleteIcon,
  GoBackIcons,
  SearchIcon,
} from "../../../assets/icons";
import { Outlet, useNavigate } from "react-router-dom";
import { Space, DatePicker } from "antd";
// import { SearchIcon } from "../../assets/icons";
import { AiOutlineLeft } from "react-icons/ai";
import { wearImg } from "../../../assets";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../hook/useHttp";
import StoreListModal from "./LocationItem/StoreListModal";
import LoadingForSeller from "../../Loading/LoadingFor";

const { RangePicker } = DatePicker;

export default function ProductLocationsList() {
  const { request } = useHttp()
  const [openStoreList, setOpenStoreList] = useState(false);

  const storeToggle = React.useCallback(() => setOpenStoreList(false), []);
  function getCheckListItems(childData) {
    console.log(childData, "GetAllCheckValue");
  }
  const [productList, setProductList] = useState('')
  const [getProductOfCategory, setGetProductOfCategory] = useState('')

  useQuery(["getProductOfCategory"], () => { return request({ url: "/products/get-product-info", token: true }) },
    {
      onSuccess: (res) => {
        setGetProductOfCategory(res?.types);
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );
  const { isLoading, isFetching } = useQuery(["productList"], () => { return request({ url: "/products/locations", token: true }) },
    {
      onSuccess: (res) => {
        setProductList(res)
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  // console.log(getProductOfCategory, " getProductOfCategory");
  console.log(productList?.products_locations, "products_locations");
  // console.log(isLoading, isFetching, "isLoading,isFetching");
  // console.log(state?.productList?.products_locations[0]);
  const [city1, setCity1] = useState([
    {
      id: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
    {
      id: 5,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);
  const [city1all, setCity1all] = useState(false);

  const [city2, setCity2] = useState([
    {
      id: 1,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#4FB459]",
      state: "Одобренный",
    },
    {
      id: 2,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Одобренный",
    },
    {
      id: 3,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#FF4747]",
      state: "Отказанный",
    },
    {
      id: 4,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Отказанный",
    },
    {
      id: 5,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#F1C116]",
      state: "Ожидающий",
    },
    {
      id: 6,
      name: "wear",
      isCheck: false,
      bgColor: "bg-[#AA3FFF]",
      state: "Замечание",
    },
  ]);
  const [city2all, setCity2all] = useState(false);

  const [arrayAllChecked, setArrayAllChecked] = useState(false);

  const [someChecked, setSomeChecked] = useState(false);

  // ---------------------------------------
  // Alohida alohida checked qilish
  const onCheck1 = (id) => {
    let newArr = city1.map((item) => {
      return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
    });
    setCity1(newArr);
    setSomeChecked(true);
  };
  const onCheck2 = (id) => {
    let newArr = city2.map((item) => {
      return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
    });
    setCity2(newArr);
    setSomeChecked(true);
  };

  // ------------------------------------
  // City buyicha checked qilish
  const City1Checked = () => {
    if (!city1all) {
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity1(city1Array);
      setSomeChecked(true);
    } else if (city1all) {
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity1(city1Array);
    }
  };
  const City2Checked = () => {
    if (!city2all) {
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity2(city2Array);
      setSomeChecked(true);
    } else if (city2all) {
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity2(city2Array);
    }
  };

  // this effect for all check
  useEffect(() => {
    if (arrayAllChecked) {
      setCity1all(true);
      setCity2all(true);
      // array1
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity2(city2Array);
      // array2
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: true };
      });
      setCity1(city1Array);
      setSomeChecked(true);
    }
    if (!arrayAllChecked) {
      setCity1all(false);
      setCity2all(false);
      // array1
      let city2Array = city2.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity2(city2Array);
      // array2
      let city1Array = city1.map((item) => {
        return { ...item, isCheck: false };
      });
      setCity1(city1Array);
      setSomeChecked(false);
    }
  }, [arrayAllChecked]);


  // products
  const navigate = useNavigate();
  const goProductDetailEdit = (id) => {
    navigate(`/locations-store/edit-detail/:${id}`);
  };

  const goMapCity = (id) => {
    navigate(`/locations-store/city/:${id}`);
  };
  const goMapWear = (id) => {
    navigate(`/locations-store/wears/:${id}`);
  };
  function addNewProductId(locationId, shopId) {
    navigate(`/products/location/add/:${`${locationId}` + `${shopId}`}`);
  };
  function openMarketEditPage(id) {
    navigate(`/store/market-list/:${id}`);
  };


  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-start items-center md:justify-between md:border-b border-borderColor py-4">
        <section className="hidden md:flex">
          <button
            button
            onClick={() => {
              navigate(-1);
            }}
            className="w-8 h-8 flex items-center cursor-pointer justify-center border border-borderColor rounded-lg"
          >
            <AiOutlineLeft />
          </button>
          <p className="text-black text-2xl not-italic font-AeonikProMedium ml-[30px]">
            Одежда{" "}
          </p>
        </section>
        <section className="w-full flex md:hidden">
          <div className="w-full flex items-center">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="absolute flex items-center justify-start cursor-pointer "
            >
              <GoBackIcons />
            </button>
            <p className="w-full text-center text-black text-2xl not-italic font-AeonikProMedium">
              Одежда
            </p>
          </div>
        </section>
        <section className="w-fit hidden md:flex items-center gap-x-[15px]">
          <form className="max-w-[400px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center px-[10px] rounded-lg">
            <input
              type="text"
              name="s"
              className="w-full h-full  outline-0	"
              placeholder="Поиск"
            />
            <button>
              <SearchIcon />
            </button>
          </form>
          <section className="mobileDate flex items-center gap-x-[30px]">
            <Space direction="vertical" size={12}>
              <RangePicker placeholder={["от", "до"]} />
            </Space>
          </section>
        </section>
      </div>

      {/* Search Section For Mobile */}
      <div className="flex md:hidden items-center justify-between border-t md:border-0 border-borderColor pt-3 md:pt-0 md:mt-3">
        <section className="w-full md:w-fit flex items-center justify-between md:justify-static gap-x-6 md:gap-x-[15px]">
          <label
            htmlFor="searchStore"
            className="w-full md:max-w-[400px] h-10 overflow-hidden border  border-lightBorderColor flex items-center rounded-lg"
          >
            <input
              type="text"
              name="s"
              id="searchStore"
              className="w-full h-full outline-0 	pl-[10px]"
              placeholder="Поиск"
            />
            <span className="pr-[10px]">
              <SearchIcon />
            </span>
          </label>
          <section className=" flex items-center gap-x-[30px] ">
            <span>
              <CalendarIcons />
            </span>
            <span className="hidden md:flex items-center">
              <Space direction="vertical" size={12}>
                <RangePicker className="" placeholder={["от", "до"]} />
              </Space>
            </span>
          </section>
        </section>
      </div>
      {isLoading ? <LoadingForSeller /> :
        <div className=" w-full">
          {/* Up Title */}
          <div className="flex items-center justify-center py-7 relative w-full border-b border-borderColor md:border-none">
            <p className="hidden md:block text-xl font-AeonikProMedium absolute left-0">
              Общее количество: {productList?.products_locations?.length}
            </p>
            {/* <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
            Nike Store Official Dealer
          </p> */}
            <div className="w-full md:w-fit flex items-center justify-between absolute right-0">
              <div className="flex items-center md:mr-6 font-AeonikProRegular text-sm md:text-lg text-mobileTextColor">
                Выбранные <span className="block md:hidden font-AeonikProMedium">:</span>
              </div>
              <button
                className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-sm md:text-lg ${someChecked
                  ? "text-addLocationTextcolor  active:translate-y-[2px]"
                  : "text-[#D2D2D2] cursor-not-allowed"
                  }`}
              >
                <span className="mr-[5px]">
                  <AddLocationIcon width={20} />
                </span>
                Добавить в локацию
              </button>
              <button
                className={`pl-[6px] md:pl-3 flex items-center font-AeonikProRegular text-sm md:text-lg  ${someChecked
                  ? "text-deleteColor active:translate-y-[2px]"
                  : "text-[#D2D2D2] cursor-not-allowed"
                  }`}
              >
                <span className="mr-[5px]">
                  <DeleteIcon width={20} />
                </span>
                Удалить
              </button>
            </div>
          </div>
          <div className="w-full my-4">
            {/* <table className="w-full  mb-[10px] hidden md:flex flex-col items-center text-tableTextTitle">
              <thead className="w-full  h-[70px] flex items-center">
                <div className="min-w-[24px] min-h-[24px] bg-white mr-[8px]"></div>
                <tr className="w-full h-full flex items-center justify-between border rounded-[8px]  border-lightBorderColor">
                  <th className="w-[5%] h-full flex items-center justify-center" >No:</th>
                  <th className="w-[14%] h-full flex items-center justify-center">Фото</th>
                  <th className="w-[15%] h-full flex items-center justify-center">Наименование товара</th>
                  <th className="w-[15%] h-full flex items-center justify-center">Артикул</th>
                  <th className="w-[8%] h-full flex items-center justify-center">Тип</th>
                  <th className="w-[8%] h-full flex items-center justify-center">Дата</th>
                  <th className="w-[10%] h-full flex items-center justify-center">Статус</th>
                  <th className="w-[10%] h-full flex items-center justify-center">Цена товара</th>
                  <th className="w-[10%] h-full flex items-center justify-center"></th>
                  <th className="w-[9%] h-full flex items-center justify-center">Добавить</th>
                  <th className="w-[9%] h-full flex items-center justify-center">Удалить</th>
                </tr>
              </thead>
            </table> */}

          </div>
          {productList?.products_locations?.map((item, index1) => {
            // console.log(index1, "index1");
            return (
              <div className="flex items-center w-full">
                {item?.shop_locations?.length !== 0 && < div className="w-full  my-6">
                  <button
                    type="button"
                    onClick={() => openMarketEditPage(item?.id)}
                    className="w-full  flex items-center justify-center mb-6 cursor-pointer">
                    <p className=" hidden md:block text-textBlueColor text-2xl not-italic font-AeonikProMedium">
                      {item?.name}
                    </p>
                  </button>

                  {item?.shop_locations?.map((resData, index) => {
                    // console.log(index1, "index1")

                    // console.log(resData, "resData");
                    return (
                      <div className="w-full">
                        <div className="w-full  mt-10">
                          <div className="flex justify-end items-center md:justify-between mx-auto ">
                            {/* <section className="hidden md:flex items-center">
                              <div
                                onClick={() => {
                                  setCity1all(!city1all);
                                  City1Checked();
                                }}
                                className=" cursor-pointer bg-white flex items-center gap-x-2"
                              >
                                <button
                                  type="button"
                                  className={`flex items-center rounded-[6px] md:rounded-lg justify-center min-w-[24px] min-h-[24px]  ${city1all
                                    ? "bg-[#007DCA] border-[#007DCA]"
                                    : "bg-white border border-[#f4a622]"
                                    }`}
                                >
                                  <CheckIcons />
                                </button>

                                <p className="text-black text-base not-italic font-AeonikProMedium mr-[20px]">
                                  {resData?.address}
                                </p>
                              </div>
                              <button
                                onClick={() => addNewProductId(resData?.id, resData?.shop_id)}
                                className="active:scale-95  active:opacity-70 flex items-center gap-x-[4px]"
                              >
                                <span>
                                  <AddIconsCircle />
                                </span>
                                <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
                                  Добавить одежду
                                </span>
                              </button>
                            </section> */}


                            <div className="w-full md:w-fit flex items-center justify-between md:justify-normal mt-4 md:mt-0 ">
                              <p className="flex md:hidden text-sm font-AeonikProMedium">
                                Общее количество: 6
                              </p>

                            </div>
                          </div>

                          <div className="flex md:hidden text-textBlueColor text-xl not-italic font-AeonikProMedium mb-6 ">
                            {item?.name}
                          </div>
                          <div className="mx-auto font-AeonikProRegular text-[16px]">
                            {item?.shop_locations?.length !== 0 && resData?.products?.length !== 0 ?
                              <LocationItem handleGetCheckAll={getCheckListItems} checkIndex={index1} data={resData} getProductOfCategory={getProductOfCategory} />
                              :
                              <div className="w-full h-[100px] rounded-lg border flex items-center justify-center mt-5">
                                <span className="text-[#D2D2D2] font-AeonikProRegular text-xl">Tовара нет</span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
                }
              </div>
            )
          })
          }
        </div>}
    </div >
  );
}
