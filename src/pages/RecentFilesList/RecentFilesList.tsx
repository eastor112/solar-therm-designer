import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import { Box } from '@mui/material';

const testData = [
  {
    fileName: 'Modelo 1 - Piura...',
    lastUpdate: '5 de mayo 2023',
  },
  {
    fileName: 'Modelo 2 - Trujillo...',
    lastUpdate: '15 de mayo 2023',
  },
  {
    fileName: 'Modelo 3 - Tacna...',
    lastUpdate: '1 de junio 2023',
  },
  {
    fileName: 'Modelo 4 - Tacna...',
    lastUpdate: '3 de junio 2023',
  },
];

const RecentFilesList = () => {
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
          {testData.map(file => (
            <ListItem
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#ddd',
                },
                p: 0.75,
              }}
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
                primary={file.fileName}
                secondary={file.lastUpdate}
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
