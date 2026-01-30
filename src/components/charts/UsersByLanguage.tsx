'use client';

import React from 'react';
import DonutChart from '../DonutChart';
import { ChartConfig } from '@/types/chart';
import { usersByLanguageData, calculateTotal } from '@/lib/chartData';

interface UsersByLanguageProps {
  config: ChartConfig;
}

export default function UsersByLanguage({ config }: UsersByLanguageProps) {
  const total = calculateTotal(usersByLanguageData);

  // Scale the config for this chart's dimensions (97.5 outer radius base)
  const scaleFactor = 97.5 / 100;
  const scaledConfig: ChartConfig = {
    ...config,
    innerRadius: Math.round(config.innerRadius * scaleFactor * 10) / 10,
    outerRadius: Math.round(config.outerRadius * scaleFactor * 10) / 10,
  };

  return (
    <DonutChart
      data={usersByLanguageData}
      config={scaledConfig}
      centreText={{
        count: total,
        label: 'Users',
      }}
      width={220}
      height={205}
      title="Users by Language"
      titleFontSize={14}
      showLegend={true}
    />
  );
}
