import React, { useState, useEffect, useRef } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import Slider from "react-slick";
// import { VideoStoreIcons } from "../../../../../../AssetsMain/icons";

const DetailCarousel = () => {
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

  const [imgGroup] = useState([
    {
      id: 1,
      action: true,
      img: "https://images.uzum.uz/ch15okj57mg9720fq5h0/original.jpg",
    },
    {
      id: 2,
      action: false,
      img: "https://images.uzum.uz/cgcp9n7g49devoab8a50/t_product_240_high.jpg",
    },
    {
      id: 3,
      action: false,
      img: "https://images.uzum.uz/ch15okng49devoaengt0/original.jpg",
    },
    {
      id: 4,
      action: false,
      img: "https://images.uzum.uz/ch15okvhj8j9g69e280g/original.jpg",
    },
    {
      id: 5,
      action: false,
      img: "https://images.uzum.uz/cgcphi7hgiov1qif46p0/original.jpg",
    },
    {
      id: 6,
      action: false,
      img: "https://images.uzum.uz/ch0g2rr57mg9720fmb9g/t_product_240_high.jpg",
    },
    {
      id: 7,
      action: false,
      img: "https://images.uzum.uz/ch0g2rvhj8j9g69dv4v0/original.jpg",
    },
    {
      id: 8,
      action: false,
      img: "https://images.uzum.uz/ch0g2rvhj8j9g69dv4vg/original.jpg",
    },
    {
      id: 9,
      action: false,
      img: "https://images.uzum.uz/cgl7vevhj8j9g69br4e0/original.jpg",
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
  let settings = {
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    dots: false,
    speed: 500,
  };
  let settings1 = {
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },

      {
        breakpoint: 390,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-fit">
      <div className="pb-5 text-tableTextTitle2 text-xl not-italic font-AeonikProMedium flex items-center gap-x-4">
        <div className="h-5 w-[4px] bg-textBlueColor"></div>
        <p>Nike store official Dealer</p>
      </div>
      <section className="w-full flex flex-col flex-wrap h-fit gap-x-[10px]">
        <div className="w-full flex flex-col">
          <div className="w-full flex items-center">
            <Slider
              className="w-full h-full rounded-lg "
              asNavFor={nav2}
              ref={slider1}
              {...settings}
            >
              {imgGroup?.map((data) => {
                return (
                  <article key={data?.id}>
                    <figure className="relative w-full h-[200px] md:h-full overflow-hidden border border-searchBgColor bg-btnBgColor rounded-lg flex items-center justify-center">
                      <img className="h-full md:w-full md:h-fit" src={data?.img} alt="" />
                    </figure>
                  </article>
                );
              })}
            </Slider>
          </div>
          <div className="w-full items-center justify-between mt-1">
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
                    className="!w-fit !h-[70px] md:!w-[72px] md:!h-[96px] cursor-pointer bg-btnBgColor rounded-lg "
                  >
                    <img
                      className="w-fit h-full md:p-0
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
export { DetailCarousel };
