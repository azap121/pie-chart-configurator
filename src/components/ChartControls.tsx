'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Slider,
  Button,
  Paper,
  Divider,
  Tabs,
  Tab,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { ChartControlsProps, DEFAULT_CHART_CONFIG } from '@/types/chart';
import { generateSpec } from '@/lib/generateSpec';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

export default function ChartControls({
  config,
  onConfigChange,
  onReset,
}: ChartControlsProps) {
  const [tabValue, setTabValue] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const arcThickness = config.outerRadius - config.innerRadius;
  const spec = generateSpec(config);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(spec);
      setCopied(true);
      setShowSnackbar(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleInnerRadiusChange = (_: Event, value: number | number[]) => {
    const newInnerRadius = value as number;
    if (newInnerRadius < config.outerRadius) {
      onConfigChange({ ...config, innerRadius: newInnerRadius });
    }
  };

  const handleOuterRadiusChange = (_: Event, value: number | number[]) => {
    const newOuterRadius = value as number;
    if (newOuterRadius > config.innerRadius) {
      onConfigChange({ ...config, outerRadius: newOuterRadius });
    }
  };

  const handlePaddingAngleChange = (_: Event, value: number | number[]) => {
    onConfigChange({ ...config, paddingAngle: value as number });
  };

  const handleCornerRadiusChange = (_: Event, value: number | number[]) => {
    onConfigChange({ ...config, cornerRadius: value as number });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
            },
          }}
        >
          <Tab label="Controls" />
          <Tab label="Spec" />
        </Tabs>
      </Box>

      {/* Tab Panels */}
      <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
        {/* Controls Tab */}
        <TabPanel value={tabValue} index={0}>
          {/* Inner Radius */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Inner Radius
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={config.innerRadius}
                onChange={handleInnerRadiusChange}
                min={0}
                max={100}
                step={1}
                valueLabelDisplay="auto"
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                {config.innerRadius}
              </Typography>
            </Box>
          </Box>

          {/* Outer Radius */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Outer Radius
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={config.outerRadius}
                onChange={handleOuterRadiusChange}
                min={50}
                max={150}
                step={1}
                valueLabelDisplay="auto"
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                {config.outerRadius}
              </Typography>
            </Box>
          </Box>

          {/* Padding Angle */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Padding Angle (gap between segments)
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={config.paddingAngle}
                onChange={handlePaddingAngleChange}
                min={0}
                max={10}
                step={0.5}
                valueLabelDisplay="auto"
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                {config.paddingAngle}°
              </Typography>
            </Box>
          </Box>

          {/* Corner Radius */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Corner Radius
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Slider
                value={config.cornerRadius}
                onChange={handleCornerRadiusChange}
                min={0}
                max={10}
                step={1}
                valueLabelDisplay="auto"
                sx={{ flex: 1 }}
              />
              <Typography variant="body2" sx={{ minWidth: 40, textAlign: 'right' }}>
                {config.cornerRadius}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* Arc Thickness Display */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Arc Thickness
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {arcThickness}px
            </Typography>
            <Typography variant="caption" color="text.secondary">
              (outerRadius - innerRadius)
            </Typography>
          </Box>

          {/* Inner/Outer Ratio */}
          <Box
            sx={{
              mb: 3,
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Inner/Outer Ratio
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {(config.innerRadius / config.outerRadius).toFixed(2)}
            </Typography>
          </Box>

          {/* Reset Button */}
          <Button
            variant="outlined"
            fullWidth
            startIcon={<RestartAltIcon />}
            onClick={onReset}
            sx={{ mt: 2 }}
          >
            Reset to Defaults
          </Button>

          {/* Default values reference */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 1, textAlign: 'center' }}
          >
            Default: {DEFAULT_CHART_CONFIG.innerRadius}/{DEFAULT_CHART_CONFIG.outerRadius} (
            {DEFAULT_CHART_CONFIG.outerRadius - DEFAULT_CHART_CONFIG.innerRadius}px thickness)
          </Typography>
        </TabPanel>

        {/* Spec Tab */}
        <TabPanel value={tabValue} index={1}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Copy this spec to your implementation
            </Typography>
            <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
              <IconButton
                onClick={handleCopy}
                size="small"
                color={copied ? 'success' : 'default'}
              >
                {copied ? <CheckIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            component="pre"
            sx={{
              p: 2,
              bgcolor: '#1e1e1e',
              color: '#d4d4d4',
              borderRadius: 1,
              overflow: 'auto',
              maxHeight: 400,
              fontSize: '11px',
              lineHeight: 1.5,
              fontFamily: '"Fira Code", "Consolas", "Monaco", monospace',
              m: 0,
              '&::-webkit-scrollbar': {
                width: 8,
                height: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                bgcolor: 'rgba(255,255,255,0.2)',
                borderRadius: 4,
              },
            }}
          >
            <code>{spec}</code>
          </Box>
        </TabPanel>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={2000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Spec copied to clipboard!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
