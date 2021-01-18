import React, { Component } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  DialogTitle,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

class TaskForm extends Component {
  render() {
    const { open, classes, onClose } = this.props;
    return (
      <Dialog
        open={open}
        keepMounted
        onClose={onClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Them moi cong viec
        </DialogTitle>
        <DialogContent>
          <TextField
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            margin="normal"
          />
          <TextField
            multiline
            id="standard-password-input"
            label="Password"
            className={classes.textField}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            cancel
          </Button>
          <Button onClick={onClose} color="primary">
            ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(TaskForm);
