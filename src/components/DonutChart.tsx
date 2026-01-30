'use client';

import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Card, CardHeader, CardContent, Typography, IconButton, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { DonutChartProps } from '@/types/chart';

// Custom Legend Item component
function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 0.5,
      }}
    >
      <Box
        sx={{
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <Typography
        variant="body2"
        sx={{
          fontSize: '12px',
          color: 'rgba(0,0,0,0.6)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function DonutChart({
  data,
  config,
  centreText,
  width = 216,
  height = 208,
  title,
  titleFontSize = 16,
  showLegend = true,
  borderedLegend = false,
  legendMaxHeight = 180,
  showMenuIcon = true,
  showRolesDropdown = false,
}: DonutChartProps) {
  // Calculate the centre position based on chart dimensions
  const centreX = width / 2;
  const centreY = height / 2;

  // Use custom legend when borderedLegend is true, otherwise use built-in
  // Hide built-in legend when using custom bordered legend
  const hideLegend = !showLegend || borderedLegend;
  const legendProps = !hideLegend
    ? {
        direction: 'vertical' as const,
        position: { vertical: 'middle' as const, horizontal: 'end' as const },
      }
    : undefined;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: '8px',
        boxShadow: 'none',
        width: '100%',
        maxWidth: showLegend ? 506 : 280,
      }}
    >
      {title && (
        <CardHeader
          title={
            <Typography variant="body1" fontWeight={500} sx={{ fontSize: `${titleFontSize}px` }}>
              {title}
            </Typography>
          }
          action={
            showRolesDropdown ? (
              <Button
                variant="text"
                size="small"
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  fontSize: '13px',
                  fontWeight: 500,
                  textTransform: 'none',
                  color: 'primary.main',
                  padding: '4px 8px',
                  minWidth: 'auto',
                }}
              >
                All Roles
              </Button>
            ) : showMenuIcon ? (
              <IconButton aria-label="Menu" size="small">
                <MoreVertIcon />
              </IconButton>
            ) : null
          }
          sx={{ padding: '12px 16px 8px' }}
        />
      )}

      <CardContent sx={{ padding: title ? '0 16px 12px' : '16px' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: 2,
          }}
        >
          <PieChart
            width={width}
            height={height}
            margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
            series={[
              {
                data: data.map((item) => ({
                  id: item.id,
                  value: item.value,
                  label: item.label,
                  color: item.color,
                })),
                innerRadius: config.innerRadius,
                outerRadius: config.outerRadius,
                paddingAngle: config.paddingAngle,
                cornerRadius: config.cornerRadius,
                highlightScope: {
                  highlight: 'item',
                  fade: 'global',
                },
                cx: centreX - 5,
                cy: centreY - 5,
              },
            ]}
            slots={hideLegend ? { legend: () => null } : undefined}
            slotProps={!hideLegend ? { legend: legendProps } : undefined}
          >
            {/* Centre text overlay */}
            <text
              x={centreX}
              y={centreY}
              textAnchor="middle"
              dominantBaseline="central"
              style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}
            >
              <tspan
                x={centreX}
                dy="-0.3em"
                style={{
                  fontSize: '28px',
                  fontWeight: 400,
                  fill: 'rgba(0,0,0,0.87)',
                }}
              >
                {centreText.count}
              </tspan>
              <tspan
                x={centreX}
                dy="1.8em"
                style={{
                  fontSize: '12px',
                  fontWeight: 400,
                  fill: 'rgba(0,0,0,0.6)',
                }}
              >
                {centreText.label}
              </tspan>
            </text>
          </PieChart>

          {/* Custom bordered scrollable legend */}
          {showLegend && borderedLegend && (
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                padding: '12px 16px',
                maxHeight: legendMaxHeight,
                overflowY: 'auto',
                minWidth: 180,
                '&::-webkit-scrollbar': {
                  width: 6,
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,0.2)',
                  borderRadius: 3,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: 'rgba(0,0,0,0.3)',
                },
              }}
            >
              {data.map((item) => (
                <LegendItem key={item.id} color={item.color} label={item.label} />
              ))}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
