import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import LoadingIcon from "../../assets/images/loading.gif";
import PropTypes from "prop-types";

class GlobalLoading extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.globalLoading}>
        <img src={LoadingIcon} alt="logo" className={classes.icon} />
      </div>
    );
  }
}

GlobalLoading.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(GlobalLoading);
