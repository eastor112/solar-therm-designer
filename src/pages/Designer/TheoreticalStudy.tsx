import PipelineParams from '../../components/PipelineParams/PipelineParams';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { getLocationsInformation } from '../../redux/locationsSlice';
import DesignerFormTheoretical from '../../components/DesignerForm/DesignerFormTheoretical';
import AnglesDesignerSimplify from '../../components/AnglesDesigner/AngleDesignerSimpify';
import Box from '@mui/material/Box';
import { useGraphVisibility } from '../../hooks/useGraphVisibility';
import { useOutletContexRoot } from '../RootLayout';
import CustomLineChart from '../../components/Graphs/LineChart';
import { capitalize } from '../../utils/textTransformations';
import ResumeTheoretical from '../../components/Resumen/ResumeTheoretical';
import { generalStyles } from '../../styles/general';

const TheoreticalStudy = () => {
  const { locations, date } = useAppSelector(state => state.locations);
  const { city, currentRegister } = useAppSelector(state => state.designer);

  const dispatch = useAppDispatch();
  const { isSidebarOpen } = useOutletContexRoot();
  const showGraph = useGraphVisibility(isSidebarOpen);

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocationsInformation());
    }
  }, [locations]);

  return (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Box
          sx={{
            ...generalStyles.cardLayout,
            width: '280px',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          <PipelineParams />
          <AnglesDesignerSimplify />
          <DesignerFormTheoretical />
        </Box>
        <Box
          sx={{
            ...generalStyles.cardLayout,
            flex: 1,
            gap: 4,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {showGraph && currentRegister.length ? (
            <>
              <CustomLineChart
                data={currentRegister}
                title={'Enegía teórica anual en ' + capitalize(city)}
                columns={['energy']}
                domain={[0, 1]}
                size='medium'
                dataKey='day'
                date={date ? date : undefined}
                units='[KW-h]'
                interval={14}
              />
              <ResumeTheoretical />
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default TheoreticalStudy;
