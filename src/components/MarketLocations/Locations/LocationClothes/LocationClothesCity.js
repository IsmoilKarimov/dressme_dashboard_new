import { Link, useParams } from "react-router-dom";
import {
  AddIconsCircle,
  AddLocationIcon,
  DeleteIcon,
} from "../../../../assets/icons";
import { useEffect, useState } from "react";
import LocationItem from "./LocationItem/LocationItem";

export default function LocationClothesCity() {
  const { id } = useParams();
  const NewId = id.replace(":", "");

  const [data, setData] = useState([
    { id: 1, name: "wear", isCheck: false },
    { id: 2, name: "wear", isCheck: false },
    { id: 3, name: "wear", isCheck: false },
    { id: 4, name: "wear", isCheck: false },
    { id: 5, name: "wear", isCheck: false },
    { id: 6, name: "wear", isCheck: false },
  ]);

  const [someChecked, setSomeChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);

  let checkIndicator = allChecked ? "allNotCheck" : "allCheck";

  const onCheck = (id) => {
    if (id === "allCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: true };
      });
      setData(newArr);
    } else if (id === "allNotCheck") {
      let newArr = data.map((item) => {
        return { ...item, isCheck: false };
      });
      setData(newArr);
    } else {
      let newArr = data.map((item) => {
        return item.id === id ? { ...item, isCheck: !item.isCheck } : item;
      });
      setData(newArr);
    }
  };

  useEffect(() => {
    let newData = data.filter((item) => item.isCheck === true);
    if (newData.length) {
      setSomeChecked(true);
    } else {
      setSomeChecked(false);
    }
  }, [data]);

  return (
    <div>
      <div className="flex justify-end items-center md:justify-between max-w-[1540px] mx-auto pb-6 mt-10">
        <section className="hidden md:flex gap-x-4">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            {NewId}
          </p>
          <Link className="active:translate-y-[2px] flex items-center gap-x-[4px]">
            <span>
              <AddIconsCircle />
            </span>
            <span className="text-addWearColorText text-base not-italic font-AeonikProMedium">
              Добавить одежду
            </span>
          </Link>
        </section>
        <div className="w-fit flex items-center">
          <div className="mr-6 font-AeonikProRegular text-lg text-mobileTextColor">
            Выбранные
          </div>
          <button
            className={`pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-lg text-addLocationTextcolor  ${
              someChecked
                ? "opacity-100 active:translate-y-[2px]"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <span className="mr-[5px]">
              <AddLocationIcon width={20} />
            </span>
            Добавить в локацию
          </button>
          <button
            className={`pl-3 flex items-center font-AeonikProRegular text-lg text-deleteColor ${
              someChecked
                ? "opacity-100 active:translate-y-[2px]"
                : "opacity-30 cursor-not-allowed"
            }`}
          >
            <span className="mr-[5px]">
              <DeleteIcon width={20} />
            </span>
            Удалить
          </button>
        </div>
      </div>

      <div className="max-w-[1572px] mx-auto font-AeonikProRegular text-[16px]">
        <div className="mb-[10px] flex items-center text-tableTextTitle">
          <div
            onClick={() => {
              onCheck(checkIndicator);
              setAllChecked(!allChecked);
            }}
            className={`cursor-pointer min-w-[24px] min-h-[24px] border border-checkboxBorder ${
              allChecked
                ? "bg-[#007DCA] border-[#007DCA]"
                : "bg-white border-checkboxBorder"
            } flex items-center justify-center rounded mr-[8px]`}
          >
            <span
              className={`${
                allChecked ? "flex items-center justify-center" : "hidden"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="13"
                viewBox="0 0 11 13"
                fill="none"
              >
                <path
                  d="M1 9.5L5.88235 11L10 1"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
            </span>
          </div>

          <div className="border-lightBorderColor border rounded-[12px] bg-lightBgColor pl-[30px] py-[8px] flex items-center gap-x-[5px] w-full">
            <div className="w-[45px]">No:</div>
            <div className="mr-[75px]">Фото</div>
            <div className="flex w-full">
              <div className="w-[17%]">Наименование товара</div>
              <div className="w-[10%]">Артикул</div>
              <div className="w-[9%]">Тип</div>
              <div className="w-[8%]">Цвет</div>
              <div className="w-[12%]">Сезон</div>
              <div className="w-[11%]">Пол</div>
              <div className="w-[10%]">Цена товара</div>
              <div className="w-[15%]"></div>
              <div className="w-[9%] text-center">Добавить</div>
              <div className="w-[9%] text-center">Удалить</div>
            </div>
          </div>
        </div>

        <div className="mb-[10px] flex flex-col gap-y-[10px] items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          {data.map((data) => {
            return <LocationItem data={data} click={onCheck} />;
          })}
        </div>
      </div>
    </div>
  );
}