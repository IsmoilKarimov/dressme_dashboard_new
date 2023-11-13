import React, { useEffect, useState } from "react";
import {
  CloseAnswer,
  MobileStar,
  SearchIcon,
  StarIcon,
  StarOutlineIcon,
} from "../../../../assets/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useHttp } from "../../../../hook/useHttp";

const CommentTitle = () => {
  const { request } = useHttp();
  const [commentStore, setCommnetStore] = useState();
  const [state, setState] = useState({
    sendAnswer: false,
    startReviews: true,
    replyText: null,
    getUserId: null,
  
  });

  // ------------GET Has Reviews-STORE ?-----------------
  useQuery(
    ["review_shops_comments"],
    () => {
      return request({ url: `/shops`, token: true });
    },
    {
      onSuccess: (res) => {
        if (res) {
          setCommnetStore(res.shops.data);
          console.log(res.shops.data, "Comments-STORE-Review");
        }
      },
      onError: (err) => {
        console.log(err, "ERR-IN-STORE-COMMENTS");
      },
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const url = "https://api.dressme.uz/api/seller/reply";

  const { mutate } = useMutation(() => {
    return fetch(`https://api.dressme.uz/api/seller/reply`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("DressmeUserToken")}`,
      },
      body: JSON.stringify({ reply: state?.replyText, id: "13" }),
      // body: JSON.stringify({ reply: state?.replyText, id: state?.getUserId }),
    }).then((res) => res.json());
  });
  console.log(state?.getUserId, " state?.getUserId");
  function sendReplyText() {
    // setState({ ...state, getUserId: id });
    mutate(
      {},
      {
        onSuccess: (res) => {
          console.log(res, "BUReplySuccess");
        },
        onError: (err) => {
          console.log(err, "BUReplError");
        },
      }
    );
  }

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="w-full h-full  flex flex-col md:gap-y-[15px]">
      <div className="pb-1 md:justify-end text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center md:gap-x-4 mt-[37px] mb-[18px] md:mt-0 md:mb-0">
        <p className="mr-[10px] md:ml-0"> Отзывы клиентов</p>
        <span className="block md:hidden text-xs text-mobileTextColor mt-[3px]">
          ( {commentStore?.ratings?.length ? commentStore?.ratings?.length : 0}{" "}
          отзывы ){" "}
        </span>
      </div>

      <div className="flex md:hidden gap-x-[14px] mb-4">
        <div className="w-[70%] h-9 overflow-hidden border border-lightBorderColor flex items-center rounded-lg">
          <input
            type="text"
            className="w-full h-full text-[13px] px-[10px] outline-0"
            placeholder="Поиск"
          />
          <span className="px-[10px] bg-lightBorderColor h-full flex items-center justify-center">
            <SearchIcon />
          </span>
        </div>
        <button
          onClick={() => setState({ ...state, startReviews: false })}
          className="w-[30%] h-9 active:scale-95 bg-textBlueColor flex items-center justify-center text-white rounded-lg px-[8px] ls:px-[10px]"
        >
          <span className="text-[10px] ls:text-[11px] flex-none not-italic font-AeonikProMedium mr-[5px]">
            По отзывам
          </span>
          <MobileStar />
        </button>
      </div>

      {!state.startReviews ? (
        <div className="w-full flex md:hidden items-center justify-between mb-4">
          <div className="flex items-center ">
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">1</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">2</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">3</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg mr-[5px]">
              <span className="mr-[5px] group-focus:text-white">4</span>
              <StarIcon width={14} height={14} />
            </button>
            <button className="group w-[55px] focus:bg-textBlueColor h-9 flex items-center justify-center border border-borderColor rounded-lg">
              <span className="mr-[5px] group-focus:text-white">5</span>
              <StarIcon width={14} height={14} />
            </button>
          </div>
          <button
            onClick={() => setState({ ...state, startReviews: true })}
            className="w-9 h-9 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border border-textBlueColor rounded-lg"
          >
            <CloseAnswer colors="#007DCA" />
          </button>
        </div>
      ) : (
        ""
      )}

      {commentStore?.map((data) => {
        // console.log(data, "Ratings_DATA");
        return (
          <div key={data.id}>
            {data?.ratings.map((item) => {
              return (
                <div
                  key={item.id}
                  className="w-full h-fit border border-lightBorderColor rounded-[5px] p-[15px] mb-[10px] md:mb-0"
                >
                  {/* userImg and Date */}
                  <div className="w-full md:p-[15px] mb-5 md:mb-0 h-fit flex justify-between">
                    <div className="h-10 w-fit flex items-center gap-x-[15px]">
                      <div className="flex flex-col">
                        <div className="text-tableTextTitle2 text-base md:text-xl font-AeonikProMedium">
                          {item?.user?.name}
                        </div>
                        <div className="flex md:gap-x-[10px]">
                          <p className="text-gray-700 text-[13px] md:text-sm font-AeonikProRegular leading-normal">
                            Оценка покупки
                          </p>
                          <p className="flex items-center gap-x-[2px] ml-[5px] md:ml-0">
                            <span className="text-gray-700 text-[13px] md:text-sm mr-[2px] font-AeonikProRegular leading-normal	">
                              {item?.score}.0
                            </span>
                            <span>
                              <StarOutlineIcon />
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="h-10 w-fit flex items-start md:items-center">
                      <span className="text-textLightColor text-xs md:text-base font-AeonikProRegular leading-normal">
                        {item?.created_at}
                      </span>
                    </div>
                  </div>
                  {/* userText and  */}
                  <div className="md:p-[15px] w-full md:w-[95%] h-fit ">
                    <span className="text-mobileTextColor text-[13px] md:text-base not-italic font-AeonikProRegular leading-normal">
                      {item?.comment}
                    </span>
                  </div>
                  {/* Comment Section */}
                  {/* <div>
                    <div className="w-full h-fit mt-[20px] md:mt-[15px] md:p-[15px] ">
                      <div className="w-full h-fit flex justify-between px-[15px] py-3 md:p-[25px] bg-ProductReplyBg rounded-lg gap-x-[15px]">
                        <div>
                          <p className="text-tableTextTitle2 text-[12px] md:text-base font-AeonikProMedium mb-4">
                            {item?.subjectBrand}
                          </p>
                          <p className="text-gray-700 text-[12px] md:text-base font-AeonikProRegular">
                            {item?.subjectReply}
                          </p>
                        </div>
                        <div className="flex items-start mt-[2px]">
                          <span className="text-textLightColor text-[11px] md:text-base font-AeonikProRegular leading-normal">
                            {item?.replyDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="w-full h-fit mt-[25px] md:mt-[5px] flex justify-end">
                    {state?.sendAnswer ? (
                      <div className="w-full flex flex-col md:flex-row items-center justify-between">
                        <textarea
                          name="answer"
                          id="answer"
                          className="w-full md:w-4/5 h-12 text-[13px] md:text-base md:h-14 border rounded-lg p-3 md:mr-[20px] xxl:mr-[30px]"
                          value={state?.replyText}
                          onChange={(e) =>
                            setState({ ...state, replyText: e.target.value })
                          }
                          placeholder="Add your answer..."
                        ></textarea>
                        <div className="flex items-center ml-auto mt-3 md:mt-0">
                          <button
                            onClick={() => {
                              setState({ ...state, getUserId: item?.user?.id });

                              sendReplyText();
                            }}
                            className="w-[132px] h-9 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg mr-[10px]"
                          >
                            <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                              Отправить
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              setState({ ...state, sendAnswer: false })
                            }
                            className="w-9 h-9 md:w-11 md:h-11 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border border-textBlueColor rounded-lg"
                          >
                            <CloseAnswer colors="#007DCA" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setState({ ...state, sendAnswer: true })}
                        className="w-full md:w-[132px] h-9 md:py-0 md:h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg"
                      >
                        <span className="text-[13px] md:text-sm not-italic font-AeonikProMedium">
                          Ответить
                        </span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
export { CommentTitle };
