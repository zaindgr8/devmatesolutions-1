import React, { useState, useEffect } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonial_content = {
  title: "Success Stories",
  bg_img: "/assets/img/testimonial/da-testi-dot.png",
  users: "500",
  social_site: "Feedback",
};

const {title, bg_img , users, social_site}  = testimonial_content

const testimonial_data = [
  {
    id: 1,
    img: "/assets/img/testimonial/1.png",
    name: "Hussain Mousa",
    title: "MEA Director, Finaxe 🇬🇧",
    des: (
      <>
        “Devmate Solutions revamped our Finaxe website with improved design and
        functionality. They were highly professional, delivered on time, and
        exceeded expectations. Highly recommend!”
      </>
    ),
  },
  {
    id: 2,
    img: "/assets/img/testimonial/2.png",
    name: "Iman Bourdouf",
    title: "CEO/ Founder, Art Of Living By Iman 🇫🇷",
    des: (
      <>
        “They took my brand from scratch and completely transformed it—handling
        everything from branding and social media to designing and developing an
        incredible website with stunning interactivity and animations. The
        entire team was cooperative and professional, making the collaboration
        an absolute pleasure. Thank you, Zain Ul Abideen and his amazing team at
        Devmate Solutions!”
      </>
    ),
  },
  {
    id: 3,
    img: "/assets/img/testimonial/3.png",
    name: "Umer Shauket",
    title: "CEO, CRESCO Real Estate 🇦🇪",
    des: (
      <>
        “They delivered an exceptional Next.js website for our real estate
        company, managed our social media, and ran highly effective ad campaigns
        that generated quality leads, resulting in sales. Professional,
        efficient, and results-driven—truly outstanding work!”
      </>
    ),
  },
  {
    id: 4,
    img: "/assets/img/testimonial/5.png",
    name: "Wissam Serdoun",
    title: "Founder, Wissam By Wissam Perfumes | Hedone Access 🇫🇷 🇦🇪",
    des: (
      <>
        “Devmate Solutions handled everything for both of my startups—Hedone
        Access and Wissam by Wissam. From branding and web development to social
        media and ad campaigns, they took care of it all like true professionals
        and helped my brands gain valuable recognition. Truly a seamless
        experience!”
      </>
    ),
  },
  {
    id: 5,
    img: "/assets/img/testimonial/4.png",
    name: "Humood Al Adhari",
    title: "CEO, Alwala Real Estate 🇴🇲",
    des: (
      <>
        “Devmate handled the rebranding of our social media, created our
        website, and continues to work with us. It's been an amazing experience
        collaborating with such a professional team!”
      </>
    ),
  },
  {
    id: 6,
    img: "/assets/img/testimonial/6.png",
    name: "Murtaza Al Omani",
    title: "Executive Search & Talent Acquisition, Okerasyn 🇬🇧",
    des: (
      <>
        “We needed branding for our company along with improvements and new
        functionalities on our website, and Devmate Solutions delivered it all
        perfectly. They exceeded our expectations with their professionalism and
        attention to detail.”
      </>
    ),
  },
  {
    id: 8,
    img: "/assets/img/testimonial/8.png",
    name: "Mohammad Samari",
    title: "CEO, IGP LLC 🇴🇲",
    des: (
      <>
        "Devmate Solutions turned my complex app idea into reality, from Figma
        to React Native with a Node.js backend, deployed on iOS & Android.
        Highly responsive and delivered top-notch results — thanks to Zain Ul
        Abideen and his team!"
      </>
    ),
  },
  {
    id: 7,
    img: "/assets/img/testimonial/7.png",
    name: "Ayaz Momin",
    title: "CEO, Thread & Beams 🇺🇸",
    des: (
      <>
        "I was looking for a 3D website for my architecture company, and Zain
        suggested a 3js website. They delivered it on time with excellent
        communication and cooperation throughout the process. Truly impressed
        with their work!"
      </>
    ),
  },
  {
    id: 9,
    img: "/Magnus.jpg",
    name: "Magnus Rehle",
    title: "Founder & CEO, Revio 🇶🇦",
    des: (
      <>
        "Devmate built a complex, high-security sales CRM for our 180+ sales
        agents. The platform perfectly manages individual client lists with
        strict confidentiality safeguards. Flawless delivery and top-tier data
        protection. Much Recommended for High End Projects."
      </>
    ),
  },
];

// slider setting 
const setting  = {
    slidesPerView: "auto",
    spaceBetween: 30,
    pagination: {
        el: ".da-testi-pagenation",
        clickable: true,
    },
    navigation: {
        nextEl: ".da-testi-button-next",
        prevEl: ".da-testi-button-prev",
    },
}

const Testimonial = () => {
  const [isLoop, setIsLoop] = useState(false);
  useEffect(() => {
    setIsLoop(true);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        /* ── Testimonial Dark Overrides ── */
        .dm-testimonial-section {
          background: #0d0d0d;
          position: relative;
          overflow: hidden;
          padding: 80px 0;
        }

        /* Subtle grid background pattern */
        .dm-testimonial-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

          content: '';
          position: absolute;
          bottom: -150px; left: -150px;
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(192,57,43,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .da-testi-avata {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #1a1a1a;
          box-shadow: 0 12px 36px rgba(0,0,0,0.5);
          position: relative;
          background: #222;
          margin: 0 auto;
        }
        .da-testi-avata img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Testimonial card contents */
        .da-testi__review {
          font-size: 24px;
          font-weight: 500;
          color: #f3f4f6 !important;
          line-height: 1.6;
          font-style: italic;
          letter-spacing: -0.3px;
        }
        @media (max-width: 767px) {
          .da-testi__review { font-size: 18px; }
          .da-testi-avata { margin-bottom: 24px; }
          .da-testi { margin-left: 0 !important; }
        }

        .da-testi__reviewer-name {
          font-size: 19px;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: -0.2px;
        }

        .da-testi__meta span {
          font-size: 13px;
          color: #9ca3af !important;
          font-weight: 600;
          letter-spacing: 0.3px;
        }

        /* Quote mark block */
        .dm-quote-icon {
          font-size: 44px;
          color: rgba(192,57,43,0.15);
          line-height: 1;
          margin-bottom: 10px;
        }

        /* Nav buttons brand override */
        .da-testi-button-prev,
        .da-testi-button-next {
          border-color: #262626;
        }
        .da-testi-button-prev:hover,
        .da-testi-button-next:hover {
          border-color: transparent !important;
        }
        .da-testi-button-prev::after,
        .da-testi-button-next::after {
          background-image: linear-gradient(90deg, #c0392b 0%, #e74c3c 100%) !important;
        }

        .da-testi {
          margin-left: 40px;
        }
      `}</style>

      <div className="dm-testimonial-section wow tpfadeUp" data-wow-delay=".3s">
        <div className="container">
          <div className="row align-items-center">
            
            {/* Header */}
            <div className="col-12">
              <div className="section-title-wraper text-center mb-35">
                <div className="tp-section">
                  <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0">
                    {title}
                  </span>
                  <h2 className="tp-section__title text-white mb-30">
                    Hear from <b className="text-red-700">Our Clients</b>
                  </h2>
                </div>
              </div>
            </div>

            {/* Slider */}
            <div className="col-12 p-relative">
              <Swiper
                {...setting}
                loop={isLoop}
                modules={[Navigation]}
                className="swiper-container da-testi-active"
              >
                {testimonial_data.map((item, i) => (
                  <SwiperSlide key={i}>
                    <div className="row justify-content-center">
                      <div className="col-md-10 col-12">
                        <div className="row align-items-center">
                          <div className="col-12 col-md-3 text-center">
                            <div className="da-testi-avata">
                              <img src={item.img} alt={item.name} />
                            </div>
                          </div>
                          <div className="col-12 col-md-9">
                            <div className="da-testi">
                              <div className="dm-quote-icon">
                                <i className="fas fa-quote-left"></i>
                              </div>
                              <p className="da-testi__review mb-20">
                                {item.des}
                              </p>
                              <div className="da-testi__meta">
                                <h3 className="da-testi__reviewer-name">
                                  {item.name}
                                </h3>
                                <span>{item.title}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation */}
              <div className="da-testi-navigation d-block">
                <div className="da-testi-button-prev">
                  <i className="fal fa-long-arrow-left"></i>
                </div>
                <div className="da-testi-button-next">
                  <i className="fal fa-long-arrow-right"></i>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
