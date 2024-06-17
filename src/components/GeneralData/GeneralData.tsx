import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useDesignerStore } from '../../store/designerStore';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import ModalChangePlace from '../Modal/ModalChangePlace';
import ModalDatepicker from '../Modal/ModalDatepicker';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const GeneralData = () => {
  const { currentProject, studyType, setStudyType } = useDesignerStore();
  const [modalType, setModalType] = useState<'place' | 'date'>('place');

  const [open, setOpen] = useState(false);

  const handleOpen = (value: 'place' | 'date') => {
    setModalType(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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
              Mi proyecto{' '}
              {currentProject?.name ? `- ${currentProject.name}` : ''}
            </Typography>
            <IconButton
              sx={{ width: '20px', height: '20px', color: 'primary.main' }}
              onClick={() => handleOpen('place')}
            >
              <EditIcon sx={{ height: '20px', width: '20px', p: 0, m: 0 }} />
            </IconButton>
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
              Trujillo
            </Typography>
            <Typography
              sx={{
                color: 'gray',
                fontSize: '12px',
              }}
            >
              (Lat: {-7.32453}, Lon:{-71.34534})
            </Typography>
            <IconButton
              sx={{ width: '20px', height: '20px', color: 'primary.main' }}
              onClick={() => handleOpen('place')}
            >
              <EditLocationAltIcon
                sx={{ height: '20px', width: '20px', p: 0, m: 0 }}
              />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
            }}
          >
            <Typography>12 de abril de 2020</Typography>
            <IconButton
              sx={{ width: '20px', height: '20px', color: 'primary.main' }}
              onClick={() => handleOpen('date')}
            >
              <EditCalendarIcon
                sx={{ height: '20px', width: '20px', p: 0, m: 0 }}
              />
            </IconButton>
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
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <>
          {modalType === 'place' && (
            <ModalChangePlace handleClose={handleClose} />
          )}
          {modalType === 'date' && (
            <ModalDatepicker handleClose={handleClose} />
          )}
        </>
      </Modal>
    </>
  );
};

export default GeneralData;
