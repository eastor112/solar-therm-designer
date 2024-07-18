import Box from '@mui/material/Box';
import TheoreticalStudy from './TheoreticalStudy';
import RealStudy from './RealStudy';
import GeneralData from '../../components/GeneralData/GeneralData';
import { useDesignerStore } from '../../store/designerStore';

const Designer = () => {
  const { currentProject } = useDesignerStore();
  const { studyType } = useDesignerStore();

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <div className='flex flex-col gap-8'>
          {currentProject && (
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
