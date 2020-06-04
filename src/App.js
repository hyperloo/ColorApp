import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Pallette from "./components/Pallette";
import PalletteList from "./components/PalletteList";
import NewPalletteForm from "./components/NewPalletteForm";
import seedColors from "./seedColors";
import {
  generatePallette,
  generateSinglePallette,
} from "./components/colorHelpers";
import SingleColorPallette from "./components/SingleColorPallette";

class App extends Component {
  constructor(props) {
    super(props);
    const savedPallettes = JSON.parse(window.localStorage.getItem("pallettes"));
    this.state = { pallettes: savedPallettes || seedColors };
  }

  findPalette = (id) => {
    return this.state.pallettes.find((palette) => palette.id === id);
  };

  savePallette = (newPallette) => {
    this.setState(
      { pallettes: [...this.state.pallettes, newPallette] },
      this.syncLocalStorage
    );
  };

  deletePallette = (id) => {
    this.setState(
      (prevState) => ({
        pallettes: prevState.pallettes.filter((pal) => pal.id !== id),
      }),
      this.syncLocalStorage
    );
  };

  syncLocalStorage = () => {
    window.localStorage.setItem(
      "pallettes",
      JSON.stringify(this.state.pallettes)
    );
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={(routeProps) => (
            <NewPalletteForm
              savePallette={this.savePallette}
              pallettes={this.state.pallettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={(routeProps) => {
            let pal = this.findPalette(routeProps.match.params.paletteId);
            let colorId = routeProps.match.params.colorId;
            return pal ? (
              <SingleColorPallette
                pallette={generateSinglePallette(pal, colorId)}
              />
            ) : (
              <h2>Loading....</h2>
            );
          }}
        />
        <Route
          exact
          path="/"
          render={(routeProps) => (
            <PalletteList
              pallettes={this.state.pallettes}
              {...routeProps}
              deletePallette={this.deletePallette}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={(routeProps) => (
            <Pallette
              pallette={generatePallette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
