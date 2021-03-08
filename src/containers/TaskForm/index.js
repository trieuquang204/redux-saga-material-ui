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
  MenuItem,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import * as taskActions from "../../actions/task";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import renderTextField from "../../components/FormHelper/TextField";
import validate from "./validate";
import renderSelectField from "../../components/FormHelper/select";

class TaskForm extends Component {
  onHandleSubmitForm = (data) => {
    const { taskActionsCreators, taskEditing } = this.props;
    const { addTask, updateTask } = taskActionsCreators;
    const { title, description, status } = data;
    if (taskEditing && taskEditing.id) {
      updateTask(title, description, status);
    } else {
      addTask(title, description);
    }
  };

  require = (value) => {
    let error = "Vui long nhap tieu de";
    if (value) {
      error = null;
    }
    return error;
  };

  minlength5 = (value) => {
    let error = null;
    if (value.length < 5) {
      error = "Tieu de phai it nhat 5 ky tu";
    }
    return error;
  };

  renderStatusSelection = () => {
    let xhtml = null;
    const { taskEditing, classes } = this.props;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id="status"
          label="Trang thai"
          className={classes.select}
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>READY</MenuItem>
          <MenuItem value={1}>IN PROGRESS</MenuItem>
          <MenuItem value={2}>COMPLETED</MenuItem>
        </Field>
      );
    }
    return xhtml;
  };

  render() {
    const {
      classes,
      modalActions,
      handleSubmit,
      invalid,
      submitting,
      // taskEditing,
    } = this.props;
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
            {this.renderStatusSelection()}
          </Grid>
          <Grid item md={12}>
            <Button
              color="primary"
              type="submit"
              disabled={invalid || submitting}
            >
              Luu lai
            </Button>
            <Button onClick={hideModal}>Huy bo</Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : null,
      status: state.task.taskEditing ? state.task.taskEditing.status : null,
      description: state.task.taskEditing
        ? state.task.taskEditing.description
        : null,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
    taskActionsCreators: bindActionCreators(taskActions, dispatch),
  };
};

const FORM_NAME = "TASK_MANAGEMENT";

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
