import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "2rem",
  },
  colorInput: {
    width: "100%",
    height: "70px",
  },
};

class ColorPickerForm extends Component {
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      );
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return this.props.colors.every(
        ({ color }) => color !== this.props.pickedColor
      );
    });
  }
  render() {
    const {
      pickedColor,
      pickChange,
      addColors,
      colors,
      newColorName,
      changeColorNewName,
      isFull,
      classes,
    } = this.props;

    return (
      <>
        <ChromePicker
          color={pickedColor}
          onChangeComplete={pickChange}
          className={classes.picker}
        />
        <ValidatorForm
          onSubmit={async () => {
            await addColors([
              ...colors,
              { color: pickedColor, name: newColorName },
            ]);
          }}
        >
          <TextValidator
            value={newColorName}
            className={classes.colorInput}
            variant="filled"
            placeholder="Color Name"
            margin="normal"
            onChange={(e) => changeColorNewName(e.target.value)}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            errorMessages={[
              "This Field is required",
              "Color Name must be Unique",
              "Color Already Added",
            ]}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.addColor}
            style={{
              backgroundColor: isFull ? "gray" : pickedColor,
              color: "white",
            }}
            type="submit"
            disabled={isFull}
            // onClick={() => addColors([...colors, pickedColor])}
          >
            {isFull ? "Pallette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
