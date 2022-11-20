import Image from "next/image"
import {HeartIcon} from "@heroicons/react/outline"
import {StarIcon} from "@heroicons/react/solid"
import { useRouter } from 'next/router'
import {useState, useContext} from "react"
import AppContext from "../components/library/appcontext"

function InfoCard({ img, location, title, description, star, price, total}) {

    //display delete fav icon when its the favorites page only.
    const router = useRouter();
    const favoritePage = router.asPath == "/favorites" ? true : false

const myContext = useContext(AppContext)

    async function deleteFav (title){
       const propertyList =  myContext.contextState.properties;
      // const newList = propertyList.filter(myContext.contextState.properties.title != title)
      console.log("im tryna delete somethhing")
      myContext.setContextState({properties: [...myContext.contextState.properties.filter(i => i != title)]})
    }

    
    async function handleHeart (title) {
    //this should detect which card is being clicked on.
      //  myContext.setContextState(myContext.setContextState.properties.push({propertyName: title}))
        // myContext.setContextState([...myContext.contextState.properties, title])
         myContext.setContextState({properties: [...myContext.contextState.properties, title]})
        console.log("handle heart has been updated")
        console.log(myContext.contextState)
    
    }

const [handleClick,setHandleClick] = useState(false);

    async function handleClickHeart(title){

setHandleClick(!handleClick);
// if its on, delete.
if (handleClick){
    const propertyList =  myContext.contextState.properties;
    // const newList = propertyList.filter(myContext.contextState.properties.title != title)
    console.log("im tryna delete somethhing")
    myContext.setContextState({properties: [...myContext.contextState.properties.filter(i => i != title)]})
}
if(!handleClick){
    myContext.setContextState({properties: [...myContext.contextState.properties, title]})
    console.log("handle heart has been updated")
    console.log(myContext.contextState)
}
//if its off, add to fav.



    }
    
    

  return (
    <div className="flex my-10  py-6 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg pr-4 transition duration-200 ease-out first:border-t ">


        <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
            <Image 
            src={img}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"/>
        </div>

            {/* right section of the card */}
        <div className="flex flex-col flex-grow pl-5">
            <div className="flex justify-between"> {/* the top section with a heart */}
            <p>{location}</p>
            {/* if this title matches on the context api then display red. */}
            {myContext.contextState.properties.find(i => i == title) ? 
            <HeartIcon  onClick={(e) => handleClickHeart(title)} className="h-7 cursor-pointer fill-[red] text-[red]  hover:scale-105"/> :
             <HeartIcon  onClick={(e) => handleClickHeart(title)} className="h-7 cursor-pointer  text-black  hover:text-[red]"/> }
            
          {favoritePage &&  <button onClick={(e) => deleteFav(title)}>Delete from favorites</button>}
          

            </div>

            <h4 className="text-xl">{title}</h4>
            <div className="border-b w-10 pt-2"/>
            <p className="pt-2 text-sm text-gray-500 flex-grow">{description}</p>

            <div className="flex justify-between items-end pt-5"> {/* star and pricing */}
                <p className="flex items-center">
                    <StarIcon className="h-5 text-red-400 "/>
                    {star}
                </p>

                <div className="flex flex-col">
                    <p className="text-lg font-semibold pb-2 lg:text-2xl">{price}</p>
                    <p className="text-right font-extralight">{total}</p>
                </div>

            </div>
        
        </div>


    </div>
  )
}

export default InfoCard