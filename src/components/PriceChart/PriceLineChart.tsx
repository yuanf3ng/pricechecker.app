import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import { Product } from '../../types';
import { chartOptions } from './ChartConfig';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface PriceLineChartProps {
  products: Product[];
  locations: string[];
}

const COLORS = [
  '#2563eb', // blue-600
  '#dc2626', // red-600
  '#16a34a', // green-600
  '#9333ea', // purple-600
  '#ea580c', // orange-600
];

export function PriceLineChart({ products, locations }: PriceLineChartProps) {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    // Cleanup function to destroy the chart instance
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const datasets = locations.map((location, index) => {
    const locationProducts = products.filter(p => p.location === location);
    const pricePoints = locationProducts.map(p => ({
      x: new Date(p.lastChecked),
      y: p.currentPrice,
    }));

    return {
      label: location,
      data: pricePoints,
      borderColor: COLORS[index % COLORS.length],
      backgroundColor: COLORS[index % COLORS.length] + '20',
      tension: 0.4,
    };
  });

  const data = {
    datasets,
  };

  return (
    <div className="h-[300px] w-full">
      <Line 
        ref={chartRef}
        options={chartOptions} 
        data={data}
      />
    </div>
  );
}