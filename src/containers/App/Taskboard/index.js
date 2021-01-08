import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { STATUSES } from "../../../constants";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";

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
    const { classes } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status, index) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <Grid key={index} item={true} spacing={2} md={4} xs={12}>
              <Box mt={2} mb={2}>
                <div className={classes.status}>{status.label}</div>
              </Box>
              <div className={classes.wrapperListTask}>
                {taskFiltered.map((task) => {
                  const { title } = task;
                  return (
                    <Card key={task.id} className={classes.card}>
                      <CardContent>
                        <Grid container justify="space-between">
                          <Grid item md={8}>
                            <Typography component="h2">{title}</Typography>
                          </Grid>
                          <Grid item md={4}>
                            {status.label}
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions></CardActions>
                    </Card>
                  );
                })}
              </div>
            </Grid>
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
