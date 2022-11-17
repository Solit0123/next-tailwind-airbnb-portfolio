
import MapQL,{Marker, Popup} from "react-map-gl";
import {useState} from "react"
import getCenter from "geolib/es/getCenter";



function Map({searchResults}) {

    const[selectedLocation, setSelectedLocation] = useState({});
   // const [showPopup, setShowPopup] = useState(true);

  //get the searchResults obj into a clean longitude, and longitude object, so that we can center our map 
//thats thanks to the geolib librarry.
  const coordinates= searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitud,
    zoom: 11,
  })

  return (
    // the reason this was a pain is because of the naming conventions. the version of 
    //the npm library mapboxAccess not mapboxApiAccess. 
    //onMove is the new prop name not onViewportChange
    //predicated.
        <MapQL
         mapStyle="mapbox://styles/solit0123/clak745er000215pltnaal9fh"
          mapboxAccessToken={process.env.mapbox_key}
         initialViewState={viewport}
         style={{width: "100%", height: "100%"}}
          onMove={evt => setViewport(evt.viewState)}
        >
            {searchResults.map((result)=> (
                <div>
                
                    <Marker 
                    key={result.long} 
                    longitude={result.long} 
                    latitude={result.lat} 
                    anchor="bottom" 
                    offsetLeft={-20}
                    offsetTop={-10}>

                      

                    <p role="image" onClick={()=> setSelectedLocation(result)} className="cursor-pointer text-2xl animate-bounce" aria-label="push-pin">📌</p>
                       
                    </Marker>
                    {selectedLocation.long === result.long ?
                        <Popup
                            longitude={result.long} 
                            latitude={result.lat}
                            anchor="bottom"
                              onClose={()=> setSelectedLocation({})} 
                             closeOnClick={true} 
                             className="bg-white rounded-lg p-3"
                        >

                             <p>{result.title}</p>
                        </Popup> 
                    : false
                        }

                 </div>
            ))}


            
        </MapQL>
      
    
    
  );
}

export default Map