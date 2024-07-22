import { FC, useEffect, useState } from 'react';
import { reverseGeocode } from '../../services/locationServices';

interface PlaceProjectProps {
  lat: number;
  lon: number;
}

const PlaceProject: FC<PlaceProjectProps> = ({ lat: lat, lon: lon }) => {
  const [place, setPlace] = useState<string>();

  useEffect(() => {
    reverseGeocode(lat, lon).then(placeName => {
      setPlace(placeName.replace('Province of ', ''));
    });
  }, []);

  return (
    <div>
      <h3>{place}</h3>
    </div>
  );
};

export default PlaceProject;
