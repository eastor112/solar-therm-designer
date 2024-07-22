import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useDesignerStore } from '../../store/designerStore';
import Modal from '@mui/material/Modal';
import ModalDatepicker from '../Modal/ModalDatepicker';
import { useState } from 'react';
import ModalGeneralParams from '../Modal/Params/ModalGeneralParams';
import SettingsIcon from '@mui/icons-material/Settings';
import dayjs from '../../utils/datesUtils';
import { defaultPlaces } from '../PlaceSelector/helper';

const GeneralData = () => {
  const {
    studyType,
    setStudyType,
    name_project,
    date,
    t_amb,
    v_viento,
    latitud,
    longitud,
    place,
  } = useDesignerStore();
  const [modalType, setModalType] = useState<'place' | 'date' | 'update'>(
    'place'
  );
  const [openModal, setOpenModal] = useState(false);
  const customPlace = localStorage.getItem('customPlace');

  const handleOpen = (value: 'place' | 'date' | 'update') => {
    setModalType(value);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const selectedPlace = defaultPlaces.find(dPlace => dPlace.id === place);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Typography
              sx={{
                fontSize: '2rem',
                fontWeight: 'bold',
              }}
            >
              {name_project}
            </Typography>
            <Box
              sx={{
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              onClick={() => handleOpen('update')}
            >
              <SettingsIcon sx={{ width: '16px' }} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Typography
              sx={{
                color: 'green',
              }}
            >
              {customPlace || selectedPlace?.place || 'Trujillo'}
            </Typography>
            <Typography sx={{ color: '#555' }} variant='caption'>
              (Lat: {latitud}, Lon:{longitud})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: '4px' }}>
            <Box sx={{ display: 'flex', gap: '15px' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    color: '#555',
                  }}
                >
                  T. ambiente: {t_amb} °C
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '3px',
                }}
              >
                <Typography
                  variant='caption'
                  sx={{
                    display: 'flex',
                    gap: '4px',
                    alignItems: 'center',
                    color: '#555',
                  }}
                >
                  V. viento: {v_viento} m/s
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            {date ? (
              <Typography>
                {dayjs(date).format('D [de] MMMM [de] YYYY')}
              </Typography>
            ) : (
              <Typography sx={{ color: 'red', fontSize: '14px' }}>
                Sin fecha
              </Typography>
            )}
          </Box>
        </Box>

        <Button
          variant='contained'
          startIcon={<ChangeCircleIcon />}
          onClick={() => {
            setStudyType(studyType === 'theoretical' ? 'real' : 'theoretical');
          }}
          sx={{ width: 120 }}
        >
          {studyType == 'theoretical' ? 'Teórico' : 'Real'}
        </Button>
      </Box>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          {modalType === 'date' && (
            <ModalDatepicker handleClose={handleClose} />
          )}
          {modalType === 'update' && (
            <ModalGeneralParams handleClose={handleClose} />
          )}
        </>
      </Modal>
    </>
  );
};

export default GeneralData;
