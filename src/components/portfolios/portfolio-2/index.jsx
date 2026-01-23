import BreadcrumbArea from '@/src/common/breadcrumb-area';
import Footer from '@/src/layout/footers/footer-3';
import Header from '@/src/layout/headers/header-3';
import PortfolioItemsArea from './portfolio-items-area';

const PortfolioTwo = () => {
    return (
      <>
        <Header />
        <BreadcrumbArea acive_menu="Our Success Stories" title="Explore Projects" />
        <PortfolioItemsArea />
        <Footer tp_border={true} />
      </>
    );
};

export default PortfolioTwo;