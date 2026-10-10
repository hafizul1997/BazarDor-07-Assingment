
import HeroSection from './components/HeroSection';
import PriceUp from './components/Priceup';

const HomePage = () => {
  return (
    <div>
      <div>   
          <HeroSection />
      </div>
       <div>
           
           <PriceUp />
       </div>

       <div>
           <h1>আজ দাম কমেছে</h1>
       </div>
          <div>
                <h1>সব পণ্য</h1>
          </div>
    </div>
  );
};

export default HomePage;