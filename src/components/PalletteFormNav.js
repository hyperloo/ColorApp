import React, { Component } from "react";
import PalletteMetaForm from "./PalletteMetaForm";
import { withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddToPhotosIcon from "@material-ui/icons/AddToPhotos";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";

const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  hide: {
    display: "none",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    height: "64px",
    alignItems: "center",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navBtns: {
    marginRight: "1rem",
  },
  button: {
    margin: "0 0.5rem",
  },
});

class PalletteFormNav extends Component {
  state = {
    clickOpen: false,
  };

  handleClickOpen = () => {
    this.setState((prevState) => ({ clickOpen: !prevState.clickOpen }));
  };

  render() {
    const {
      open,
      handleDrawerOpen,
      history,
      saveHandle,
      newPalletteName,
      changePalletteNewName,
      classes,
      pallettes,
    } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Create A Pallette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns} id="navBtns">
            {/*  */}
            <Button
              id="deleteIcon"
              variant="contained"
              className={classes.button}
              color="primary"
              onClick={this.handleClickOpen}
            >
              Save
            </Button>
            <Button
              id="deleteIcon"
              variant="contained"
              className={classes.button}
              color="secondary"
              onClick={() => history.push("/")}
            >
              Go Back!
            </Button>
          </div>
        </AppBar>
        {this.state.clickOpen && (
          <PalletteMetaForm
            saveHandle={saveHandle}
            newPalletteName={newPalletteName}
            changePalletteNewName={changePalletteNewName}
            pallettes={pallettes}
            handleClickOpen={this.handleClickOpen}
            clickOpen={this.state.clickOpen}
          />
        )}
      </div>
    );
  }
}

export default withStyles(styles)(PalletteFormNav);
