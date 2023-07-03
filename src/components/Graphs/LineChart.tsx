import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { IWeather } from '../../types/locationstypes';
import dayjs from 'dayjs';
import { Box, Typography } from '@mui/material';

const formatXLabel = (tickItem: any) => {
  const date = new Date(tickItem);
  return date.getHours() + ':' + date.getMinutes();
};

const CustomizedXAxisTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <text x={x} y={y + 10} textAnchor='middle' fill='#666' fontSize={12}>
      {formatXLabel(payload.value)}
    </text>
  );
};

const colors = ['#ce2929', '#231acc', '#27a22b'];

interface SampleChartProps {
  data: IWeather[];
  title?: string;
  columns: string[];
  domain: number[];
  size?: 'small' | 'medium' | 'big';
  units?: string;
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

const CustomTooltip = ({ active, payload, label, units }: any) => {
  if (active && payload && payload.length) {
    const date = dayjs(label).format('DD/MM/YYYY - HH:mm');
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: 'rgba(255,255,255,0.9)',
          border: '1px solid #ccc',
        }}
      >
        <Typography sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          {date} H
        </Typography>
        {payload.map((item: any, index: number) => (
          <Typography key={index} sx={{ textAlign: 'left', color: item.color }}>
            {item.name}: {item.value.toFixed(2)} {units}
          </Typography>
        ))}
      </Box>
    );
  }

  return null;
};

const CustomLineChart: React.FC<SampleChartProps> = ({
  data,
  title,
  columns,
  domain,
  units,
  size = 'small',
}) => {
  return (
    <div className={`w-full h-9 text-center ${getheightSize(size)}`}>
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
          <XAxis dataKey='date' tick={<CustomizedXAxisTick />} />
          <YAxis domain={domain} />
          <Tooltip content={<CustomTooltip units={units} />} />
          <Legend />

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
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
