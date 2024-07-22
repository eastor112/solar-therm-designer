import { useRef, useEffect, useState, FC } from 'react';
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
import Leaflet from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { LatLngBoundsLiteral } from 'leaflet';
import { IMapResponse } from '../../types/paramsTypes';
import { reverseGeocode } from '../../services/locationServices';

// https://github.com/Jorl17/open-elevation/blob/master/docs/api.md
// Elevation API

interface ICoords {
  lat: number;
  lon: number;
}

const mark = new Leaflet.Icon({
  iconSize: [35, 35],
  iconUrl: markIcon,
  iconAnchor: [18, 32],
});

const rectangleBounds: LatLngBoundsLiteral = [
  [0.1203, -81.7],
  [-18.5, -68],
];

interface MapLeafleatProps {
  onMarkerClick: (values: IMapResponse) => void;
  initialCoord: ICoords;
}

const MapLeafleat: FC<MapLeafleatProps> = ({
  initialCoord,
  onMarkerClick = () => {},
}) => {
  const mapRef = useRef();
  const [coord, setCoord] = useState<ICoords>(initialCoord);
  const [reversePlace, setReversePlace] = useState<string | null>(null);

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

  useEffect(() => {
    reversePlaceName(coord.lat, coord.lon);
  }, [coord]);

  function handleMouseMove(event: any) {
    const { lat, lng: lon } = event.latlng;
    if (
      lat <= rectangleBounds[0][0] &&
      lat >= rectangleBounds[1][0] &&
      lon >= rectangleBounds[0][1] &&
      lon <= rectangleBounds[1][1]
    ) {
      setCoord({
        lat,
        lon,
      });
      onMarkerClick({ lat, lon, place: reversePlace || '' });
    }
  }

  function MapEvents() {
    useMapEvents({
      click: handleMouseMove,
    });
    return null;
  }

  const reversePlaceName = async (lat: number, lon: number) => {
    const newPlace = await reverseGeocode(lat, lon);

    setReversePlace(newPlace);
    onMarkerClick({ lat, lon, place: newPlace });
  };

  return (
    <Box
      sx={{
        bgcolor: '#ddd6',
      }}
    >
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
          <Marker position={[coord.lat, coord.lon]} icon={mark}>
            <Popup>
              {reversePlace && <Box>{reversePlace}</Box>}
              <Box>{`Latitud: ${coord.lat}`}</Box>
              <Box>{`Longitud: ${coord.lon}`}</Box>
            </Popup>
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
