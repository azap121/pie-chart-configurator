import { ChartConfig } from '@/types/chart';

export function generateSpec(config: ChartConfig): string {
  const arcThickness = config.outerRadius - config.innerRadius;
  
  return `// MUI X Charts PieChart Configuration
// Arc thickness: ${arcThickness}px (outerRadius - innerRadius)

import { PieChart } from '@mui/x-charts/PieChart';

// Series configuration
series={[
  {
    data: chartData,
    innerRadius: ${config.innerRadius},
    outerRadius: ${config.outerRadius},
    paddingAngle: ${config.paddingAngle},
    cornerRadius: ${config.cornerRadius},
    highlightScope: {
      highlight: 'item',
      fade: 'global',
    },
  },
]}

// Full component example
<PieChart
  width={216}
  height={208}
  margin={{ top: 5, bottom: 5, left: 5, right: 5 }}
  series={[
    {
      data: chartData,
      innerRadius: ${config.innerRadius},
      outerRadius: ${config.outerRadius},
      paddingAngle: ${config.paddingAngle},
      cornerRadius: ${config.cornerRadius},
      highlightScope: {
        highlight: 'item',
        fade: 'global',
      },
    },
  ]}
>
  {/* Centre text overlay */}
  <text
    x="50%"
    y="50%"
    textAnchor="middle"
    dominantBaseline="central"
    style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}
  >
    <tspan
      x="50%"
      dy="-0.5em"
      style={{
        fontSize: '28px',
        fontWeight: 400,
        fill: 'rgba(0,0,0,0.87)',
      }}
    >
      {count}
    </tspan>
    <tspan
      x="50%"
      dy="2em"
      style={{
        fontSize: '12px',
        fontWeight: 400,
        fill: 'rgba(0,0,0,0.6)',
      }}
    >
      {label}
    </tspan>
  </text>
</PieChart>

// Key measurements:
// - Inner radius: ${config.innerRadius}
// - Outer radius: ${config.outerRadius}
// - Arc thickness: ${arcThickness}px
// - Inner/outer ratio: ${(config.innerRadius / config.outerRadius).toFixed(2)}
// - Padding angle: ${config.paddingAngle}°
// - Corner radius: ${config.cornerRadius}
`;
}
