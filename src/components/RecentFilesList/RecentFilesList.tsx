import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { getRelativeDate } from '../../utils/datesUtils';
import { ModalType } from '../Modal/getModalSelector';
import { useDesignerStore } from '../../store/designerStore';
import { INewProject } from '../../types/projects';
import PlaceProject from './PlaceProject';

interface RecentFilesListProps {
  handleOpenGlobalModal: (value: ModalType) => void;
}

const RecentFilesList: React.FC<RecentFilesListProps> = ({
  handleOpenGlobalModal,
}) => {
  const { setPreviewProject, recentFiles, currentProject, getRecentFiles } =
    useDesignerStore();

  useEffect(() => {
    getRecentFiles({ limit: 4, page: 1 });
  }, [currentProject]);

  const handleOnClick = (project: INewProject) => {
    setPreviewProject(project);
    handleOpenGlobalModal(ModalType.FILE);
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
                      color:
                        project.id === currentProject?.id ? 'green' : '#777',
                    }}
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box>
                    {project.name_project}

                    <PlaceProject
                      lat={project.latitud}
                      lon={project.longitud}
                    />
                  </Box>
                }
                secondary={getRelativeDate(project.updated_at)}
                primaryTypographyProps={{
                  sx: {
                    fontSize: '14px',
                    color: project.id === currentProject?.id ? 'green' : '#777',
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    fontSize: '12px',
                    color: project.id === currentProject?.id ? 'green' : '#777',
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
