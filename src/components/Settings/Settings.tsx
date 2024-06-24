import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import { FC } from 'react';

interface SettingsProps {
  onClick: () => void;
  label: string;
}

const Settings: FC<SettingsProps> = ({ onClick, label }) => {
  return (
    <Typography
      color='initial'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        mt: 1,
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: 400,
        '&:hover': {
          color: 'primary.main',
          textDecoration: 'underline',
        },
      }}
      onClick={onClick}
    >
      <SettingsIcon sx={{ width: '16px' }} />
      {label}
    </Typography>
  );
};

export default Settings;
