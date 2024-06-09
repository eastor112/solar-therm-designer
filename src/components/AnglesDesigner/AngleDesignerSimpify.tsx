import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { generalStyles } from '../../styles/general/index';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks/reduxHooks';
import { setAzimuth, setInclination } from '../../redux/designerSlice';
import TextField from '@mui/material/TextField';
import { FocusEvent } from 'react';

const AnglesDesignerSimplify = () => {
  const dispatch = useDispatch();
  const { azimuth, inclination } = useAppSelector(state => state.designer);

  const selectOnFocus = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    event.target.select();
  };

  return (
    <Box>
      <Typography variant='h3' sx={generalStyles.h3}>
        Ángulos
      </Typography>
      <Box
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          type='number'
          size='small'
          id='inclination'
          label='Inclinación'
          variant='outlined'
          name='inclination'
          value={inclination}
          onChange={val => {
            dispatch(setInclination(+val.target.value));
          }}
          onFocus={selectOnFocus}
        />

        <TextField
          type='number'
          size='small'
          id='azimuth'
          label='Azimuth'
          variant='outlined'
          name='azimuth'
          value={azimuth}
          onChange={val => {
            dispatch(setAzimuth(+val.target.value));
          }}
          onFocus={selectOnFocus}
        />
      </Box>
    </Box>
  );
};

export default AnglesDesignerSimplify;
