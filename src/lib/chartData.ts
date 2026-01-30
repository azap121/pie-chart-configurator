import { ChartDataItem } from '@/types/chart';
import { CATEGORY_COLORS, INVITATION_COLORS, LANGUAGE_COLORS, getCyclingColor } from './chartColors';

// Category Overview sample data
export const categoryOverviewData: ChartDataItem[] = [
  { id: 'P009T1C000T0', label: 'Accounting', value: 20, color: getCyclingColor(0) },
  { id: 'P001T1C000T0', label: 'Closing Documents', value: 12, color: getCyclingColor(1) },
  { id: 'P002T1C000T0', label: 'ESG', value: 21, color: getCyclingColor(2) },
  { id: 'P003T1C000T0', label: 'Finance', value: 37, color: getCyclingColor(3) },
  { id: 'P004T1C000T0', label: 'General Information', value: 24, color: getCyclingColor(4) },
  { id: 'P005T1C000T0', label: 'Human Resources', value: 39, color: getCyclingColor(5) },
  { id: 'P006T1C000T0', label: 'Legal', value: 59, color: getCyclingColor(6) },
  { id: 'P007T1C000T0', label: 'Marketing and Sales', value: 4, color: getCyclingColor(7) },
  { id: 'P008T1C000T0', label: 'Operational Information', value: 24, color: getCyclingColor(8) },
  { id: 'P012T1C000T0', label: 'Other', value: 195, color: getCyclingColor(9) },
  { id: 'P010T1C000T0', label: 'Property and Other Assets', value: 2, color: getCyclingColor(10) },
  { id: 'P011T1C000T0', label: 'Tax', value: 7, color: getCyclingColor(11) },
];

// Invitation Status sample data
export const invitationStatusData: ChartDataItem[] = [
  { id: 'active', label: 'Active', value: 32, color: INVITATION_COLORS.Active },
  { id: 'invited', label: 'Invited', value: 5, color: INVITATION_COLORS.Invited },
  { id: 'draft', label: 'Draft', value: 1, color: INVITATION_COLORS.Draft },
  { id: 'expired', label: 'Expired', value: 5, color: INVITATION_COLORS.Expired },
];

// Users by Language sample data
export const usersByLanguageData: ChartDataItem[] = [
  { id: 'english', label: 'English', value: 34, color: LANGUAGE_COLORS.English },
  { id: 'no-language', label: 'No Language Set', value: 1, color: LANGUAGE_COLORS['No Language Set'] },
];

// Helper to calculate total from data
export function calculateTotal(data: ChartDataItem[]): number {
  return data.reduce((sum, item) => sum + item.value, 0);
}
