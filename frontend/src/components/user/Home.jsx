import HeroSection from "./HeroSection";
import StatsBanner from "./StatsBanner";
import WhyChooseUs from "./WhyChooseUs";
import PopularCourses from "./PopularCourses";

const Home = ()=>{
     return (
            <div className="bg-[#242424] pt-5">
                <HeroSection/>
                <StatsBanner/>
                <WhyChooseUs/>
                <PopularCourses/>
           </div>
     )
}

export default Home;