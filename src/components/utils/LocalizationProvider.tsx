import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React from 'react';

interface LocalizationProviderProps {
  children: React.ReactNode;
}

const LocalizationProviderWrapper: React.FC<LocalizationProviderProps> = ({
  children,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
};

export default LocalizationProviderWrapper;
