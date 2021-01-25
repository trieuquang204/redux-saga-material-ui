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
  Modal,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";

class TaskForm extends Component {
  render() {
    const { open, classes, onClose } = this.props;
    return (
      <Modal open={open} onClose={onClose}>
        <div className={classes.modal}>
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
                <Button onClick={onClose}>Huy bo</Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    );
  }
}

export default withStyles(styles)(TaskForm);
