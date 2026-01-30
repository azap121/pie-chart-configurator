// Category Overview - 7-colour cycling palette
export const CATEGORY_COLORS = [
  '#4254FB', // Indigo
  '#FFB422', // Amber
  '#FA4F58', // Red
  '#0DBEFF', // Cyan
  '#22BF75', // Green
  '#FA83B4', // Pink
  '#FF7511', // Orange
];

// Invitation Status - Semantic colours
export const INVITATION_COLORS = {
  Active: '#00796B',   // Teal
  Invited: '#C3C3F4',  // Lavender
  Draft: '#eeeeee',    // Light Grey
  Expired: '#EF9A9A',  // Light Red
};

// Users by Language - Semantic colours
export const LANGUAGE_COLORS = {
  English: '#00796B',        // Teal
  'No Language Set': '#D0D8DC', // Grey
};

// Helper function to get colour from cycling palette
export function getCyclingColor(index: number, palette: string[] = CATEGORY_COLORS): string {
  return palette[index % palette.length];
}
