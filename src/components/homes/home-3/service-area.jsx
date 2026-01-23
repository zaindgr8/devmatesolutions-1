import React from "react";
import { FaRegCircleCheck } from "react-icons/fa6";



// service_data
const service_data = [
  {
    id: 1,
    counter: "01",
    title: <>AI Voice Agents</>,
    des: (
      <>
        Automate calls with intelligent, 24/7 AI that delivers seamless,
        human-like interactions for enhanced customer service.
      </>
    ),
    delay: ".4s",
    list_item: [
      "24/7 Customer Care",
      "Cost Efficient",
      "Inbound & Outbound Lead Generation",
      "Appointments & Bookings",
    ],
  },
  {
    id: 2,
    counter: "02",
    title: (
      <>
        {" "}
        AI Smart Chatbots <br />
      </>
    ),
    des: (
      <>
        Instant, AI-powered support that engages customers 24/7 with accurate,
        automated responses.
      </>
    ),
    delay: ".5s",
    list_item: [
      "Instant Responses",
      "Human Like Conversation",
      "24/7 Lead Generation",
      "70% Increased Engagement",
    ],
  },
  {
    id: 3,
    counter: "03",
    title: <>Custom AI Agents</>,
    des: (
      <>
        Personalized AI Agents tailored to your business requirements,
        delivering seamless automation and enhanced functionalities.
      </>
    ),
    delay: ".5s",
    list_item: [
      "Tailored to Your Needs",
      "Scalable Solutions",
      "Cost-Effective",
      "Boost Efficiency",
    ],
  },
];



const ServiceArea = () => {
  return (
    <>
      <div className="pt-20 pb-30">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title-wraper text-center mb-60">
                <div className="tp-section">
                  <span className="tp-section__subtitle mb-15 shadow-none text-grey p-0 wow tpfadeUp ">
                    Your Partner in AI Transformation
                  </span>
                  <h2
                    className="tp-section__title mb-30 wow tpfadeUp"
                    data-wow-delay=".3s"
                  >
                    <b className="">10x Your Business with AI!</b>
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {service_data.map((item, i) => (
              <div key={i} className="col-xl-4 col-lg-6">
                <div
                  className="da-service pr-30 pl-30 mb-30 wow tpfadeUp"
                  data-wow-delay=".4s"
                >
                  <div className="d-flex justify-content-between align-items-center mb-15">
                    <h3 className="da-service__title ">{item.title}</h3>
                    <div className="da-service__counter">{item.counter}</div>
                  </div>

                  <div className="da-service__list-box white-bg">
                    <p>{item.des}</p>
                    <ul>
                      {item.list_item.map((list, i) => (
                        <li key={i}>
                          {list}
                          <span>
                            <FaRegCircleCheck className="text-red-700" />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceArea;
