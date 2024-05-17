"use client"
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet'
import Styles from './Map.module.css'

// START: Preserve spaces to avoid auto-sorting
import "leaflet/dist/leaflet.css";

import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";

import "leaflet-defaulticon-compatibility";
// END: Preserve spaces to avoid auto-sorting

function Map({position ,center,children}) {       

    return(
    <>
      <MapContainer className={Styles.map} center={center} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
        <div className={Styles.details}>
            {children}
        </div>
    </>
    )
}

export default Map
