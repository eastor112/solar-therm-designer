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

interface SampleChartProps {
  data: any;
}

const SampleChart: React.FC<SampleChartProps> = ({ data }) => {
  // console.log(data.slice(0, 5));
  return (
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
        <YAxis domain={[0, 1000]} />
        <Tooltip />
        <Legend />
        <Line
          type='monotone'
          dataKey='Dhi'
          stroke='#ce2929'
          activeDot={{ r: 6 }}
          dot={{ r: 0 }}
        />
        <Line
          type='monotone'
          dataKey='Dni'
          stroke='#231acc'
          activeDot={{ r: 6 }}
          dot={{ r: 0 }}
        />
        <Line
          type='monotone'
          dataKey='Ghi'
          stroke='#27a22b'
          activeDot={{ r: 6 }}
          dot={{ r: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SampleChart;
