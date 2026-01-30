import type { Metadata } from 'next';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pie Chart Configurator',
  description: 'Configure MUI X Charts donut/pie charts with adjustable controls',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
