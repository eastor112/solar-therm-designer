import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getShortName } from '../../utils/textTransformations';
import { formatDate, getRelativeDate } from '../../utils/datesUtils';
import { INewProject } from '../../types/projects';
import { useEffect, useState } from 'react';
import { reverseGeocode } from '../../services/locationServices';

interface SavedProjectCardProps {
  selected?: boolean;
  project: INewProject;
  onClick: (project: INewProject) => void;
}

const SavedProjectCard: React.FC<SavedProjectCardProps> = ({
  selected = false,
  project,
  onClick,
}) => {
  const { user, latitud, longitud } = project;
  const [place, setPlace] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      reverseGeocode(latitud, longitud).then(res => {
        setPlace(res);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        bgcolor: selected ? '#556cd655' : undefined,
        borderRadius: '3px',
        boxShadow: '-1px 1px 5px 1px rgba(0,0,0,0.2)',
        padding: '0.7rem',
        '&:hover': {
          bgcolor: selected ? undefined : '#eee',
        },
        cursor: 'pointer',
      }}
      onClick={() => onClick(project)}
    >
      <Typography
        variant='subtitle1'
        component='h6'
        sx={{
          fontWeight: 500,
          mb: 1,
        }}
      >
        {project.name_project || '<Sin nombre>'}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
        }}
      >
        <Box>
          <Typography component='p'>
            Autor: {getShortName(user.first_name, user.last_name)}
          </Typography>
          <Typography component='p'>
            Creado: {formatDate(project.created_at)}
          </Typography>
        </Box>
        <Box>
          <Typography component='p'>Ciudad: {place}</Typography>
          <Typography component='p'>
            Actualizado: {getRelativeDate(project.updated_at)}
          </Typography>
        </Box>
        <Box
          sx={{
            textAlign: 'right',
            flex: 1,
          }}
        >
          {/* <Button variant='contained'>Abrir</Button> */}
        </Box>
      </Box>
    </Box>
  );
};

export default SavedProjectCard;
