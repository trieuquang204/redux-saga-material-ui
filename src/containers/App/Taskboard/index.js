import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { STATUSES } from "../../../constants";

import TaskList from "../../../components/TaskList";

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
        <Button variant="contained" color="primary">
          <AddIcon /> Them moi cong viec
        </Button>
        {this.renderBoard()}
      </div>
    );
  }
}

export default withStyles(styles)(TaskBoard);
