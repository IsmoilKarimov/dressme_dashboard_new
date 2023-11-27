import React, { useContext, useEffect, useState } from "react";
import { StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { Checkbox, Col, Row } from 'antd';

function AccessoriesAdd({ colorGroup, colorSelect, typeId, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [state, setState] = useState({
        rowSize: null,
        colSize: null,
        minSize: null,
        ageNum: null,
        quantityNum: null,
        priceNum: null,
        salePercent: null,
        salePrice: null,
        sizeListCheck: null,
        isCheckValid: false,
        // ------
        onConcel: false,
        selected: null
    })

    const [decraseList, setDecraseList] = useState(false)
    const [sizeList, setSizeList] = useState({
        sizeList1: [
            { id: 1, action: true, name: "XXS" },
            { id: 2, action: true, name: "XS" },
            { id: 3, action: true, name: "S" },
            { id: 4, action: true, name: "M" },
            { id: 5, action: true, name: "L" },
            { id: 6, action: true, name: "XL" },
            { id: 7, action: true, name: "2XL" },
            { id: 8, action: true, name: "3XL" },
        ],
        sizeList2: [
            { id: 11, action: true, name: "5X" },
            { id: 12, action: true, name: "7X" },
            { id: 13, action: true, name: "9X" },
            { id: 14, action: true, name: "10X" },
            { id: 15, action: true, name: "4X" },
            { id: 16, action: true, name: "6X" },
            { id: 17, action: true, name: "8X" },
        ]
    }
    )


    const SelectedNumber = 5

    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (state?.priceNum) {
            handleCallBack({
                accessorySize: state?.minSize,
                legnthAcc: state?.rowSize,
                widthAcc: state?.colSize,
                accessoryLetterSize: state?.sizeListCheck,
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum,
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice,
                category_Id: SelectedNumber,

            })
            setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
            setState({ ...state, isCheckValid: false, onConcel: true })
        }

    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            rowSize: '',
            colSize: '',
            minSize: '',
            ageNum: '',
            quantityNum: '',
            priceNum: '',
            salePercent: '',
            salePrice: '',
            selected: null,
            isCheckValid: false,
            // ------
            onConcel: false
        })
        handleCallBack()
    }


    return (
        <div className={`w-full ${SelectedNumber == typeId ? "flex items-center gap-x-1" : "hidden"}  h-fitoverflow-hidden  my-2`}>
            <div className="flex items-center h-full">
                <Checkbox />
            </div>
            <div
                className={`w-full h-fit flex flex-col items-center justify-center border border-borderColor  rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Размер{" "}
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                        </p>
                        <div className="w-[83px] flex items-center justify-between gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle outline-none w-full text-start h-[38px] border border-borderColor px-3 rounded-lg  font-AeonikProRegular "
                                    value={state?.minSize}
                                    onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-[80%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            Буквенный Размер
                        </p>
                        <div className='w-full '>
                            {/* -----------------Desktop--------------------- */}
                            <div className="w-full hidden md:flex flex-row">
                                <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4 gap-2 ">
                                    {sizeList.sizeList1.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >

                                                {data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}

                                </div>
                                <div className="w-fit w-[222px]  h-[50px] grid grid-cols-4  gap-2 items-end">
                                    {decraseList && sizeList.sizeList2.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >

                                                {data?.action &&

                                                    <label
                                                        htmlFor="m_outwear"
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="m_outwear"
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>

                                                }
                                            </div>
                                        );
                                    })}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDecraseList(!decraseList)
                                        }}
                                        className="text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium cursor-pointer"
                                    >
                                        {decraseList ? "Меньше" : "Больше"}
                                    </button>
                                </div>
                            </div>
                            {/* -----------------Mobile--------------------- */}
                            <div className="w-full flex md:flex-row flex-col md:hidden">
                                <div className="w-fit md:w-[222px]  md:h-[50px] flex md:block flex-wrap md:grid md:grid-cols-4 gap-1 md:gap-2 ">
                                    {sizeList.sizeList1.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >
                                                {
                                                    data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}
                                    {/* <span className="flex flex-wrap "> */}
                                    {decraseList && sizeList.sizeList2.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex  md:hidden"
                                            >
                                                {
                                                    data?.action &&
                                                    <label
                                                        htmlFor={data?.id}
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={data?.id}
                                                            name="size_Outwear"
                                                            checked={data?.id === state?.selected}
                                                            onChange={() => setState({ ...state, sizeListCheck: data?.name, selected: data?.id })}
                                                            value={data?.name}
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDecraseList(!decraseList)
                                        }}
                                        className=" md:hidden text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-md not-italic font-AeonikProMedium cursor-pointer"
                                    >
                                        {decraseList ? "Меньше" : "Больше"}
                                    </button>
                                    {/* </span> */}
                                </div>
                                <div className="w-fit md:w-[222px]  h-[50px] hidden md:block flex-wrap  md:grid md:grid-cols-4gap-1 md:gap-2 items-end">
                                    {decraseList && sizeList.sizeList2.map((data) => {
                                        return (
                                            <div
                                                key={data?.id}
                                                className="flex "
                                            >
                                                {
                                                    data?.action &&
                                                    <label
                                                        htmlFor="m_outwear"
                                                        className="flex w-[46px] gap-x-[2px] items-center  font-AeonikProMedium text-textLightColor   cursor-pointer"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id="m_outwear"
                                                            name="size_Outwear"
                                                            value="M"
                                                            className="w-3 h-3 ll:w-[16px] ll:h-[16px] border border-[#B5B5B5] rounded-[2px] "
                                                        />
                                                        <span className="text-textLightColor  flex items-center  select-none text-[11px] ls:text-[12px] md:text-[13px] not-italic font-AeonikProMedium">
                                                            {data?.name}
                                                        </span>
                                                    </label>
                                                }
                                            </div>
                                        );
                                    })}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setDecraseList(!decraseList)
                                        }}
                                        className="text-textBlueColor select-none text-[10px] ls:text-[12px] ll:text-xs not-italic font-AeonikProMedium cursor-pointer"
                                    >
                                        {decraseList ? "Меньше" : "Больше"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-[20%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Длина
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                        </p>
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle outline-none w-full h-[40px] text-start border border-borderColor px-3 rounded-lg   font-AeonikProRegular "
                                    value={state?.colSize}
                                    onChange={(e) => setState({ ...state, colSize: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[20%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Ширина
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className="inputStyle outline-none w-full h-[40px] text-start border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                    value={state?.rowSize}
                                    onChange={(e) => setState({ ...state, rowSize: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[60%] flex flex-col ml-auto">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Количество
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>

                        <div className="flex items-start justify-between ">
                            <input
                                type="text"
                                className={`inputStyle outline-none w-[60px] h-[40px] text-center  ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}     px-3  rounded-lg  font-AeonikProRegular `}
                                value={state?.quantityNum}
                                onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                    <div className="w-[45%] flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                    Возраст
                                </label>
                                {/* <span className="ml-[5px]">
              <StarLabel />
            </span> */}
                            </div>
                            <div className="w-fit flex items-center">
                                <input
                                    type="text"
                                    className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px] outline-none "
                                    placeholder=""
                                    value={state?.ageNum}
                                    onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center mb-2 ll:mb-[10px] ">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                    Цена
                                </label>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="priceAccess" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}    px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="priceAccess"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                    value={state?.priceNum}
                                    onChange={(e) => setState({ ...state, priceNum: e.target.value })}
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    сум
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="w-[40%] flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <label
                                htmlFor=""
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                                Скидка
                            </label>
                            <span className="font-AeonikProMedium text-[10px] md:text-[13px] text-textLightColor ml-[5px]">
                                (необязательно)
                            </span>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="w-full flex items-center gap-x-1">
                                <div className="w-[40%] md:w-[72px] flex items-start">
                                    <div className="w-full h-10 flex items-center justify-center bg-white border border-borderColor rounded-lg px-[10px] md:px-3 py-[8px]">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none "
                                            value={state?.salePercent}
                                            onChange={(e) => setState({ ...state, salePercent: e.target.value })}
                                        />
                                        <span className="text-textLightColor ml-2">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <label htmlFor="salePrice" className="w-full h-[40px] flex items-center justify-between bg-white border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="salePrice"
                                            className="inputStyle w-[75%] font-AeonikProMedium outline-none "
                                            value={state?.salePrice}
                                            onChange={(e) => setState({ ...state, salePrice: e.target.value })}
                                        />
                                        <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                            сум
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-fit  flex items-center justify-between px-3">
                    <span className="text-gray-800 text-base flex items-center not-italic font-AeonikProRegular">
                        Цвет:

                        {colorGroup?.filter(e => colorSelect?.includes(e?.id))?.map((data) => {
                            return (
                                <div key={data?.id} style={{ background: `${data.hex}` }}
                                    className={`rounded-[15px]  text-white px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular`}
                                >
                                    <span>{data?.name_ru} </span>
                                </div>
                            );
                        })}
                    </span>
                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
export default React.memo(AccessoriesAdd)
