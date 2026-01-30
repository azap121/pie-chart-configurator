'use client';

import React from 'react';
import DonutChart from '../DonutChart';
import { ChartConfig } from '@/types/chart';
import { invitationStatusData, calculateTotal } from '@/lib/chartData';

interface InvitationStatusProps {
  config: ChartConfig;
}

export default function InvitationStatus({ config }: InvitationStatusProps) {
  const total = calculateTotal(invitationStatusData);

  // Scale the config for this chart's dimensions (97.5 outer radius base)
  const scaleFactor = 97.5 / 100;
  const scaledConfig: ChartConfig = {
    ...config,
    innerRadius: Math.round(config.innerRadius * scaleFactor * 10) / 10,
    outerRadius: Math.round(config.outerRadius * scaleFactor * 10) / 10,
  };

  return (
    <DonutChart
      data={invitationStatusData}
      config={scaledConfig}
      centreText={{
        count: total,
        label: 'Invitations',
      }}
      width={220}
      height={205}
      title="Invitation Status"
      titleFontSize={14}
      showLegend={true}
      showMenuIcon={false}
      showRolesDropdown={true}
    />
  );
}
