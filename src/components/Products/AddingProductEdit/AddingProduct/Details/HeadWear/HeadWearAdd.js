import React, { useContext, useEffect, useState } from "react";
import AllSizeListForWear from "../../../../../../hook/AllSizeListForWear/AllSizeListForWear";
import { LineIcon, StarLabel } from "../../../../../../assets/icons";
import { Checkbox, Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";

function HeadWearAdd({ colorGroup, sizeOfColor, stateList, handleCallBack }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);

    const [state, setState] = useState({
        minHeadGirth: null,
        maxHeadGirth: null,
        sizeCheck: false,
        amount: null,
        age: null,
        price: null,
        discountPercent: null,
        discountPrice: null,
        isCheckValid: false,
        // ------
        onConcel: false,
        // ----
        isHasTypeId: false

    })
    const SelectedNumber = 1

    useEffect(() => {
        if (stateList?.sizeGetList[0]?.category_id == SelectedNumber) {
            setState({
                ...state,
                minHeadGirth: stateList?.sizeGetList[0]?.min_head_girth,
                maxHeadGirth: stateList?.sizeGetList[0]?.max_head_girth,
                sizeCheck: stateList?.sizeGetList[0]?.one_size,
                amount: stateList?.sizeGetList[0]?.amount,
                age: stateList?.sizeGetList[0]?.age,
                price: stateList?.sizeGetList[0]?.price,
                discountPercent: stateList?.sizeGetList[0]?.discount_percent,
                discountPrice: stateList?.sizeGetList[0]?.discount_price,

            })
        }

    }, [stateList?.sizeGetList[0]])



    const onChangeSwitch = (checked) => {
        setState({ ...state, sizeCheck: checked })
    };



    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (state?.amount && state?.price) {
            handleCallBack({
                minHeadGirth: state?.minHeadGirth,
                maxHeadGirth: state?.maxHeadGirth,
                oneSize: state?.sizeCheck,
                amount: state?.amount,
                age: state?.age,
                price: state?.price?.split(",")?.join(""),
                discountPercent: state?.discountPercent,
                discountPrice: state?.discountPrice?.split(",")?.join(""),
                // category_Id: SelectedNumber,

            })
            setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
            setState({ ...state, isCheckValid: false, onConcel: true, })
        }

    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minHeadGirth: '',
            maxHeadGirth: '',
            sizeCheck: false,
            amount: '',
            age: '',
            price: '',
            discountPercent: '',
            discountPrice: '',
            onConcel: false,
            toggleShow: false
        })
        handleCallBack()
    }
    const handleChangePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')

        // Remove any existing commas from the input
        const sanitizedValue = result.replace(/,/g, '');

        // Format the number with commas
        const formattedValue = Number(sanitizedValue).toLocaleString()

        setState({ ...state, price: formattedValue });
    };
    const handleChangeSalePrice = (event) => {
        const result = event.target.value.replace(/\D/g, '')

        // Remove any existing commas from the input
        const sanitizedValue = result.replace(/,/g, '');

        // Format the number with commas
        const formattedValue = Number(sanitizedValue).toLocaleString()

        setState({ ...state, discountPrice: formattedValue });
    };

    return (
        <div className={`w-full ${SelectedNumber == stateList?.category_Id ? "flex items-center gap-x-1" : "hidden"}  h-fitoverflow-hidden  my-2`}>
            <div className="flex items-center h-full">
                <Checkbox />
            </div>
            <div
                className={`w-full h-fit flex flex-col items-center justify-center border border-borderColor  rounded-lg  not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex justify-start px-3  gap-x-10  pt-5 ">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">

                            Обхват головы
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            {/* <span className="ml-[5px]">
                                <StarLabel />
                            </span> */}
                        </p>
                        <div className="w-full flex items-center mt-[10px]">
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className={`inputStyle w-[55px] h-[38px] text-center border border-borderColor bg-white  px-2 rounded-lg   outline-none font-AeonikProRegular `}
                                    placeholder="Мин"
                                    value={state?.minHeadGirth}
                                    onChange={(e) => setState({ ...state, minHeadGirth: e.target.value })}
                                    required
                                />
                            </div>
                            <span className="mx-[5px]"><LineIcon /></span>
                            <div className="flex flex-col">
                                <input
                                    type="number"
                                    className={`inputStyle w-[55px] h-[38px] text-center  border border-borderColor bg-white px-2 rounded-lg  font-AeonikProRegular  outline-none`}
                                    placeholder="Макс"
                                    value={state?.maxHeadGirth}
                                    onChange={(e) => setState({ ...state, maxHeadGirth: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center justify-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                            One Size
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            {/* <span className="ml-[5px]">
                                <StarLabel />
                            </span> */}
                        </p>
                        <div className="flex items-center justify-center mt-[10px]">
                            <Switch
                                className={`border border-borderColor bg-[#8B8B8B] `}
                                onChange={onChangeSwitch}
                                defaultChecked={state?.sizeCheck}
                            />
                        </div>
                    </div>
                    <div className="w-fit flex flex-col items-center">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                            Количество
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between mt-[10px]">
                            <input
                                type="number"
                                className={`inputStyle w-[60px] h-[38px] text-center  flex items-center justify-center outline-none px-1 ${state?.isCheckValid && !state?.amount ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   rounded-lg  font-AeonikProRegular `}
                                value={state?.amount}
                                onChange={(e) => setState({ ...state, amount: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-row px-3 gap-x-[11px] md:gap-x-[30px] mb-[15px] md:mt-[15px]">
                    <div className="w-1/2 flex items-center gap-x-[25px]">
                        <div className="w-fit hidden md:flex flex-col items-start">
                            <div className="flex items-center justify-center  mb-2 ll:mb-[10px]">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">
                                    Возраст
                                </label>
                            </div>
                            <div className="w-full flex items-center">
                                <input
                                    type="number"
                                    className="inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none "
                                    placeholder="age"
                                    value={state?.age}
                                    onChange={(e) => setState({ ...state, age: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[90%]">
                            <div className="flex items-center mb-2 ll:mb-[10px] ">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor ll:font-AeonikProMedium font-AeonikProRegular">
                                    Цена
                                </label>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="enterPrice" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.price ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"} px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="enterPrice"
                                    className="inputStyle w-[70%] font-AeonikProMedium outline-none bg-transparent"

                                    value={state?.price}
                                    onChange={handleChangePrice}
                                    required
                                />
                                <span className="text-textLightColor ml-[10px] text-xs md:text-base font-AeonikProRegular">
                                    сум
                                </span>
                            </label>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col items-start">
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
                                    <div className="w-full h-10 flex items-center justify-center border border-borderColor rounded-lg px-[4px] md:px-1 py-[8px]">
                                        <input
                                            type="number"
                                            placeholder="0"
                                            className="inputStyle w-[70%] font-AeonikProMedium text-start outline-none flex items-center justify-center mx-auto"
                                            value={state?.discountPercent}
                                            onChange={(e) => setState({ ...state, discountPercent: e.target.value })}
                                        />
                                        <span className="text-textLightColor ml-1">%</span>
                                    </div>
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="w-[60%] md:w-[75%] flex items-center">
                                    <label htmlFor="discountPrice" className="w-full h-[40px] flex items-center justify-between border border-borderColor px-3 py-[6px] rounded-lg text-xs">
                                        <input
                                            type="text"
                                            placeholder="0"
                                            id="discountPrice"
                                            className="inputStyle w-[75%] font-AeonikProMedium outline-none bg-transparent"
                                            value={state?.discountPrice}
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
                        className="w-fit h-fit flex items-end justify-end select-none active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        Сохранить
                    </button>
                </div>
            </div>
        </div >
    );
}
export default React.memo(HeadWearAdd)
