import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import AddIcon from "@material-ui/icons/Add";
import { STATUSES } from "../../../constants";

import { Button, Grid, Box } from "@material-ui/core";

import TaskList from "../../../components/TaskList";
import TaskForm from "../../TaskForm";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as taskActions from "../../../actions/task";
import * as modalActions from "../../../actions/modal";
import SearchBox from "../../../components/SearchBox";

class TaskBoard extends Component {
  state = {
    open: false,
  };

  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  loadData = () => {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  openform = () => {
    const { modalActionCreators } = this.props;
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;

    showModal();
    changeModalTitle("Them moi cong viec");
    changeModalContent(<TaskForm />);
  };

  // renderForm() {
  //   const { open } = this.state;
  //   let xhtml = null;
  //   xhtml = <TaskForm open={open} onClose={this.handleClose} />;
  //   return xhtml;
  // }

  showToast = () => {
    toast.success("Thanh cong");
  };

  handleFilter = (event) => {
    const { value } = event.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };
  renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFilter} />;
    return xhtml;
  };

  renderBoard() {
    let xhtml = null;
    const { listTask } = this.props;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status, index) => {
          const taskFiltered =
            listTask && listTask.filter((task) => task.status === status.value);
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
        <Button variant="contained" color="primary" onClick={this.loadData}>
          Load data
        </Button>
        <Button variant="contained" color="primary" onClick={this.openform}>
          <AddIcon /> Them moi cong viec
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
        {/* {this.renderForm()} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
