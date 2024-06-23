import { FC } from 'react';
import Select, { SelectProps } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { SxProps, Theme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

const selectStyle: SxProps<Theme> = {
  width: '100%',
  '& .MuiSelect-icon': {
    display: 'none',
  },
};

type Option = {
  value: string;
  label: string;
};

type CustomSelectProps = Omit<SelectProps, 'onChange'> & {
  tooltipText?: string;
  options: Option[];
  onChange: (value: any) => void;
};

const SelectField: FC<CustomSelectProps> = ({
  tooltipText,
  options,
  onChange,
  label,
  ...rest
}) => {
  return (
    <FormControl fullWidth size='small'>
      <InputLabel shrink>{label}</InputLabel>
      <Select
        {...rest}
        label={label}
        sx={selectStyle}
        onChange={e => onChange(e.target.value)}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
            },
          },
        }}
        endAdornment={
          <InputAdornment position='end'>
            <Tooltip title={tooltipText} placement='top'>
              <InfoIcon sx={{ width: '18px' }} />
            </Tooltip>
          </InputAdornment>
        }
      >
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {/* {tooltipText && (
        <Tooltip title={tooltipText} placement='top'>
          <InfoIcon
            sx={{
              position: 'absolute',
              right: 8,
              top: '50%',
              transform: 'translateY(-50%)',
              width: '18px',
              pointerEvents: 'auto',
            }}
          />
        </Tooltip>
      )} */}
    </FormControl>
  );
};

export default SelectField;
