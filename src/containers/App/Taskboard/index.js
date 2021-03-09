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

  openform = () => {
    const { modalActionCreators, taskActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(null);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;

    showModal();
    changeModalTitle("Them moi cong viec");
    changeModalContent(<TaskForm />);
  };
  showToast = () => {
    toast.success("Thanh cong");
  };

  handleFilter = (event) => {
    const { value } = event.target;
    const { taskActionCreators } = this.props;
    const { filterTask } = taskActionCreators;
    filterTask(value);
  };

  handleEditTask = (task) => {
    const { taskActionCreators, modalActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    setTaskEditing(task);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;

    showModal();
    changeModalTitle("Cap nha cong viec");
    changeModalContent(<TaskForm />);
  };

  showModalDeleteTask = (task) => {
    const { taskActionCreators, modalActionCreators, classes } = this.props;
    const {
      showModal,
      changeModalTitle,
      hideModal,
      changeModalContent,
    } = modalActionCreators;

    showModal();
    changeModalTitle("Xoa cong viec");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Ban chac chan muon xoa{" "}
          <span
            style={{ fontWeight: "bold", color: "#000" }}
            className={classes.modalConfirmTextBold}
          >
            {task.title}
          </span>
          ?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>Huy bo</Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDeleteTask(task)}
            >
              Dong y
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  handleDeleteTask(task) {
    const { id } = task;
    const { taskActionCreators } = this.props;
    const { deleteTask } = taskActionCreators;
    deleteTask(id)
  }

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
            <TaskList
              tasks={taskFiltered}
              status={status}
              key={status.value}
              onClickEdit={this.handleEditTask}
              onClickDelete={this.showModalDeleteTask}
            />
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
