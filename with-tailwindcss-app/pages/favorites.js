import {useContext} from "react"
import AppContext from "../components/library/appcontext"
import Header from "../components/Header"
import InfoCard from "../components/infoCard"



export default function favorites({searchResults}) {


const MyContext = useContext(AppContext)

   


  return (
    <div>
        <Header/>
                <div>favorites</div>
            <h2>list of my saved items</h2>
            <ol>
                {MyContext.contextState.properties.map((item) => (<li key={item.toString()}>{item}</li>))}
                {/* check to see if the real list matches with one of the cards. and display that card. */}
{

searchResults.map(({ img, location, title, description, star, price, total, handleHeart}) => (
    MyContext.contextState.properties.includes(title) &&
        <InfoCard key={img} img={img} location={location} title={title} description={description} star={star} price={price} total={total} handleHeart={handleHeart}/>   
            )
    )
    
    
}
            </ol>
       

    </div>
   
  )
}


export async function getServerSideProps(context) {

    //arrray of objects
        const searchResults = await fetch("https://www.jsonkeeper.com/b/5NPS").then((res) => res.json())
    
        return{
            props:{
                searchResults: searchResults
            }
        }
    }