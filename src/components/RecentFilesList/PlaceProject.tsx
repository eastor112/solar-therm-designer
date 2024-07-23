import { FC, useEffect, useState } from 'react';
import { reverseGeocode } from '../../services/locationServices';

interface PlaceProjectProps {
  lat: number;
  lon: number;
}

const PlaceProject: FC<PlaceProjectProps> = ({ lat, lon }) => {
  const [place, setPlace] = useState<string | null>();

  useEffect(() => {
    reverseGeocode(lat, lon).then(placeName => {
      setPlace(placeName);
    });
  }, [lat, lon]);

  return (
    <div>
      <h3>{place}</h3>
    </div>
  );
};

export default PlaceProject;
