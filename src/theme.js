import { createTheme, responsiveFontSizes } from "@material-ui/core";

const theme = createTheme({
  palette: {
    info: {
      main: "#3498db",
    },
  },
  typography: {
    fontSize: {},
  },
});

export default responsiveFontSizes(theme);
