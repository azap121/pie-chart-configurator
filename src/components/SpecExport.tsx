'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { SpecExportProps } from '@/types/chart';
import { generateSpec } from '@/lib/generateSpec';

export default function SpecExport({ config }: SpecExportProps) {
  const [copied, setCopied] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const spec = generateSpec(config);

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

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          Engineering Spec
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
          fontSize: '12px',
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
