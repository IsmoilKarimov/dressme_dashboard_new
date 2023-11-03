import React, { useContext, useEffect, useState } from "react";
import { StarLabel } from "../../../../../../assets/icons";
import { Popover, Select, Switch } from "antd";
import { dressMainData } from "../../../../../../hook/ContextTeam";
import { Checkbox, Col, Row } from 'antd';

function UnderAddWear({ title, typeId }) {
    const [dressInfo, setDressInfo] = useContext(dressMainData);
    const [state, setState] = useState({
        minBreast: "",
        maxBreast: "",
        minSize: "",
        maxSize: "",
        minHeight: "",
        maxHeight: "",
        minHips: "",
        maxHips: "",
        quantityNum: "",
        ageNum: "",
        priceNum: "",
        salePercent: "",
        salePrice: "",
        isCheckValid: false,
        // ------
        onConcel: false
    })
    const sizeListCheck = []
    const [toggleShow, setToggleShow] = useState(false)
    const [toggle, setToggle] = useState(false)
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
            { id: 1, action: true, name: "5X" },
            { id: 2, action: true, name: "7X" },
            { id: 3, action: true, name: "9X" },
            { id: 4, action: true, name: "10X" },
            { id: 5, action: true, name: "4X" },
            { id: 6, action: true, name: "6X" },
            { id: 7, action: true, name: "8X" },
        ]
    }
    )
    const handleSizeList = (checkedValues) => {
        sizeListCheck.push(checkedValues.target.value)
    };
    console.log(sizeListCheck, "sizeListCheck");

    const SelectedNumber = 3
    useEffect(() => {
        if (typeId == SelectedNumber) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }, [typeId])
    const handleOpenPopver = (newOpen) => {
        setToggleShow(newOpen)
    }
    const handleSendDetail = (e) => {
        setState({ ...state, isCheckValid: true })
        if (
            state?.minBreast &&
            state?.maxBreast &&
            state?.minSize &&
            state?.maxSize &&
            state?.minHips &&
            state?.maxHips &&
            state?.quantityNum &&
            state?.priceNum) {
            setDressInfo({ ...dressInfo, ProductFilterType: SelectedNumber })
            setState({ ...state, isCheckValid: false, onConcel: true })
            setToggleShow(false)
        }
    }
    const cancelSendDetail = (e) => {
        setDressInfo({ ...dressInfo, ProductFilterType: null })
        setState({
            ...state,
            minBreast: "",
            maxBreast: "",
            minSize: "",
            maxSize: "",
            minHeight: "",
            maxHeight: "",
            minHips: "",
            maxHips: "",
            quantityNum: "",
            ageNum: "",
            priceNum: "",
            salePercent: "",
            salePrice: "",
            isCheckValid: false,
            onConcel: false
        })
        setToggleShow(false)
    }


    const contentUnderWear = (
        <div className="w-[840px] h-fit">
            <div
                className={`w-full h-fit flex flex-col items-center justify-center not-italic cursor-pointer font-AeonikProMedium text-sm leading-4 text-center hover:bg-bgColor`}
            >
                <div className="w-full flex gap-x-10 px-3 pt-5">
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Обхват Талии
                            <span className="text-sm text-textLightColor ml-[6px]">(см)</span>
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.minBreast ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular `}
                                    placeholder="Мин"
                                    value={state?.minBreast}
                                    onChange={(e) => setState({ ...state, minBreast: e.target.value })}
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.maxBreast ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg  font-AeonikProRegular `}
                                    placeholder="Макс"
                                    value={state?.maxBreast}
                                    onChange={(e) => setState({ ...state, maxBreast: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Размер
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.isCheckValid && !state?.minSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder="Мин"
                                        value={state?.minSize}
                                        onChange={(e) => setState({ ...state, minSize: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] ${state?.isCheckValid && !state?.maxSize ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxSize}
                                        onChange={(e) => setState({ ...state, maxSize: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[53%] flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">
                            Обхват Размер
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

                                                {data?.action && <Checkbox.Group
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Row>
                                                        <Col span={8}>
                                                            <Checkbox onChange={handleSizeList} value={data?.name}>{data?.name}</Checkbox>
                                                        </Col>
                                                    </Row>
                                                </Checkbox.Group>}
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

                                                {data?.action && <Checkbox.Group
                                                    style={{
                                                        width: '100%',
                                                    }}
                                                >
                                                    <Row>
                                                        <Col span={8}>
                                                            <Checkbox onChange={handleSizeList} value={data?.name}>{data?.name}</Checkbox>
                                                        </Col>
                                                    </Row>
                                                </Checkbox.Group>}
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
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Размер Бедер
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-center">
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.minHips ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg   font-AeonikProRegular `}
                                    placeholder="Мин"
                                    value={state?.minHips}
                                    onChange={(e) => setState({ ...state, minHips: e.target.value })}
                                />
                            </div>
                            <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                            <div className="flex flex-col">
                                <input
                                    type="text"
                                    className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.maxHips ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3  rounded-lg  font-AeonikProRegular `}
                                    placeholder="Макс"
                                    value={state?.maxHips}
                                    onChange={(e) => setState({ ...state, maxHips: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Рост
                        </p>
                        <div className="flex items-center justify-between gap-x-1">
                            <div className="flex items-center">
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg   font-AeonikProRegular `}
                                        placeholder="Мин"
                                        value={state?.minHeight}
                                        onChange={(e) => setState({ ...state, minHeight: e.target.value })}
                                    />
                                </div>
                                <span className="w-[15px] h-[2px] bg-borderColor  mx-[4px]"></span>
                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        className={`inputStyle outline-none w-[60px] text-center h-[38px] border border-borderColor bg-white px-3  rounded-lg  font-AeonikProRegular `}
                                        placeholder="Макс"
                                        value={state?.maxHeight}
                                        onChange={(e) => setState({ ...state, maxHeight: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-fit flex flex-col md:ml-[14px]">
                        <p className="flex items-center text-[14px] ll:text-base text-mobileTextColor mb-2 ll:mb-[10px] ll:font-AeonikProMedium font-AeonikProRegular">

                            Количество
                            <span className="ml-[5px]">
                                <StarLabel />
                            </span>
                        </p>
                        <div className="flex items-start justify-between ">
                            <input
                                type="text"
                                className={`inputStyle outline-none w-[60px] h-[38px] text-center ${state?.isCheckValid && !state?.quantityNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}   px-3  rounded-lg  font-AeonikProRegular `}
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
                                    type="text"
                                    className=" inputStyle w-[58px] h-[42px] text-center fon border border-borderColor rounded-lg px-[12px]  outline-none"
                                    placeholder=""
                                    value={state?.ageNum}
                                    onChange={(e) => setState({ ...state, ageNum: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-[55%]">
                            <div className="flex items-center  mb-2 ll:mb-[10px]">
                                <label
                                    htmlFor=""
                                    className="flex items-center text-[14px] ll:text-base text-mobileTextColor  ll:font-AeonikProMedium font-AeonikProRegular">

                                    Цена
                                </label>
                                <span className="ml-[5px]">
                                    <StarLabel />
                                </span>
                            </div>
                            <label htmlFor="priceNum" className={`w-full h-[40px] flex items-center ${state?.isCheckValid && !state?.priceNum ? "border border-[#FFB8B8] bg-[#FFF6F6]" : "border border-borderColor bg-white"}  px-3 py-[6px] rounded-lg text-xs`}>
                                <input
                                    type="text"
                                    placeholder="0"
                                    id="priceNum"
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
                    <div className="w-fit flex flex-col items-start">
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
                                            className="inputStyle w-[75%] font-AeonikProMedium outline-none bg-transparent"
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
                <div className="w-full h-fit flex items-center justify-end gap-x-5">
                    {state?.onConcel && <button onClick={cancelSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textRedColor px-3 py-2 font-AeonikProMedium pr-1">
                        Отменить
                    </button>}
                    <button onClick={handleSendDetail} className="w-fit h-fit flex items-end justify-end active:scale-95  active:opacity-70 text-lg text-textBlueColor px-3 py-2 font-AeonikProMedium pr-1">
                        Готово
                    </button>
                </div>
            </div>
        </div>
    );
    return (
        <Popover
            open={toggleShow}
            onOpenChange={handleOpenPopver}
            className={`
            ${dressInfo?.ProductFilterType || typeId ?
                    dressInfo?.ProductFilterType == SelectedNumber || toggle && typeId ?
                        "!bg-textBlueColor text-white" :
                        "text-[#bababa]  border-[#bababa]" :
                    "text-textBlueColor focus:bg-textBlueColor focus:text-white hover:bg-textBlueColor hover:text-white border-textBlueColor"} 
                    group px-[15px] h-[38px]  border-[1.5px] select-none font-AeonikProMedium flex items-center justify-center text-sm cursor-pointer rounded-lg transition duration-300
                    `}
            trigger="click"
            options={["Hide"]}
            placement="bottom"
            content={dressInfo?.ProductFilterType || typeId ? dressInfo?.ProductFilterType == SelectedNumber || toggle && typeId ? contentUnderWear : null : contentUnderWear}
        >
            {
                title?.filter(e => e?.id === SelectedNumber)?.map(item => {
                    return (
                        <span key={item?.id}>{item?.name_ru}</span>
                    )
                })
            }

        </Popover>
    );
}
export default React.memo(UnderAddWear)
