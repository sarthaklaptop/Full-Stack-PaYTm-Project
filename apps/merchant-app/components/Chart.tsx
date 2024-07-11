"use client";

import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Card } from '@repo/ui/card';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = ( {data, user}: any ) => {
    
    const lables = (data.lables);
    const datasetData = data.data;

    const chartData = {
        labels: lables,
        datasets: [
          {
            label: 'Portfolio Value (INR)',
            data: datasetData,
            fill: false,
            borderColor: '#6a51a6',
            tension: 0.1,
          },
        ],
      };

  return (
    <Card title={`Hello ${user.name}`}>
        <div className='flex flex-col w-full '  >
            <Line data={chartData} />
        </div>
    </Card>
  );
};
export default LineChart;
