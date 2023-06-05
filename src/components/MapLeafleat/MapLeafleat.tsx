import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  Rectangle,
} from 'react-leaflet';
import markIcon from '../../assets/marker.svg';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Typography from '@mui/material/Typography';
import { LatLngBoundsLiteral } from 'leaflet';

const mark = new L.Icon({
  iconSize: [35, 35],
  iconUrl: markIcon,
  iconAnchor: [18, 32],
});

const rectangleBounds: LatLngBoundsLiteral = [
  [0.1203, -81.7],
  [-18.5, -68],
];

const MapLeafleat = () => {
  const mapRef = useRef();
  const [coord, setCoord] = useState({
    lat: -8.11599,
    lng: -79.02998,
  });

  useEffect(() => {
    const map: any = mapRef.current;
    if (map) {
      map.on('click', handleMouseMove);
    }
    return () => {
      if (map) {
        map.off('click', handleMouseMove);
      }
    };
  }, []);

  function handleMouseMove(event: any) {
    const { lat, lng } = event.latlng;
    if (
      lat <= rectangleBounds[0][0] &&
      lat >= rectangleBounds[1][0] &&
      lng >= rectangleBounds[0][1] &&
      lng <= rectangleBounds[1][1]
    ) {
      setCoord({
        lat,
        lng,
      });
    }
  }

  function MapEvents() {
    useMapEvents({
      click: handleMouseMove,
    });
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: '#ddd6',
      }}
    >
      <Box>
        <Typography>Latitud: {coord.lat}</Typography>
        <Typography>Longitud: {coord.lng}</Typography>
      </Box>
      <MapContainer
        center={[-8.11599, -79.02998]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerClusterGroup>
          <Marker position={[coord.lat, coord.lng]} icon={mark}>
            <Popup>Trujillo</Popup>
          </Marker>
          <Marker position={[-8.11599, -70.02998]} icon={mark}>
            <Popup>Trujillo</Popup>
          </Marker>
          <Marker position={[-5.11599, -70.02998]} icon={mark}>
            <Popup>Trujillo</Popup>
          </Marker>
        </MarkerClusterGroup>
        <MapEvents />
        <Rectangle
          bounds={rectangleBounds}
          color='#7ee173'
          fillOpacity={0.05}
          stroke
        />
      </MapContainer>
    </Box>
  );
};

export default MapLeafleat;
