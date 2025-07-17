// styles.js
import { styled } from '@mui/material/styles';
import { Box, FormControl, Grid } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(10),
  marginInline: theme.spacing(3),
  paddingInline: theme.spacing(2),
}));

export const LoaderBox = styled(Box)(() => ({
  height: '600px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
  marginBottom: theme.spacing(4),
}));

export const ListWrapper = styled(Grid)(() => ({
  height: '75vh',
  overflowY: 'auto',
}));