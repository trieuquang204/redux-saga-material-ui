import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  color: {
    primary: "#d32f2f",
    secondary: "#00bcd4",
    error: "#e64a19",
  },
  typoraphy: {
    fontFamily: "Roboto",
  },
  shape: {
    borderRadius: 4,
    backgroundColor: "#781fa2",
    textColor: "#fff",
  },
});

export default theme;
