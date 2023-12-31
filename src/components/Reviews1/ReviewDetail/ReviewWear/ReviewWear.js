import React, { useEffect, useState } from "react";
import { SearchIcon } from "../../../../assets/icons";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../hook/useHttp";
import { Rate } from "antd";
import LoadingForSeller from "../../../Loading/LoadingFor";

export default function ReviewWear() {
  const { request } = useHttp();
  const [loading, setLoading] = useState(true);
  const [reviewsList, setReviewsList] = useState();
  const navigate = useNavigate();

  // ------------GET  Has Reviews ?-----------------
  useQuery(
    ["review_products"],
    () => {
      return request({ url: `/products`, token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setReviewsList(res?.products?.data);
          setLoading(false)
        }
      },
      onError: (err) => {
        setLoading(false)
        console.log(err, "err In Reviews");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const goDetail = (id) => {
    navigate(`/reviews/review/comment-wear/${id}`);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="relative">
      {loading ? (
        <div className="h-full w-full">
          <LoadingForSeller />
        </div>        // <div className="absolute top-[-220px] md:top-[-170px] left-0 right-0"><LoadingForSeller /></div>
      ) : (
        <div className="w-full h-full md:px-10 py-1">
          {reviewsList?.length > 0 && reviewsList?.rated_users_count > 0
            ? (
              <>
                {/* Table */}
                <div className="w-full h-fit md:mt-7">
                  <div className="w-full mb-[10px] hidden md:block">
                    <ul className="w-full h-full  flex items-center justify-between ">
                      <li className="w-[20%] pl-5 ">
                        <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                          Изображение
                        </span>
                      </li>
                      <li className="w-[20%] ">
                        <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                          Наименование товара
                        </span>
                      </li>
                      <li className="w-[20%] ">
                        <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                          Отзывы
                        </span>
                      </li>
                      <li className="w-[20%] ">
                        <span className="text-lg not-italic font-AeonikProMedium text-tableTextTitle">
                          Дата
                        </span>
                      </li>
                      <li className="w-[20%] flex items-center justify-end ">
                        <div className="max-w-[350px] w-[100%] h-10 overflow-hidden border border-lightBorderColor flex items-center rounded-lg">
                          <input
                            type="text"
                            className="w-full h-full px-[10px] outline-0	"
                            placeholder="Поиск"
                          />
                          <button className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
                            <SearchIcon />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  {/* table product */}
                  <div className="w-full h-full border-lightBorderColor md:bg-lightBgColor md:rounded-xl overflow-auto VerticelScroll">
                    {reviewsList?.map((data) => {
                      return (
                        <ul
                          key={data?.id}
                          className="w-full p-2 md:px-0 md:py-5 overflow-hidden border md:border-b border-borderColor flex items-center mb-[6px] md:mb-0 gap-x-5 md:gap-x-0 rounded-xl md:rounded-none md:first:rounded-t-xl md:last:rounded-b-xl bg-lightBgColor"
                        >
                          <li className="w-[80px] h-[75px] md:w-[20%] md:h-fit md:pl-5 flex items-center ">
                            {data?.photos.length > 1
                              ? data?.photos?.map((item, index) =>
                                index === 0 ? (
                                  <figure key={index} className="w-full h-full md:w-[200px] md:h-[100px] rounded-lg overflow-hidden border border-lightBorderColor">
                                    <img
                                      className="w-full h-full object-contain"
                                      src={item.url_photo}
                                      alt=""
                                    />
                                  </figure>
                                ) : null
                              )
                              : data?.photos?.map((item) => {
                                return (
                                  <figure key={item.id} className="w-full h-full md:w-[200px] md:h-[100px] rounded-lg overflow-hidden border border-lightBorderColor">
                                    <img
                                      className="w-full h-full object-contain"
                                      src={item?.url_photo}
                                      alt=""
                                    />
                                  </figure>
                                );
                              })}
                          </li>
                          <div className="w-[80%] flex flex-col md:flex-row md:items-center ml-auto">
                            <li className="md:w-[25%] h-full flex items-center">
                              <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                                Имя товара
                              </span>
                              <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium">
                                {data?.name_ru}
                              </span>
                            </li>
                            <li className="md:w-[25%] h-full flex items-center">
                              <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                                Отзывы
                              </span>
                              <div className="flex items-center">
                                <Rate
                                  disabled
                                  allowHalf
                                  defaultValue={data?.overall_rating}
                                />
                              </div>
                            </li>
                            <li className="md:w-[20%] h-full flex items-center ">
                              <span className="block md:hidden text-[13px] font-AeonikProMedium mr-[10px]">
                                Дата
                              </span>
                              <span className="text-textLightColor md:text-tableTextTitle2 text-[11px] md:text-base not-italic font-AeonikProMedium ">
                                {data?.created_at}
                              </span>
                            </li>
                            <li className="md:w-[20%] h-full flex items-center justify-end pr-1 md:pr-[50px] md:ml-auto">
                              <button
                                onClick={() => goDetail(data?.id)}
                                className="text-textBlueColor border-b border-textBlueColor text-[11px] md:text-base not-italic font-AeonikProMedium ml-auto"
                              >
                                Подробнее
                              </button>
                            </li>
                          </div>
                        </ul>
                      );
                    })}
                  </div>
                </div>
              </>
            )
            : (
              <>
                <div className="w-full h-[50vh] md:h-[70vh] flex items-center justify-center text-lg md:text-2xl font-medium">У вас пока нет отзывов</div>
              </>
            )}

        </div>
      )}
    </div>
  );
}
