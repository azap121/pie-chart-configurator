'use client';

import React from 'react';
import DonutChart from '../DonutChart';
import { ChartConfig } from '@/types/chart';
import { categoryOverviewData, calculateTotal } from '@/lib/chartData';

interface CategoryOverviewProps {
  config: ChartConfig;
}

export default function CategoryOverview({ config }: CategoryOverviewProps) {
  const total = categoryOverviewData.length;

  return (
    <DonutChart
      data={categoryOverviewData}
      config={config}
      centreText={{
        count: total,
        label: 'Parent Categories',
      }}
      width={216}
      height={208}
      title="Category Overview"
      showLegend={true}
      borderedLegend={true}
      legendMaxHeight={180}
    />
  );
}
