import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const PalletteMetaForm = ({
  saveHandle,
  newPalletteName,
  changePalletteNewName,
  pallettes,
  handleClickOpen,
  clickOpen,
}) => {
  const [diaOpen, toggleDia] = useState("form");
  useEffect(() => {
    ValidatorForm.addValidationRule("isPalletteNameUnique", (value) => {
      return pallettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      );
    });
  });

  const handleOpen = () => {
    toggleDia("emoji");
  };

  const finalSubmit = (emoji) => {
    saveHandle(emoji.native);
  };

  return (
    <div>
      <Dialog open={clickOpen && diaOpen === "emoji"} onClose={handleClickOpen}>
        <DialogTitle id="form-dialog-title">
          Choose A Pallette Emoji
        </DialogTitle>
        <Picker title="Pick A Emoji" onSelect={finalSubmit} />
      </Dialog>
      <Dialog
        open={clickOpen && diaOpen === "form"}
        onClose={handleClickOpen}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose A Pallette Name</DialogTitle>
        <ValidatorForm onSubmit={handleOpen}>
          <DialogContent>
            <DialogContentText>
              Please enter a name for your Pallette. Make Sure it's unique.
            </DialogContentText>
            <TextValidator
              value={newPalletteName}
              fullWidth
              margin="normal"
              onChange={(e) => changePalletteNewName(e.target.value)}
              validators={["required", "isPalletteNameUnique"]}
              errorMessages={["Enter a Pallette Name", "Name already Taken"]}
            ></TextValidator>
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" color="primary">
              Save Pallette
            </Button>
            <Button onClick={handleClickOpen} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
};

export default PalletteMetaForm;
