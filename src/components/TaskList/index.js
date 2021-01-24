import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import styles from "./styles";
import { Box, Grid } from "@material-ui/core";
import TaskItem from "../TaskItem";

class TaskList extends Component {
  render() {
    const { classes, tasks, status } = this.props;
    return (
      <Grid key={status.value} item={true} spacing={2} md={4} xs={12}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks && tasks.map((task) => {
            return <TaskItem task={task} status={status} key={task.id} />;
          })}
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(TaskList);
