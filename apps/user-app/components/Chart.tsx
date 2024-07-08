// page.js this is the entry point of application

"use client";
import dynamic from 'next/dynamic';
import 'chart.js/auto';
import { Card } from '@repo/ui/card';
const Line = dynamic(() => import('react-chartjs-2').then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = ({ data }: any) => {
    // console.log(data)
    const lables = (data.lables);
    const datasetData = data.data;

    const chartData = {
        labels: lables,
        datasets: [
          {
            label: 'GeeksforGeeks Line Chart',
            data: datasetData,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

  return (
    <Card title='Hello'>
        <div style={{ width: '700px', height: '700px' }}>
            <h1>Example 1: Line Chart</h1>
            <Line data={chartData} />
        </div>
    </Card>
  );
};
export default LineChart;
