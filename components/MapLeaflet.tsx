/* eslint-disable @next/next/no-sync-scripts */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {LatLngBoundsExpression, LatLngTuple} from 'leaflet'
import Head from 'next/head'
import { useMediaQuery } from '@chakra-ui/media-query'
import { Text, Button, Icon} from "@chakra-ui/react"
import { SiGooglemaps } from 'react-icons/si'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

console.log("icon", icon)

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function MapLeaflet({latitude, longitude, title} : {latitude: number, longitude: number, title: string}){
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)")
  const cornerTopLeft : LatLngTuple = [latitude + 0.01357, longitude - 0.021292]
  const cornerBottomRight: LatLngTuple = [latitude - 0.010631, longitude + 0.017043]
  const maxBounds : LatLngBoundsExpression = [cornerTopLeft, cornerBottomRight]
  const googleMapsUrl = `http://www.google.com/maps/place/${latitude},${longitude}`
  return(
    <>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.1/dist/leaflet.css" />
        <script
          id="leafletScript"
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossOrigin="">
        </script>
      </Head>
      <MapContainer
        id="map"
        center={[latitude, longitude]}
        zoom={17}
        scrollWheelZoom={false}
        dragging={isLargerThan768}
        maxZoom={18}
        minZoom={12}
        maxBounds={maxBounds}
        maxBoundsViscosity={0.6}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          /* url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" */
          url="https://api.mapbox.com/styles/v1/davidbgomes/ckwny3zzf0lbx15r0vq67y0ok/tiles/512/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGF2aWRiZ29tZXMiLCJhIjoiY2t3bnRpMndhMDd0dDJwcG42cHI5MzV5aCJ9.L8biNYykHHcRIlqC3yZuAQ"
        />
        <Marker
          position={[latitude, longitude]}
        >
          <Popup maxWidth={200}>
            <Text fontStyle="italic" isTruncated>{title}</Text>
            <Button href={googleMapsUrl} size="xs" as="a" backgroundColor="blue.200" leftIcon={<Icon as={SiGooglemaps} />}>Abrir no Google Maps</Button>
          </Popup>
        </Marker>
      </MapContainer>
    </>
  )
}