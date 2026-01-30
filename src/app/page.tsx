'use client';

import React, { useState } from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CategoryOverview from '@/components/charts/CategoryOverview';
import InvitationStatus from '@/components/charts/InvitationStatus';
import UsersByLanguage from '@/components/charts/UsersByLanguage';
import ChartControls from '@/components/ChartControls';
import ClientOnly from '@/components/ClientOnly';
import { ChartConfig, DEFAULT_CHART_CONFIG } from '@/types/chart';

// Create MUI theme with Roboto font
const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#4254FB',
    },
  },
});

// Loading fallback component (no MUI to avoid hydration issues)
function LoadingFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: '4px solid #e0e0e0',
            borderTopColor: '#4254FB',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}
        />
        <p style={{ color: 'rgba(0,0,0,0.6)' }}>Loading charts...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );
}

// Main content component (client-only)
function AppContent() {
  const [config, setConfig] = useState<ChartConfig>(DEFAULT_CHART_CONFIG);

  const handleConfigChange = (newConfig: ChartConfig) => {
    setConfig(newConfig);
  };

  const handleReset = () => {
    setConfig(DEFAULT_CHART_CONFIG);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Fixed Header */}
        <Box
          component="header"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1100,
            bgcolor: '#fff',
            borderBottom: '1px solid',
            borderColor: 'divider',
            px: 3,
            py: 2,
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Pie Chart Configurator
          </Typography>
        </Box>

        {/* Scrollable Content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            mt: '60px', // Height of fixed header
            overflow: 'auto',
            py: 3,
          }}
        >
          <Container maxWidth="xl">
            {/* Main content */}
            <Grid container spacing={3}>
              {/* Charts Canvas (Left - 70%) */}
              <Grid size={{ xs: 12, lg: 8 }}>
                {/* Top row - Category Overview */}
                <Box sx={{ mb: 3 }}>
                  <CategoryOverview config={config} />
                </Box>

                {/* Bottom row - Invitation Status & Users by Language */}
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <InvitationStatus config={config} />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <UsersByLanguage config={config} />
                  </Grid>
                </Grid>
              </Grid>

              {/* Controls Panel (Right - 30%) */}
              <Grid size={{ xs: 12, lg: 4 }}>
                <ChartControls
                  config={config}
                  onConfigChange={handleConfigChange}
                  onReset={handleReset}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Home() {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <AppContent />
    </ClientOnly>
  );
}
