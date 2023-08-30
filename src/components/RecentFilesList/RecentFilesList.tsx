import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { getRecentFiles, setPreviewProject } from '../../redux/locationsSlice';
import { getRelativeDate } from '../../utils/datesUtils';
import { IProject } from '../../types/locationstypes';

interface RecentFilesListProps {
  handleOpenGlobalModal: (value: string) => void;
}

const RecentFilesList: React.FC<RecentFilesListProps> = ({
  handleOpenGlobalModal,
}) => {
  const dispatch = useAppDispatch();
  const { recentFiles, thereAreChanges } = useAppSelector(
    state => state.locations
  );

  useEffect(() => {
    dispatch(getRecentFiles({ limit: 4, page: 1 }));
  }, [thereAreChanges]);

  const handleOnClick = (project: IProject) => {
    dispatch(setPreviewProject(project));
    handleOpenGlobalModal('file');
  };

  return (
    <Box
      sx={{
        padding: '8px',
      }}
    >
      <Box
        sx={{
          borderRadius: '5px',
          bgcolor: '#f0f0f0',
        }}
      >
        <Typography
          variant='h6'
          sx={{
            fontSize: '14px',
            p: '10px 16px 0px',
          }}
        >
          Archivos recientes
        </Typography>
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            p: 0,
          }}
        >
          {recentFiles?.projects.map((project, i) => (
            <ListItem
              key={i}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#ddd',
                },
                p: 0.75,
              }}
              onClick={() => handleOnClick(project)}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    background: 'none',
                  }}
                >
                  <SnippetFolderIcon
                    sx={{
                      width: 25,
                      height: 25,
                      color: '#777',
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={project.name}
                secondary={getRelativeDate(project.updated_at)}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '12px',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default RecentFilesList;
