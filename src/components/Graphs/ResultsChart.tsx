import React from 'react';
import {
  LineChart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  XAxis,
} from 'recharts';
import { Box, Typography } from '@mui/material';
import { SolarDataKeys } from '../../services/projectsServices';

function convertDecimalToTime(decimalTime: number) {
  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime - hours) * 60);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}`;
}

const CustomizedXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text x={x} y={y + 10} textAnchor='middle' fill='#666' fontSize={12}>
      {convertDecimalToTime(payload.value)}
    </text>
  );
};

const colors = ['#ce2929', '#231acc', '#27a22b', '#000', '#238787'];

interface CustomLineChartProps {
  data: any[];
  title?: string;
  columns: string[];
  domain: number[];
  size?: 'small' | 'medium' | 'big';
  units?: string;
  dataKey: SolarDataKeys;
  date?: string;
  interval?: number;
  legendDirection?: 'horizontal' | 'vertical';
}

const getheightSize = (value: string) => {
  switch (value) {
    case 'small':
      return 'h-[400px]';
    case 'normal':
      return 'h-[550px]';
    case 'big':
      return 'h-[700px]';
    default:
      return 'h-[400px]';
  }
};

const CustomNumberArrayTooltip = ({ active, payload, units, dataKey }: any) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: 'rgba(255,255,255,0.9)',
          border: '1px solid #ccc',
        }}
      >
        {payload.map((item: any, index: number) => (
          <Typography key={index} sx={{ textAlign: 'left', color: item.color }}>
            {index === 0 && (
              <Typography
                sx={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}
              >
                {convertDecimalToTime(item.payload[dataKey])} H
              </Typography>
            )}
            {item.name}:
            {typeof item.value === 'number'
              ? item.value.toFixed(2)
              : item.value}{' '}
            {units}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};

// const generateDateForDayOfYear = (
//   yearOrDate: string | number,
//   dayOfYear: number
// ) => {
//   let year;
//   if (typeof yearOrDate === 'string') {
//     const parts = yearOrDate.split('-');
//     if (parts.length === 3) {
//       year = parseInt(parts[2], 10);
//     }
//   } else if (typeof yearOrDate === 'number') {
//     year = yearOrDate;
//   }

//   const startDate = dayjs(`${year}-01-01`);
//   const date = startDate.add(dayOfYear - 1, 'day');
//   return date;
// };

// const Custom dDayTooltip = ({ active, payload, units, date }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <Box
//         sx={{
//           p: 2,
//           bgcolor: 'rgba(255,255,255,0.9)',
//           border: '1px solid #ccc',
//         }}
//       >
//         {payload.map((item: any, index: number) => (
//           <Box key={index}>
//             <Typography sx={{ textAlign: 'left', color: 'text.primary' }}>
//               Day:{' '}
//               {generateDateForDayOfYear(date, item.payload.day).format(
//                 'DD/MM/YYYY'
//               )}
//             </Typography>
//             <Typography sx={{ textAlign: 'left', color: 'text.primary' }}>
//               Energía: {item.value.toFixed(2)} {units}
//             </Typography>
//           </Box>
//         ))}
//       </Box>
//     );
//   }

//   return null;
// };

const ResultsChart: React.FC<CustomLineChartProps> = ({
  data,
  title,
  columns,
  domain,
  units,
  dataKey,
  // date,
  // interval,
  size = 'small',
  legendDirection = 'vertical',
}) => {
  return (
    <div className={`w-full h-9 my-2 text-center ${getheightSize(size)}`}>
      <h3 className='text-xl font-medium'>{title}</h3>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray='2 2' />
          <XAxis
            dataKey={dataKey}
            tick={<CustomizedXAxisTick />}
            interval={'preserveStartEnd'}
          />
          <YAxis domain={domain} />
          <Tooltip
            content={
              <CustomNumberArrayTooltip units={units} dataKey={dataKey} />
            }
          />
          <Legend layout={legendDirection} />

          {columns.map((col, index) => (
            <Line
              key={index}
              type='monotone'
              dataKey={col}
              stroke={colors[index]}
              activeDot={{ r: 6 }}
              dot={{ r: 0 }}
            />
          ))}
          <Brush height={20} alwaysShowText />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsChart;
