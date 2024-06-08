import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import PipelineParams from '../../components/PipelineParams/PipelineParams';
import AnglesDesigner from '../../components/AnglesDesigner/AnglesDesigner';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { getLocationsInformation } from '../../redux/locationsSlice';
import ModalChangePlace from '../../components/Modal/ModalChangePlace';
import ModalDatepicker from '../../components/Modal/ModalDatepicker';
import DesignerFormTheoretical from '../../components/DesignerForm/DesignerFormTheoretical';

const Theoretical = () => {
  const { locations } = useAppSelector(state => state.locations);
  const dispatch = useAppDispatch();

  const [modalType, setModalType] = useState<'place' | 'date'>('place');

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocationsInformation());
    }
  }, [locations]);

  const [open, setOpen] = useState(false);
  const handleOpen = (value: 'place' | 'date') => {
    setModalType(value);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className='flex gap-8'>
        <ZoneInformation handleOpen={handleOpen} />
        <PipelineParams />
        <AnglesDesigner />
        <DesignerFormTheoretical />
      </div>

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

export default Theoretical;
