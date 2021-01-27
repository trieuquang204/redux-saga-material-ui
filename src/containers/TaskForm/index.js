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
import { Field, reduxForm } from "redux-form";
import styles from "./styles";

class TaskForm extends Component {
  onHandleSubmitForm = (data) => {
    console.log("data", data);
  };

  render() {
    const { classes, modalActions, handleSubmit } = this.props;
    const { hideModal } = modalActions;
    return (
      <form onSubmit={handleSubmit(this.onHandleSubmitForm)}>
        <Grid container spacing={8}>
          <Grid item md={12}>
            <Field name="title" component="input" />
          </Grid>
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
            <Button color="primary" type="submit">
              Luu lai
            </Button>
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

const FORM_NAME = "TASK_MANAGEMENT";

const withReduxForm = reduxForm({
  form: FORM_NAME,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
