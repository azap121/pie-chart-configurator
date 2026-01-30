# Pie Chart Configurator

An interactive tool for configuring MUI X Charts donut/pie charts with real-time adjustable controls and exportable engineering specifications.

## Features

- **Three Chart Types**: Category Overview, Invitation Status, Users by Language
- **Real-time Controls**: Adjust inner radius, outer radius, padding angle, and corner radius
- **Live Preview**: See changes across all charts simultaneously
- **Engineering Spec Export**: Copy-ready code for engineers to implement
- **Centre Text**: All charts display count and label in the donut centre

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI Library**: MUI v7 (Material UI)
- **Charts**: MUI X Charts v8
- **Language**: TypeScript
- **Font**: Roboto

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the configurator.

## Default Chart Configuration

- **Inner Radius**: 76
- **Outer Radius**: 100
- **Arc Thickness**: 24px
- **Padding Angle**: 0°
- **Corner Radius**: 0

## Deployment

This project is optimised for deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/chart-library)
