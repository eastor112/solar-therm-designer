import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProject } from '../../types/locationstypes';
import { getShortName } from '../../utils/textTransformations';
import { formatDate, getRelativeDate } from '../../utils/datesUtils';

interface SavedProjectCardProps {
  selected?: boolean;
  project: IProject;
}

const SavedProjectCard: React.FC<SavedProjectCardProps> = ({
  selected = false,
  project,
}) => {
  const { user, location } = project;
  return (
    <Box
      sx={{
        bgcolor: selected ? '#ddd' : undefined,
        borderRadius: '3px',
        boxShadow: '-1px 1px 5px 1px rgba(0,0,0,0.2)',
        padding: '0.7rem',
        '&:hover': {
          bgcolor: '#eee',
        },
        cursor: 'pointer',
      }}
    >
      <Typography
        variant='subtitle1'
        component='h6'
        sx={{
          fontWeight: 500,
          mb: 1,
        }}
      >
        {project.name}
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
          <Typography component='p'>
            Ciudad: {location ? location.place : 'no definido'}
          </Typography>
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
