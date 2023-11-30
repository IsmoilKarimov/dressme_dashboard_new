import React, { useContext, useEffect, useState } from "react";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Checkbox, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";

function ShoesAdd({ colorGroup, sizeOfColor, stateList, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [state, setState] = useState({
        minFootLength: "",
        maxFootLength: "",
        minSize: "",
        ageNum: "",
        priceNum: "",
        salePercent: "",
        salePrice: "",
        quantityNum: "",
        isCheckValid: false,
        // ------
        onConcel: false
    })
    const SelectedNumber = 4



    useEffect(() => {
        if (stateList?.sizeGetList[0]?.category_id == SelectedNumber) {
            setState({
                ...state,
                quantityNum: stateList?.sizeGetList[0]?.amount,
                priceNum: stateList?.sizeGetList[0]?.price,
                minFootLength: stateList?.sizeGetList[0]?.min_foot_length,
                maxFootLength: stateList?.sizeGetList[0]?.max_foot_length,
                minSize: stateList?.sizeGetList[0]?.wear_size,
                ageNum: stateList?.sizeGetList[0]?.age,
                salePercent: stateList?.sizeGetList[0]?.discount_percent,
                salePrice: stateList?.sizeGetList[0]?.discount_price,
            })
        }

    }, [stateList?.sizeGetList[0]])
    console.log(stateList?.sizeGetList[0]?.discount_price, " stateList?.sizeGetList[0]?.discountPrice");
    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (state?.minSize && state?.priceNum && state?.quantityNum) {
            handleCallBack({
                footWearSize: state?.minSize,
                minFootLength: state?.minFootLength,
                maxFootLength: state?.maxFootLength,
                amount: state?.quantityNum,
                age: state?.ageNum,
                price: state?.priceNum?.split(",")?.join(""),
                discountPercent: state?.salePercent,
                discountPrice: state?.salePrice?.split(",")?.join(""),

            })
            setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
            setState({ ...state, isCheckValid: false, onConcel: true })
        }


    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minFootLength: "",
            maxFootLength: "",
            minSize: "",
            ageNum: "",
            priceNum: "",
            salePercent: "",
            salePrice: "",
            isCheckValid: false,
            // ------
            onConcel: false
        })
        handleCallBack()

    }
    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')

        // Remove any existing commas from the input
        const sanitizedValue = result.replace(/,/g, '');

        // Format the number with commas
        const formattedValue = Number(sanitizedValue).toLocaleString()

        setState({ ...state, priceNum: formattedValue });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')

        // Remove any existing commas from the input
        const sanitizedValue = result.replace(/,/g, '');

        // Format the number with commas
        const formattedValue = Number(sanitizedValue).toLocaleString()

        setState({ ...state, salePrice: formattedValue });
    };
    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_Id ? "flex items-center gap-x-1" : "hidden"}  h-fitoverflow-hidden  my-2`}>
            <div className="flex items-center h-full">
                <Checkbox />
            </div>
            <div
                className={`w-full h-fit flex flex-col items-center justify-center border border-borderColor  rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Размер
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="w-[58px] flex items-center justify-between gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className={`inputStyle outline-none w-full text-start h-[40px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg   font-AeonikProRegular `}
                                    value={state?.minSize}
                                    onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Длина Стопы
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                        </p>
                        <div className="flex items-center gap-x-1">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg   font-AeonikProRegular "
                                    placeholder="Мин"
                                    value={state?.minFootLength}
                                    onChange={(e) => setState({ ...state, minFootLength: e.target.value })}
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className="inputStyle outline-none w-[60px] h-[40px] text-center border border-borderColor px-3  rounded-lg  font-AeonikProRegular "
                                    placeholder="Макс"
                                    value={state?.maxFootLength}
                                    onChange={(e) => setState({ ...state, maxFootLength: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col md:ml-5">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Количество
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between ">
                            <input
                                type="number"
                                className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-5  rounded-lg  font-AeonikProRegular `}
                                value={state?.quantityNum}
                                onChange={(e) => setState({ ...state, quantityNum: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 pt-5 gap-x-[11px] md:gap-x-[20px] mb-[15px]">
                    <div className="w-fit flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                    Возраст
                                </label>
                                {/* <span className="ml-[5px]">
                  <StarLabel />
                </span> */}
                            </div>
                            <div className="w-fit flex items-center">
                                <input
                                    type="number"
                                    className="inputStyle w-[58px] h-[40px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
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
                            <label htmlFor="priceShoes" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3 py-[6px] rounded-lg text-xs `}>
                                <input
                                    type="text"
                                    id="priceShoes"
                                    placeholder="0"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"
                                    value={state?.priceNum}
                                    onChange={handleChangePrice}
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    сум
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col items-start">
                        <div className="flex items-center justify-center mb-2 ll:mb-[10px] ">
                            <label
                                htmlFor=""
                                className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

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
                                            type="number"
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
                                            onChange={handleChangeSalePrice}
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

                        {colorGroup?.filter(e => sizeOfColor?.includes(e?.id))?.map((data) => {
                            console.log(data?.id, "data?.color?.id");
                            return (
                                <div key={data?.id} style={{ background: `${data.hex}` }}
                                    className={` ${data?.id === 2 ? "border border-black text-black" : "text-white"} rounded-[15px] ml-3  px-[15px]  whitespace-nowrap flex items-center justify-center text-[14px] ll:text-md  not-italic font-AeonikProRegular`}
                                >
                                    <span >{data?.name_ru} </span>
                                </div>
                            );
                        })}
                    </span>
                    <button
                        // onClick={handleSendDetail}
                        className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}
export default React.memo(ShoesAdd)
