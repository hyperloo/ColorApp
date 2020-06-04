import React, { useState, useCallback } from "react";
import { arrayMove } from "react-sortable-hoc";
import { generateRandom as ge } from "./colorHelpers";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from "@material-ui/core/Button";
import DraggableColorList from "./DraggableColorList";
import PalletteFormNav from "./PalletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: `calc(100vh - 64px)`,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  container: {
    height: "100%",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
  },
  buttons: {
    width: "100%",
  },
  button: {
    width: "50%",
  },
}));

const NewPalletteForm = ({ savePallette, history, pallettes }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pickedColor, changePickedColor] = useState("purple");
  const [colors, addColors] = useState(pallettes[0].colors);
  const [newColorName, changeColorNewName] = useState("");
  const [newPalletteName, changePalletteNewName] = useState("");
  const pickChange = useCallback((e) => changePickedColor(e.hex));

  const isFull = colors.length >= 20;

  // useEffect(() => {
  //   ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
  //     return colors.every(
  //       ({ name }) => name.toLowerCase() !== value.toLowerCase()
  //     );
  //   });
  //   ValidatorForm.addValidationRule("isColorUnique", (value) => {
  //     return colors.every(({ color }) => color !== pickedColor);
  //   });
  // });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addRandomColor = () => {
    const ele = "0123456789abcdef".split("");
    let newRandomColor;
    if (Math.random() * 2 < 1) {
      newRandomColor = `#${ele[ge(ele)]}${ele[ge(ele)]}${ele[ge(ele)]}`;
    } else {
      newRandomColor = `#${ele[ge(ele)]}${ele[ge(ele)]}${ele[ge(ele)]}${
        ele[ge(ele)]
      }${ele[ge(ele)]}${ge(ele)}`;
    }
    const newClr = { hex: newRandomColor };
    pickChange(newClr);
  };

  const saveHandle = (emoji) => {
    const palletteName = newPalletteName;
    const newPallette = {
      paletteName: palletteName,
      emoji: emoji,
      id: palletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    savePallette(newPallette);
    history.push("/");
  };

  const removeColor = ({ name }) => {
    addColors(colors.filter((color) => color.name !== name));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    addColors(arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <div className={classes.root}>
      <PalletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        // classes={classes}
        history={history}
        saveHandle={saveHandle}
        newPalletteName={newPalletteName}
        changePalletteNewName={changePalletteNewName}
        pallettes={pallettes}
      />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <div className={classes.container}>
          <Typography variant="h4" gutterBottom>
            Design Your Pallette
          </Typography>
          <div className={classes.buttons}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={() => addColors([])}
            >
              Clear Pallette
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              disabled={isFull}
              onClick={addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm
            pickedColor={pickedColor}
            pickChange={pickChange}
            addColors={addColors}
            colors={colors}
            newColorName={newColorName}
            changeColorNewName={changeColorNewName}
            isFull={isFull}
          />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          onSortEnd={onSortEnd}
          axis="xy"
        />
      </main>
    </div>
  );
};

export default NewPalletteForm;
