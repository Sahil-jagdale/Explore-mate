// styles.js
import { styled } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';

export const MapContainer = styled(Box)(({ theme }) => ({
  height: '100vh',
  width: '100%',
}));

export const MarkerWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
  '&:hover': {
    zIndex: 2,
  },
}));

export const PaperStyle = styled(Paper)(({ theme }) => ({
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100px',
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 70,
  objectFit: 'cover',
}));