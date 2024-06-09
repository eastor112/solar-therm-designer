import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { getLocationsInformation } from '../../redux/locationsSlice';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import TheoreticalStudy from './TheoreticalStudy';
import Real from './Real';

const Designer = () => {
  const { currentProject, locations } = useAppSelector(
    state => state.locations
  );
  const dispatch = useAppDispatch();

  const [studyType, setStudyType] = useState<'theoretical' | 'real'>(
    'theoretical'
  );

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
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  SOLARTHERM DESIGNER{' '}
                  {currentProject.name ? `- ${currentProject.name}` : ''}
                </Typography>

                <Button
                  variant='contained'
                  startIcon={<ChangeCircleIcon />}
                  onClick={() => {
                    setStudyType(
                      studyType === 'theoretical' ? 'real' : 'theoretical'
                    );
                  }}
                  sx={{ width: 120 }}
                >
                  {studyType == 'theoretical' ? 'Teórico' : 'Real'}
                </Button>
              </Box>
              {studyType === 'theoretical' ? <TheoreticalStudy /> : <Real />}
            </>
          )}
        </div>
      </Box>
    </>
  );
};

export default Designer;
