import { useEffect } from 'react';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getLocationsInformation } from '../../redux/locationsSlice';
import TheoreticalStudy from './TheoreticalStudy';
import Real from './Real';
import GeneralData from '../../components/GeneralData/GeneralData';
import { useDesignerStore } from '../../store/designerStore';

const Designer = () => {
  const { currentProject, locations } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();

  const { studyType } = useDesignerStore();

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocationsInformation());
    }
  }, [locations]);

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <div className='flex flex-col gap-8'>
          {currentProject && (
            <>
              <GeneralData />
              {studyType === 'theoretical' ? <TheoreticalStudy /> : <Real />}
            </>
          )}
        </div>
      </Box>
    </>
  );
};

export default Designer;
