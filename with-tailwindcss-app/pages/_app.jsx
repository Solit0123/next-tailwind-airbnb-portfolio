import '../styles/globals.css'
import ProgressBar from "@badrap/bar-of-progress"
import 'mapbox-gl/dist/mapbox-gl.css';

import Router from "next/router"
import { SessionProvider } from "next-auth/react"
import AppContext from "../components/library/appcontext"

import {useState } from "react"



const progress = new ProgressBar({
  size: 4,
  color: "#FE595E",
  className: "z-50",
  delay: 100,
});


Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish)



function MyApp({ Component, pageProps: { session, ...pageProps } }) {
 

//create state PROPS for the context.provider
const [contextState, setContextState] = useState({properties: []});
//assign the contextState value to the context app i made




  return (
    <SessionProvider session={session}>
{/* wrap around app provider and pass state via props that i can call with usecontext hook */}

            <AppContext.Provider value={{contextState, setContextState}}>
            <Component {...pageProps} />
            </AppContext.Provider>
        
    </SessionProvider>
)
}

export default MyApp