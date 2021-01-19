import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import { STATUSES } from "../../../constants";

import { Button, Grid } from "@material-ui/core";

import TaskList from "../../../components/TaskList";
import TaskForm from "../../../components/TaskForm";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from '../../../actions/task';

const listTask = [
  {
    id: 0,
    title: "Read book",
    description: "Decription ",
    status: 0,
  },
  {
    id: 1,
    title: "Read book1",
    description: "Decription 1",
    status: 1,
  },
  {
    id: 2,
    title: "Read book2",
    description: "Decription 2",
    status: 2,
  },
];
class TaskBoard extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  openform = () => {
    this.setState({
      open: true,
    });
  };

  renderForm() {
    const { open } = this.state;
    let xhtml = null;
    xhtml = <TaskForm open={open} onClose={this.handleClose} />;
    return xhtml;
  }

  renderBoard() {
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status, index) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList tasks={taskFiltered} status={status} key={status.value} />
          );
        })}
      </Grid>
    );
    return xhtml;
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.openform}>
          <AddIcon /> Them moi cong viec
        </Button>
        {this.renderBoard()}
        {this.renderForm()}
      </div>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = dispatch => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch)
  }
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
