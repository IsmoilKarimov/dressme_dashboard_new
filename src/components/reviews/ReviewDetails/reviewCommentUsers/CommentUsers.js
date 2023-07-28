import React, { useState } from "react";
import { CloseAnswer, StarOutlineIcon } from "../../../../assets/icons";

export default function CommentUsers() {

  const [sendAnswer, setSendAnswer] = useState(false)

  const [userInfo, setuserInfo] = useState([
    {
      id: 1,
      userName: "Umar",
      userImg:
        "https://storage.kun.uz/source/thumbnails/_medium/9/I0iHdUWlWwccLwGsh3rqHOJznm3TsLI3_medium.jpg",
      starCount: 5,
      date: "19 февраля 2023 г.",
      userFeedback:
        "Качество среднее но стоит своих денег точно мне понравилась классный оверсайз. Качество среднее но стоит своих денег точно мне понравилась классный оверсайз.",
      wearSubject: [
        {
          id: 1,
          subjectBrand: "Ответ Nike Store Official Dealer",
          subjectReply: "Спасибо вам за оценку!",
          replyDate: "26 февраля 2023 г.",
        },
      ],
    },
    {
      id: 2,
      userName: "Firdavsbek",
      userImg:
        "https://storage.kun.uz/source/thumbnails/_medium/9/I0iHdUWlWwccLwGsh3rqHOJznm3TsLI3_medium.jpg",
      starCount: 4,
      date: "19 февраля 2023 г.",
      userFeedback:
        "Качество среднее но стоит своих денег точно мне понравилась классный оверсайз. Качество среднее но стоит своих денег точно мне понравилась классный оверсайз.",
      wearSubject: [
        {
          id: 1,
          subjectBrand: "",
          subjectReply: "",
          replyDate: "",
        },
      ],
    },
    {
      id: 3,
      userName: "Shohjahon",
      userImg:
        "https://storage.kun.uz/source/thumbnails/_medium/9/I0iHdUWlWwccLwGsh3rqHOJznm3TsLI3_medium.jpg",
      starCount: 5,
      date: "19 февраля 2023 г.",
      userFeedback:
        "Качество среднее но стоит своих денег точно мне понравилась классный оверсайз. Качество среднее но стоит своих денег точно мне понравилась классный оверсайз.",
      wearSubject: [
        {
          id: 1,
          subjectBrand: "Ответ Nike Store Official Dealer",
          subjectReply: "Спасибо вам за оценку!",
          replyDate: "26 февраля 2023 г.",
        },
      ],
    },
  ]);
  return (
    <div className="w-full h-full  flex flex-col gap-y-[15px]">
      <div className="pb-1 justify-end text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center gap-x-4">
        <p> Отзывы клиентов</p>
      </div>
      {userInfo.map((data) => {
        return (
          <div className="w-full h-fit border border-lightBorderColor rounded-[5px] p-[15px]">
            {/* userImg and Date */}
            <div className="w-full p-[15px]  h-fit flex justify-between">
              <div className="h-10 w-fit flex items-center gap-x-[15px]">
                <figure className="w-10 h-10  rounded-full overflow-hidden flex items-center justify-center">
                  <img src={data?.userImg} alt="" className="w-full h-full" />
                </figure>
                <div className="flex flex-col">
                  <p className="text-tableTextTitle2 text-xl not-italic font-AeonikProMedium">
                    {data?.userName}
                  </p>
                  <p className="flex gap-x-[10px]">
                    <p className="text-gray-700 text-sm not-italic font-AeonikProRegular leading-normal	">
                      Оценка покупки
                    </p>
                    <p className="flex items-center gap-x-[2px]">
                      <span className="text-gray-700 text-sm not-italic font-AeonikProRegular leading-normal	">
                        {" "}
                        {data?.starCount}.0
                      </span>{" "}
                      <span>
                        <StarOutlineIcon />
                      </span>
                    </p>
                  </p>
                </div>
              </div>
              <div className="h-10 w-fit flex items-center">
                <span className="text-textLightColor text-base not-italic font-AeonikProRegular leading-normal">
                  {data?.date}
                </span>
              </div>
            </div>
            {/* userText and  */}
            <div className="p-[15px] w-[95%] h-fit ">
              <span className="text-gray-700 text-base not-italic font-AeonikProRegular leading-normal">
                {data?.userFeedback}
              </span>
            </div>
            {data?.wearSubject.map((item) => {
              return (
                <>
                  {item?.subjectReply.length !== 0 ? (
                    <div className="w-full h-fit  mt-[15px] p-[15px]">
                      <div className="w-full h-fit flex  justify-between p-[25px] bg-ProductReplyBg rounded-[5px] gap-x-[15px]">
                        <div>
                          {" "}
                          <p className="text-tableTextTitle2 text-base not-italic font-AeonikProMedium">
                            {item?.subjectBrand}
                          </p>
                          <p className="text-gray-700 text-base not-italic font-AeonikProRegular">
                            {item?.subjectReply}
                          </p>
                        </div>
                        <div>
                          <span className="text-textLightColor text-base not-italic font-AeonikProRegular leading-normal">
                            {item?.replyDate}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {item?.subjectReply.length !== 0 ? null : (
                    <div className="w-full h-fit mt-[5px] flex justify-end">
                      {sendAnswer ? (
                        <div className="w-full flex items-center justify-between">
                          <textarea name="answer" id="answer" className="w-4/5 border rounded p-3" placeholder="Add your answer..."></textarea>
                          <button className="w-[132px] h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg">
                            <span className="text-sm not-italic font-AeonikProMedium">
                            Отправить
                            </span>
                          </button>
                          <button
                            onClick={() => setSendAnswer(false)}
                            className="w-11 h-11 bg-white flex items-center justify-center active:scale-95  active:opacity-70 text-white border rounded-lg">  
                            <CloseAnswer />
                          </button>                        
                        </div>
                      )
                      : (
                        <button 
                          onClick={() => setSendAnswer(true)}
                          className="w-[132px] h-11 bg-textBlueColor flex items-center justify-center active:scale-95  active:opacity-70 text-white rounded-lg">
                          <span className="text-sm not-italic font-AeonikProMedium">
                          Ответить
                          </span>
                        </button>
                      )
                    }
                    </div>
                  )}
                </>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
