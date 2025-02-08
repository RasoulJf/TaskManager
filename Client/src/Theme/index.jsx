
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0D47A1",
      light: "#42A5F5",
    },
    secondary: {
      main: "#6A1B9A",
      light: "#BA68C8",
    },
    background: {
      default: "#F5F5F5",
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial, sans-serif",
  },
});

export default theme;
