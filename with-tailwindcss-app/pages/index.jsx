
import Head from "next/head"
import { isTemplateExpression } from "typescript"
import Banner from "../components/Banner"
import Footer from "../components/Footer"
import Header from '../components/Header'
import LargeCard from "../components/LargeCard"
import MediumCard from "../components/MediumCard"
import SmallCard from "../components/SmallCard"

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation,Autoplay } from "swiper";



function Home({exploreData, cardsData}) {
  return (
    <>
        <Head>
            <title>PAPA Airbnb</title>
        </Head>
    
        
        <Header/>
        <Banner/>
        {/* Main section */}
        <main className="max-w-7xl mx-auto px-8 sm:px-16 ">
            <section className="pt-6">
                <h2 className="text-4xl font-semibold pb-5 ">Explore Nearby</h2>

                {/* PULL DATA FROM SERVER (static -caches) or serverside rendering.*/}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {exploreData?.map(({img, distance, location}) => (
                        <SmallCard key={img} img={img} distance={distance} location={location}/>
                    ))}
                </div>

            </section>


            <section>
                <h2 className="text-4xl font-semibold py-8">Live anywhere</h2>
                <div className="
                 p-3 -ml-3 ">

            <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            loopFillGroupWithBlank={false}
            pagination={{
            clickable: true,
            }}
            navigation={true}
            modules={[Autoplay,Pagination, Navigation]}
            autoplay={{
                delay: 2000,
                disableOnInteraction: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  slidesPerGroup: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                  spaceBetween: 30,
                },
              }}
            className="mySwiper"
            >
                        {cardsData?.map(item => (
                       <SwiperSlide  ><MediumCard  key={isTemplateExpression.img} img={item.img} title={item.title}/></SwiperSlide>   
                        ))}

            </Swiper>   

                </div>
            </section>

            

            <LargeCard img="https://links.papareact.com/4cj"
                        title="The gratest outdoors"
                        buttonText="Get Inspired"/>
        </main>


        <Footer/>
    </>
  )
}

export default Home


export async function getStaticProps(){

    const exploreData = await fetch("https://www.jsonkeeper.com/b/4G1G").then(res => res.json());
   

    const cardsData = await fetch("https://www.jsonkeeper.com/b/VHHT").then(res => res.json())

return{
    props: {
        exploreData, 
        cardsData
    },
};
}