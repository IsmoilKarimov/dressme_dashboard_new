import React, { useState, useEffect, useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
import { MenuCloseIcons, StarLabel } from "../../../../../../assets/icons";
import { img1, img2, img3, img4 } from "../../../../../../assets";

const ProductCarouselEdit = () => {
  const [screenSize, setScreenSize] = useState(getCurrentDimension());

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
    };
  }
  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const [modalOfCarsouel, setModalOfCarsouel] = useState(false)
  const handleClickCarosuel = (id) => {
    console.log("handleClickCarosuel", id);
    setModalOfCarsouel(true)
  }

  const [imgGroup] = useState([
    {
      id: 1,
      action: true,
      img: img4,
    },
    {
      id: 2,
      action: false,
      img: img2,
    },
    {
      id: 3,
      action: false,
      img: img3,
    },
    {
      id: 4,
      action: false,
      img: img1,
    },
  ]);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-10  right-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
        onClick={onClick}
      >
        <button className="next">
          <GrFormNext size={20} />
        </button>
      </main>
    );
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`absolute text-center cursor-pointer no-underline opacity-50 w-8 h-8 flex items-center justify-center top-[50%] z-10  left-[20px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
        onClick={onClick}
      >
        <button className="prev">
          <GrFormPrevious size={20} />
        </button>
      </main>
    );
  };
  const NextArrowModal = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`absolute text-center cursor-pointer no-underline opacity-70 w-[44px] h-[44px] flex items-center justify-center top-[50%] z-10  right-[-70px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
        onClick={onClick}
      >
        <button className="next">
          <GrFormNext size={20} />
        </button>
      </main>
    );
  };

  const PrevArrowModal = (props) => {
    const { onClick } = props;
    return (
      <main
        className={`absolute text-center cursor-pointer no-underline opacity-70 w-[44px] h-[44px] flex items-center justify-center top-[50%] z-10  left-[-70px] rounded-full bg-bgColor duration-200 border  border-searchBgColor  `}
        onClick={onClick}
      >
        <button className="prev">
          <GrFormPrevious size={20} />
        </button>
      </main>
    );
  };
  let settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    dots: false,
    speed: 500,
  };
  let settingsModal = {
    nextArrow: <NextArrowModal />,
    prevArrow: <PrevArrowModal />,
    infinite: true,
    dots: false,
    speed: 500,
  };
  let settings1 = {
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 390,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const ref = useRef(null);

  const handleNextSlide = () => {
    ref.current.slickNext();
  };

  const handlePrevSlide = () => {
    ref.current.slickPrev();
  };
  return (
    <div className="max-w-[350px] w-full h-fit ">

      {/*------------------------- Modal Carosuel------------------------------------ */}
      {/* Open Clothing Types Bottom Mobile Modal Animation Section */}
      <div>
        <section
          onClick={() => setModalOfCarsouel(false)}
          className={`fixed inset-0 z-[200] duration-200 w-full h-[100vh] bg-black opacity-60 ${modalOfCarsouel ? "" : "hidden"
            }`}
        ></section>
        <section
          className={`fixed z-[201] rounded-lg bg-white   w-fit h-fit m-auto cursor-pointer flex flex-col items-center justify-center inset-0  ${modalOfCarsouel ? "" : "hidden"
            }`}
        >
          <button
            onClick={() => setModalOfCarsouel(false)}
            className="absolute top-0  z-[116] right-[-80px]  flex items-center justify-center w-[50px] h-[50px] rounded-full bg-[#808080]">
            <MenuCloseIcons colors="#fff" />
          </button>
          <div>
            <Slider
              className="w-[670px] h-[80vh] bg-white rounded-lg mt-[-4px] p-0 m-0 "
              asNavFor={nav2}
              ref={slider1}
              {...settingsModal}
            >
              {imgGroup?.map((data) => {
                return (

                  <img
                    key={data?.id}
                    className="w-[670px] h-[80vh] object-top	object-cover cursor-pointer"
                    src={data?.img}
                    alt=""
                  />
                );
              })}
            </Slider>
          </div>
          <div className="w-full flex items-center justify-between px-5 py-[15px]">
            <button className="text-weatherWinterColor text-lg not-italic font-AeonikProMedium">Изменить фото</button>
            <button className="text-[#D50000] text-lg not-italic font-AeonikProMedium">Удалить</button>
          </div>

        </section>

      </div>
      {/*------------------------- Modal Carosuel------------------------------------ */}

      <div className="flex items-center justify-between">
        <div className="flex items-center text-[13px] md:text-base font-AeonikProRegular">
          <p>Фото</p>
          <span className="ml-[5px]">
            <StarLabel />
          </span>
        </div>

      </div>
      <section className="w-full flex flex-col flex-wrap h-[377px] gap-x-[10px]">
        <div className="w-full h-full flex flex-col">
          <div className="w-full h-full flex items-center">
            <Slider
              className="w-full h-full rounded-lg "
              asNavFor={nav2}
              ref={slider1}
              {...settings}
            >
              {imgGroup?.map((data) => {
                return (
                  <article key={data?.id} onClick={() => handleClickCarosuel(data?.id)}>
                    <img
                      className="w-[350px] h-[377px] object-top	object-cover cursor-pointer"
                      src={data?.img}
                      alt=""
                    />
                  </article>
                );
              })}
            </Slider>
          </div>
          <div className="w-full items-center justify-between mt-[10px] ">
            <Slider
              asNavFor={nav1}
              ref={slider2}
              // slidesToShow={5}
              swipeToSlide={true}
              focusOnSelect={true}
              vertical={false}
              {...settings1}
              className="flex items-center justify-between flex-row flex-wrap pt-0 rounded-lg"
            >
              {imgGroup?.map((data) => {
                return (
                  <figure
                    key={data?.id}
                    className="!w-[95%] !h-[70px] md:!w-[95%] md:!h-[96px] cursor-pointer bg-btnBgColor rounded-lg "
                  >
                    <img
                      className="w-fit h-full md:p-0 object-top	object-cover
                       md:w-full md:h-full flex items-center justify-center border border-searchBgColor rounded-lg"
                      src={data?.img}
                      alt=""
                    />
                  </figure>
                );
              })}
            </Slider>
          </div>
        </div>
      </section>
    </div>
  );
};
export { ProductCarouselEdit };
