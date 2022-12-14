import Image from "next/image"
import {GlobeAltIcon, MenuIcon, UserCircleIcon, SearchIcon, UsersIcon,} from "@heroicons/react/solid"
import {useState} from "react"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from "next/router";
import {HeartIcon} from "@heroicons/react/outline"
import Link from "next/link"

import LogInOutButton from "./login-btn";



function Header({placeholder}) {




    const [searchInput, setSearchInput] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [noOfGuests, setNoOfGuests] = useState(1)
    const router = useRouter();


    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: "selection",
    }

    //the library passes on these ranges as arguments automaticaly.
const handleSelect = (ranges) => {
  setStartDate(ranges.selection.startDate)
  setEndDate(ranges.selection.endDate)
}

const resetInput = () => {
  setSearchInput("")
}

//router can pass query parameters and the next link cannot
const search = () => {
  router.push({
    pathname: "/search",
    query: {
      location: searchInput,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      noOfGuests,
    }
  })
  // if it doesnt get redirected then it still passes the query , so set state to 0 so it closes after the UI updates..
  setSearchInput("")
  
}


const handleSubmit = () => {
  resetInput();
}


  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-[#ebebeb] shadow-md p-5 md:px-10">
        {/* left */}
        <div onClick={()=> router.push("/")} className="relative flex items-center h-10 cursor-pointer my-auto">

            <Image 
                src="https://www.hourwork.com/wp-content/uploads/2022/01/logo-blue-new.svg"
                layout="fill"
                objectFit="contain"
                objectPosition="left"
            />

        </div>

        {/* middle */}
        <div className="flex items-center md:border-2 rounded-full py-2
               md:shadow-sm          ">

                <input className="flex-grow pl-5 bg-transparent outline-none  text-sm text-gray-600 placeholder-gray-400"  type="text" placeholder={placeholder || "start your search" } 
                value={searchInput} onChange={(e)=> setSearchInput(e.target.value)} />
                
                <SearchIcon className="hidden h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer md:inline-flex md:mx-2" />
               
        </div>

        {/* right */}
        <div className="flex items-center space-x-4 justify-end text-gray-500 ">
            <p className="hidden md:inline cursor-pointer ">Become a host</p>
            <GlobeAltIcon className="h-6 cursor-pointer "/>

            <div className="flex items-center space-x-2 border-2 p-2 rounded-full">
              <MenuIcon className="h-6 cursor-pointer"/>
              <Link href="/favorites"> 
        <HeartIcon  className="h-7 cursor-pointer "/>
        </Link>
             <LogInOutButton/>
            </div>
        </div>
{searchInput && 
      <div className="flex flex-col col-span-3 mx-auto">
        <DateRangePicker 
        ranges={[selectionRange]}
        minDate={new Date()}
        rangeColors={["#fd5b61"]}
        onChange={handleSelect}
       
        />
        <div className="flex items-center border-b mb-4">
          <h2 className="text-2xl flex-grow font-semibold">Number of Guests</h2>
          <UsersIcon className="h-5"/>
          <input  value={noOfGuests} onChange={(e)=> setNoOfGuests(e.target.value)} min={1} className="w-12 pl-2 text-lg outline-none text-red-400" type="number" />
        </div>

        <div className="flex justify-around">
          <button onClick={resetInput} className="text-gray-500">Cancel</button>
          <button onClick={search} className="text-red-400">Search</button>
        </div>
      </div>
}
    </header>
  )
}

export default Header