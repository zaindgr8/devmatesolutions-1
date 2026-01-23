import React, { useState, useEffect } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const gallery_one = [
  "/assets/img/gallery/mp-gl-1.jpg",
  "/assets/img/gallery/mp-gl-2.jpg",
  "/assets/img/gallery/mp-gl-3.jpg",
  "/assets/img/gallery/mp-gl-4.jpg",
  "/assets/img/gallery/mp-gl-5.jpg",
  "/assets/img/gallery/mp-gl-6.jpg",
];

const gallery_two = [
  "/assets/img/companies/1.png",
  "/assets/img/companies/2.png",
  "/assets/img/companies/3.png",
  "/assets/img/companies/4.png",
  "/assets/img/companies/5.png",
  "/assets/img/companies/6.png",
  "/assets/img/companies/7.png",
  "/assets/img/companies/8.png",
  "/assets/img/companies/9.png",
  "/assets/img/companies/10.png",
];

const setting_1 = {
  spaceBetween: 20, // Reduced space between images
  speed: 6000,
  slidesPerView: 5, // Display 5 images in one frame
  allowTouchMove: false,
};

const setting_2 = {
  spaceBetween: 20, // Reduced space between images
  speed: 6000,
  slidesPerView: 5, // Display 5 images in one frame
  allowTouchMove: false,
  centeredSlides: true,
  centeredSlidesBounds: true,
};

const GallerySlider = () => {
  const [isLoop, setIsLoop] = useState(false);
  useEffect(() => {
    setIsLoop(true);
  }, []);

  return (
    <>
      <div className="tp-mp-sw-slider">
        {/* <div className="container-fluid gx-0">
          <Swiper
            {...setting_1}
            loop={isLoop}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: false,
            }}
            modules={[Autoplay]}
            className="swiper-container tp-gl-silder"
          >
            {gallery_one.map((item, i) => (
              <SwiperSlide key={i} className="tp-mp-slider-item">
                <img
                  src={item}
                  alt=""
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
        <div className="row">
          <div className="col-12">
            <div className="section-title-wraper text-center mt-50 mb-10">
              <div className="tp-section">
                <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0 wow tpfadeUp">
                  Proudly Delivering Innovative Software Solutions to These
                  Esteemed Brands
                </span>
                <h2 className="tp-section__title mb-30 wow tpfadeUp">
                  Trusted by
                  <b className="text-red-700"> Industry Leaders</b>
                </h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <Swiper
            {...setting_2}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              reverseDirection: true,
            }}
            modules={[Autoplay]}
            className="swiper-container tp-gl-silder-2"
          >
            {gallery_two.map((item, i) => (
              <SwiperSlide key={i} className="tp-mp-slider-item">
                <img
                  src={item}
                  alt=""
                  style={{ width: "50%", height: "auto", objectFit: "cover" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default GallerySlider;
