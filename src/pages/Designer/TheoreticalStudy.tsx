import ZoneInformation from '../../components/ZoneInformation/ZoneInformation';
import PipelineParams from '../../components/PipelineParams/PipelineParams';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import { getLocationsInformation } from '../../redux/locationsSlice';
import ModalChangePlace from '../../components/Modal/ModalChangePlace';
import ModalDatepicker from '../../components/Modal/ModalDatepicker';
import DesignerFormTheoretical from '../../components/DesignerForm/DesignerFormTheoretical';
import AnglesDesignerSimplify from '../../components/AnglesDesigner/AngleDesignerSimpify';
import EditIcon from '@mui/icons-material/Edit';

const TheoreticalStudy = () => {
  const { locations } = useAppSelector(state => state.locations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (locations.length === 0) {
      dispatch(getLocationsInformation());
    }
  }, [locations]);

  return (
    <>
      <div className='flex flex-col gap-8 w-[240px]'>
        <PipelineParams />
        <DesignerFormTheoretical />
        <AnglesDesignerSimplify />
      </div>
    </>
  );
};

export default TheoreticalStudy;
