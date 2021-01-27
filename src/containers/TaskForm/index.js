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
import renderTextField from "../../components/FormHelper/TextField";

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
            <Field
              id="title"
              label="Tieu de"
              className={classes.textField}
              margin="normal"
              name="title"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              label="Mo ta"
              multiple
              className={classes.textField}
              margin="normal"
              rowsMax="4"
              margin="normal"
              name="description"
              component={renderTextField}
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
