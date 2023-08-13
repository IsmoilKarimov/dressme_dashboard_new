import { Link } from "react-router-dom";
import {
  AddLocationIcon,
  BgNoImgIcon,
  ColorsIcon,
  DeleteIcon,
  FemaleIcon,
  MaleIcon,
  SearchIcon,
} from "../../assets/icons";
import { DatePicker, Space, Popover } from "antd";
const { RangePicker } = DatePicker;
export default function Clothes(params) {
  return (
    <div>
      <div className="mb-12 flex justify-end items-center md:justify-between max-w-[1540px] mx-auto border-b border-lightBorderColor py-5">
        <section className="hidden md:block">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            Одежда
          </p>
        </section>
        <div className="w-fit flex items-center gap-x-[15px]">
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
              <RangePicker />
            </Space>
          </section>
        </div>
      </div>

      <div className="flex justify-end items-center md:justify-between max-w-[1540px] mx-auto pb-6">
        <section className="hidden md:block">
          <p className="text-black text-2xl not-italic font-AeonikProMedium">
            Юнусабад
          </p>
        </section>
        <div className="w-fit flex items-center">
          <div className="mr-6 font-AeonikProRegular text-lg text-mobileTextColor">
            Выбранные
          </div>
          <button className="active:translate-y-[2px] pr-3 border-r-[2px] border-addLocBorderRight flex items-center font-AeonikProRegular text-lg text-addLocationTextcolor">
            <span className="mr-[5px]">
              <AddLocationIcon width={20} />
            </span>
            Добавить в локацию
          </button>
          <button className="active:translate-y-[2px] pl-3 flex items-center font-AeonikProRegular text-lg text-deleteColor">
            <span className="mr-[5px]">
              <DeleteIcon width={20} />
            </span>
            Удалить
          </button>
        </div>
      </div>

      <div className="max-w-[1572px] mx-auto font-AeonikProRegular text-[16px]">
        <div className="mb-[10px] flex items-center text-tableTextTitle">
          <div className="w-[24px] h-[24px] border border-checkboxBorder bg-white rounded mr-[8px]"></div>

          <div className="border-lightBorderColor border rounded-[12px] bg-lightBgColor px-[30px] py-[8px] flex justify-between items-center gap-x-[5px] w-full">
            <div>Фото</div>
            <div>Наименование товара</div>
            <div>Артикул</div>
            <div>Тип</div>
            <div>Цвет</div>
            <div>Сезон</div>
            <div>Пол</div>
            <div>Цена товара</div>
            <div className="w-[50px]"></div>
            <div className="text-right w-[60px]">Добавить</div>
            <div className="text-right w-[60px]">Удалить</div>
          </div>
        </div>

        <div className="mb-[10px] flex items-center text-tableTextTitle font-AeonikProRegular text-[16px]">
          <div className="w-[24px] h-[24px] border border-checkboxBorder bg-white rounded mr-[8px]"></div>

          <div className="border-lightBorderColor border rounded-[12px] bg-white px-[30px] py-[8px] flex justify-between items-center gap-x-[5px] w-full">
            <div className="flex items-center justify-center w-[60px] h-[60px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
              <BgNoImgIcon />
            </div>
            <div className="max-w-[169px] text-weatherWinterColor">
              Спортивная мужская кроссовка Nike RUN
            </div>
            <div className="text-tableTextTitle2">BAA-00004</div>
            <div className="text-tableTextTitle2">Футболка</div>
            <div>
              <div className="rounded-lg border border-lightBorderColor flex items-center py-[3px] px-[5px]">
                <span className="mr-[5px]">
                  <ColorsIcon />
                </span>
                5
              </div>
            </div>
            <div>
              <div className="bg-[url('/src/assets/seasons.png')] w-[100px] h-[40px]"></div>
            </div>
            <div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-[40px] h-[40px] border border-lightBorderColor rounded-[12px] bg-lightBgColor mr-1">
                  <MaleIcon />
                </div>
                <div className="flex items-center justify-center w-[40px] h-[40px] border border-lightBorderColor rounded-[12px] bg-lightBgColor">
                  <FemaleIcon />
                </div>
              </div>
            </div>
            <div>452 000 сумара</div>
            <Link className="text-[18px] text-weatherWinterColor w-[150px]">
              Подробнее
            </Link>
            <button className="active:translate-y-[2px]">
              <span>
                <AddLocationIcon width={30} />
              </span>
            </button>
            <button className="active:translate-y-[2px]">
              <span>
                <DeleteIcon width={30} />
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
