import Box from '@mui/material/Box';
import TheoreticalStudy from './TheoreticalStudy';
import RealStudy from './RealStudy';
import GeneralData from '../../components/GeneralData/GeneralData';
import { useDesignerStore } from '../../store/designerStore';
import { useEffect, useState } from 'react';

const Designer = () => {
  const { currentProject } = useDesignerStore();
  const { studyType } = useDesignerStore();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 100);
  }, [currentProject]);

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <div className='flex flex-col gap-8'>
          {show && currentProject && (
            <>
              <GeneralData />
              {studyType === 'theoretical' ? (
                <TheoreticalStudy />
              ) : (
                <RealStudy />
              )}
            </>
          )}
        </div>
      </Box>
    </>
  );
};

export default Designer;
