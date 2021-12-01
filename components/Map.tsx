import React, {useState, useEffect, useRef, MutableRefObject} from 'react'
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import {transform} from 'ol/proj'
import {FullScreen, defaults as defaultControls} from 'ol/control';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import {Icon, Style} from 'ol/style';
import {DragPan, MouseWheelZoom, defaults} from 'ol/interaction';
import {platformModifierKeyOnly} from 'ol/events/condition';

export default function MapComponent(): JSX.Element{

  const [map, setMap] = useState<Map>()
  const mapRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (!mapRef.current) return
    
    const iconFeature = new Feature({
      geometry: new Point([0,0]),
      name: 'Null Island',
      population: 4000,
      rainfall: 500,
    });

    const iconStyle = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: '/marker.png',
        size: [20],
      }),
    });
    
    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });
    
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const map = new Map({
      target: mapRef.current,
      controls: defaultControls().extend([
        new FullScreen({
          source: 'fullscreen',
        }),
      ]),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'http://{a-b}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          }),
        })
      , vectorLayer],
      view: new View({
        center: transform([0,0], 'EPSG:4326', 'EPSG:3857'),
        zoom: 16
      }),
    })
    setMap(map)
  },[])

  return(
    <div id="fullscreen" className="fullscreen">
      <div ref={mapRef} className="ol-map" />
    </div>
  )
}
