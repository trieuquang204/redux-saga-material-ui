import React, { Component } from "react";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalActions from "../../actions/modal";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
  Modal,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

class TaskForm extends Component {
  render() {
    const { classes, modalActions } = this.props;
    const { hideModal } = modalActions;
    return (
      <form>
        <Grid container spacing={8}>
          <Grid item md={12}>
            <TextField
              id="standard-password-input"
              label="Tieu de"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="standard-password-input"
              label="Mo ta"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={12}>
            <Button color="primary">Luu lai</Button>
            <Button onClick={hideModal}>Huy bo</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = (dispatch) => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(TaskForm);
