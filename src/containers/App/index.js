import { React, Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import styles from "./styles";
import TaskBoard from "./Taskboard";
import theme from "../../commons/Theme";

import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";

const store = configureStore();

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <TaskBoard />
        </ThemeProvider>
      </Provider>
    );
  }
}
export default withStyles(styles)(App);
