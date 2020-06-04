import React from "react";
import { withStyles } from "@material-ui/styles";
import { SortableElement } from "react-sortable-hoc";
import DeleteIcon from "@material-ui/icons/Delete";
import "./DraggableColorBox.css";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-5.5px",
    "&:hover svg": {
      color: "white",
    },
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteIcon: {
    color: "black",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.5)",
    },
  },
};

const DraggableColorBox = SortableElement(
  ({ clr, classes, name, removeColor }) => {
    return (
      <div
        id="ColorBox"
        className={classes.root}
        style={{ backgroundColor: clr }}
      >
        <div className={classes.boxContent}>
          {name}

          <DeleteIcon
            className={classes.deleteIcon}
            onClick={removeColor}
          ></DeleteIcon>
        </div>
      </div>
    );
  }
);

export default withStyles(styles)(DraggableColorBox);
