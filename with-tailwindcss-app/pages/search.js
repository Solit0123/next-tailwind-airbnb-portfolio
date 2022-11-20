import Footer from "../components/Footer"
import Header from "../components/Header"
import { useRouter } from "next/router";
import {format} from "date-fns"
import InfoCard from "../components/infoCard";
import Map from "../components/Map";
import Link from "next/link";

function Search({searchResults}) {

    const router = useRouter();


  // console.log(router.query) it works. the data is being recieved.
   
  //TODO- check if the destructured values are being returned. check for NULL and 
  //return them to the home page or create a 404 page.
const {location, startDate, endDate, noOfGuests} = router.query;


const formattedStartDate = format(new Date(startDate), "dd MMMM yy");
const formattedEndDate = format(new Date(endDate), "dd MMMM yy");
const range = `${formattedStartDate} - ${formattedEndDate}`;


  return (
    <div className="">
        <Header placeholder={`${location} | ${range } | ${noOfGuests} guests`}/>

        <main className="flex ">
            <section className="flex-grow pt-14 px-6 ">
                <p className="text-xs">300+ stays for <b >{range}</b> for <b>{noOfGuests}</b> guests.</p>
                <h1 className="text-3xl font-semibold mt-2 mb-6">Stays in {location}</h1>  
                <div className="hidden lg:inline-flex mb-5 space-x-3 text-gray-800 whitespace-nowrap">
                    <p className="button">Cancellation</p>
                    <p className="button">Type of place</p>
                    <p className="button" >Price</p>
                </div>
                    
                    <div className="">
                        {searchResults.map(({img, location, title, description, star, price, total}) => (
                            // <Link href={"/post/" + title}>   </Link>
                            <InfoCard key={img} img={img} location={location} title={title} description={description} star={star} price={price} total={total} />  
                        ))}
                    </div>

            </section>
            <section className=" hidden xl:inline-flex xl:min-w-[600px]">
                <Map searchResults={searchResults}/>
            </section>
        </main>

        <Footer/>
    </div>
  )
}

export default Search

//async
export async function getServerSideProps(context) {

//arrray of objects
    const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json())

    return{
        props:{
            searchResults: searchResults
        }
    }
}