// Chart data item interface
export interface ChartDataItem {
  id: string;
  label: string;
  value: number;
  color: string;
}

// Chart configuration interface
export interface ChartConfig {
  innerRadius: number;
  outerRadius: number;
  paddingAngle: number;
  cornerRadius: number;
}

// Centre text configuration
export interface CentreTextConfig {
  count: number | string;
  label: string;
}

// Donut chart props
export interface DonutChartProps {
  data: ChartDataItem[];
  config: ChartConfig;
  centreText: CentreTextConfig;
  width?: number;
  height?: number;
  title?: string;
  titleFontSize?: number;    // Font size for title in pixels
  showLegend?: boolean;
  borderedLegend?: boolean;  // Show legend in a bordered scrollable box
  legendMaxHeight?: number;  // Max height for scrollable legend
  showMenuIcon?: boolean;    // Show the three-dot menu icon (default true)
  showRolesDropdown?: boolean; // Show "All Roles" dropdown text with chevron
  infoTooltip?: string;      // Tooltip text for info icon next to title
}

// Chart controls props
export interface ChartControlsProps {
  config: ChartConfig;
  onConfigChange: (config: ChartConfig) => void;
  onReset: () => void;
}

// Spec export props
export interface SpecExportProps {
  config: ChartConfig;
}

// Default chart configuration (24px thickness)
export const DEFAULT_CHART_CONFIG: ChartConfig = {
  innerRadius: 76,
  outerRadius: 100,
  paddingAngle: 0,
  cornerRadius: 0,
};
