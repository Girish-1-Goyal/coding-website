import { Theme } from '@mui/material';

export const globalStyles = (theme: Theme) => ({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  'html, body, #root': {
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  body: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
  },
  '.scrollable': {
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em',
      height: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: theme.palette.divider,
      borderRadius: '4px',
      '&:hover': {
        background: theme.palette.primary.main,
      },
    },
  },
  '.content-container': {
    flex: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  '.full-height': {
    height: '100%',
    minHeight: '100vh',
  },
  '.full-width': {
    width: '100%',
  },
  '.monaco-editor': {
    '.overflow-guard': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}); 