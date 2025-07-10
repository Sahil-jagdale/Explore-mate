import { styled } from '@mui/material/styles';

export const PaperStyled = styled('div')({
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100px',
});

export const MapContainer = styled('div')({
    height: '100vh',
    width: '100%',
});

export const MarkerContainer = styled('div')({
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    '&:hover': { zIndex: 2 },
});

export const Pointer = styled('div')({
    cursor: 'pointer',
});