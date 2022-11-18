import '../styles/globals.css'
import ProgressBar from "@badrap/bar-of-progress"
import 'mapbox-gl/dist/mapbox-gl.css';

import Router from "next/router"
import { SessionProvider } from "next-auth/react"
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


  return (
    <SessionProvider session={session}>
         <Component {...pageProps} />
    </SessionProvider>
)
}

export default MyApp
