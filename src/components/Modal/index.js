import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import styles from "./styles";
import { connect } from "react-redux";
import * as modalActions from "../../actions/modal";
import { compose, bindActionCreators } from "redux";
import { Modal } from "@material-ui/core";

class CommonModal extends Component {
  render() {
    const { classes, open, component, modalActions, title } = this.props;
    const { hideModal } = modalActions;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <b
              style={{
                background: "yellow",
                padding: "10px",
                cursor: "pointer",
                zIndex: "9",
              }}
            >
              {title}
            </b>
            <b
              style={{
                background: "yellow",
                padding: "10px",
                cursor: "pointer",
                zIndex: "9",
              }}
              onClick={hideModal}
            >
              Đóng
            </b>
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.modal.showModal,
    component: state.modal.component,
    title: state.modal.title,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modalActions: bindActionCreators(modalActions, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(CommonModal);
