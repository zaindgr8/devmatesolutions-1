import React from 'react';


const about_details_content  = {
    title: <>With experience from top companies</>,

    info_2000_title: <>Founded with <span>Excellence</span></>,

    info_2000: <>DevMate Solutions began its journey with a clear mission: to provide world-class software development services and create digital products that drive real business growth and innovation.</>,

    info_2010_title: <>Scaling <span>Operations</span></>,
    info_2010: <>Over the years, we expanded our team of expert developers and designers, partnering with enterprise clients globally to deliver scalable, secure, and high-performance digital solutions.</>,
    
    info_2018_title: <>Award-Winning <span>Solutions</span></>,
    info_2018: <>Our commitment to quality and cutting-edge design has earned us recognition across the industry, maintaining a standard of excellence that keeps our clients ahead of the competition.</>,


    info_2022_title: <>Pioneering the <span>Future</span></>,
    info_2022: <>Continuing to push the boundaries of technology, we integrate the latest advancements in modern web frameworks and cloud architectures to deliver next-generation software.</>,


}

const {
   title, 
   info_2000_title, 
   info_2000, 
   info_2010_title, 
   info_2010, 
   info_2018_title, 
   info_2018, 
   info_2022_title, 
   info_2022} = about_details_content


const AboutDeatialsArea = () => {
    return (
        <>
            <div className="tp-about-deatials-service theme-bg pt-120 pb-90">
         <div className="container">
            <div className="row">
               <div className="col-xl-6 wow tpfadeUp">
                  <div className="tp-about-sv-content">
                     <h3 className="tp-section__title wow tpfadeUp mb-50">{title}</h3>
                  </div>
                  <div className="tp-ab-sv-tabs mb-30">
                     <ul className="nav nav-pills mb-30" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                           <button tabIndex="-1" className="nav-link active" id="2000" data-bs-toggle="pill" data-bs-target="#pills-2000"
                              type="button" role="tab" aria-controls="pills-2000" aria-selected="true">2000</button>
                        </li>
                        <li className="nav-item" role="presentation">
                           <button tabIndex="-1" className="nav-link" id="2010" data-bs-toggle="pill" data-bs-target="#pills-2010"
                              type="button" role="tab" aria-controls="pills-2010" aria-selected="false">2010</button>
                        </li>
                        <li className="nav-item" role="presentation">
                           <button tabIndex="-1" className="nav-link" id="2018" data-bs-toggle="pill" data-bs-target="#pills-2018"
                              type="button" role="tab" aria-controls="pills-2018" aria-selected="false">2018</button>
                        </li>
                        <li className="nav-item" role="presentation">
                           <button tabIndex="-1" className="nav-link" id="2022" data-bs-toggle="pill" data-bs-target="#pills-2022"
                              type="button" role="tab" aria-controls="pills-2022" aria-selected="false">2022</button>
                        </li>
                     </ul>
                     <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-2000" role="tabpanel" aria-labelledby="2000">
                           <div className="tp-ab-sv-tabs-content">
                              <h3 className="tp-ab-sv-tabs-title">{info_2000_title}</h3>
                              <p>{info_2000}</p>
                           </div>
                        </div>
                        <div className="tab-pane fade" id="pills-2010" role="tabpanel" aria-labelledby="2010">
                           <div className="tp-ab-sv-tabs-content">
                              <h3 className="tp-ab-sv-tabs-title">{info_2010_title}</h3>
                              <p>{info_2010}</p>
                           </div>
                        </div>
                        <div className="tab-pane fade" id="pills-2018" role="tabpanel" aria-labelledby="2018">
                           <div className="tp-ab-sv-tabs-content">
                              <h3 className="tp-ab-sv-tabs-title">{info_2018_title}</h3>
                              <p>{info_2018}</p>
                           </div>
                        </div>
                        <div className="tab-pane fade" id="pills-2022" role="tabpanel" aria-labelledby="2022">
                           <div className="tp-ab-sv-tabs-content">
                              <h3 className="tp-ab-sv-tabs-title">{info_2022_title}</h3>
                              <p>{info_2022}</p> 
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="tp-sv-tabs-btn-wrapper mb-30">
                     <a href="#" className="tp-white-btn">
                        More Services
                        <span className="ml-10">
                           <i className="fal fa-long-arrow-right"></i>
                           <i className="fal fa-long-arrow-right"></i>
                        </span>
                     </a>
                  </div>
               </div>
               <div className="col-xl-6 wow tpfadeUp">
                  <div className="about-sv-img">
                     <img src="/assets/img/services/about-service.jpg" alt="" />
                  </div>
               </div>
            </div>
         </div>
      </div>
        </>
    );
};

export default AboutDeatialsArea;