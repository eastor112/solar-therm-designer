import { SxProps, Theme } from '@mui/material';

export interface StylesMui {
  [key: string]: SxProps<Theme>;
}

export const generalStyles: StylesMui = {
  cardLayout: {
    position: 'relative',
    p: 4,
    background: '#FFF',
    borderRadius: '4px',
  },

  h3: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    mb: 1.5,
    color: '#38383c',
  },
};
