import React from "react";
import { CloseAnswer, SearchIcon } from "../../../../../../../assets/icons";

const ClothingSubSectionPage = ({ onClick, title }) => {
  const clothingSubSectionList = [
    { id: 1, name: "Тренировка" },
    { id: 2, name: "Плавание" },
    { id: 3, name: "Футбол" },
    { id: 4, name: "Волейбол" },
    { id: 6, name: "Баскетбол" },
    { id: 7, name: "Бокс/MMA" },
    { id: 8, name: "Каратэ" },
    { id: 9, name: "Борьба" },
    { id: 10, name: "Дзюдо" },
    { id: 11, name: "Кунг-фу" },
    { id: 12, name: "Теннис" },
    { id: 13, name: "Настольный Теннис" },
    { id: 14, name: "Бадминтон" },
  ];

  return (
    <div className="max-w-[440px] w-[100%] mx-auto bg-white shadow-navMenuShadov  overflow-hidden h-fit rounded-t-[12px]">
      <section className="h-[52px] w-full bg-btnBgColor flex items-center  justify-between px-4">
        <p className="text-xl font-AeonikProMedium">
          Выберите подраздел одежды
        </p>
        <button onClick={onClick}>
          <CloseAnswer colors={"#000"} />
        </button>
      </section>

      <section className="w-full h-[445px] px-4 flex flex-col items-center">
        <action className="w-full h-fit flex items-center justify-center flex-wrap gap-x-7 mb-[40px]">
          <form className="w-full flex flex-col items-center">
            <div className="w-full h-[34px] flex items-center justify-between rounded-lg border border-borderColor mb-[26px] text-[11px] px-3">
              <input
                type="text"
                name="clothingTypes"
                placeholder="Искать раздел"
                className="w-full pr-3 outline-none"
              />
              <SearchIcon />
            </div>
            <div className="w-full h-[260px] overflow-auto VerticelScroll">
              {clothingSubSectionList.map((data) => {
                return (
                  <div
                    key={data.id}
                    className="w-full flex items-center justify-start border-b border-borderColor pb-[10px] mb-4 text-base font-AeonikProRegular"
                  >
                    {data.name}
                  </div>
                );
              })}
            </div>
          </form>
        </action>
        <action className="w-full flex items-center justify-between gap-x-3 mb-10">
          <button
            onClick={onClick}
            className="w-[45%] h-[38px] text-base font-AeonikProMedium bg-white border border-textBlueColor rounded-md text-textBlueColor active:scale-95"
          >
            Отмена
          </button>
          <button className="w-[55%] h-[38px] text-base font-AeonikProMedium bg-textBlueColor text-white border border-textBlueColor rounded-md active:scale-95">
            Готово
          </button>
        </action>
      </section>
    </div>
  );
};

export default React.memo(ClothingSubSectionPage);
