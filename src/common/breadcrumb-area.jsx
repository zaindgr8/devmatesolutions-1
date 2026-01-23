import Link from 'next/link';
import React from 'react';

const BreadcrumbArea = ({acive_menu = "About", title = "Our Company Histoy"}) => {
    return (
        <>
             <div className="breadcrumb__area bg-black  pt-120 pb-120" 
             >
         <div className="container">
            <div className="row">
               <div className="col-xxl-12">
                  <div className="breadcrumb__content p-relative z-index-1">
                     <div className="breadcrumb__list mb-10">
                        <span><Link href="/">DEVMATE</Link></span>
                        <span className="dvdr dvdr-line"></span>
                        <span className="tp-bc-acive-menu">{acive_menu}</span>
                     </div>
                     <h3 className="breadcrumb__title text-white">{title}</h3>
                  </div>
               </div>
            </div>
         </div>
      </div>
        </>
    );
};

export default BreadcrumbArea;