import { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import markIcon from '../../assets/marker.svg';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import Typography from '@mui/material/Typography';

const mark = new L.Icon({
  iconSize: [35, 35],
  iconUrl: markIcon,
});

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
    setCoord({
      lat,
      lng,
    });
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
      </MapContainer>
    </Box>
  );
};

export default MapLeafleat;
