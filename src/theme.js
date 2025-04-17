import { createTheme } from '@mui/material/styles';

const navyBase = {
  main: '#001F3F',
};

const theme = createTheme({
  palette: {
    primary: {
      ...navyBase,
    },
    secondary: {
      main: '#FF851B',
    },
  },
});
theme.palette.primary = theme.palette.augmentColor({ color: navyBase, name: 'primary' });

export default theme;
