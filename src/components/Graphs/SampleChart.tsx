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
  data: any;
  title?: string;
  columns: string[];
  domain: number[];
  size?: 'small' | 'medium' | 'big';
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

const SampleChart: React.FC<SampleChartProps> = ({
  data,
  title,
  columns,
  domain,
  size = 'small',
}) => {
  // console.log(data.slice(0, 5));
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
          <XAxis dataKey='PeriodStart' tick={<CustomizedXAxisTick />} />
          <YAxis domain={domain} />
          <Tooltip />
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

export default SampleChart;
