import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

class SingleColorPallette extends Component {
  state = {
    format: "hex",
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };
  render() {
    const { pallette } = this.props;
    // console.log(pallette);
    const colorBoxes = pallette.colors.map((color) => (
      <ColorBox
        key={color.name}
        name={color.name}
        bgClr={color[this.state.format]}
        showLink={false}
      />
    ));
    return (
      <div className="SinglePalette Palette">
        {/* <h1>Single Color Pallette</h1> */}
        <NavBar handleChange={this.changeFormat} showSlider={false} />
        <div className="Palette-colors">
          {colorBoxes}
          <div className="go-back ColorBox">
            <Link to={`/palette/${pallette.id}`} className="back-button">
              GO BACK!
            </Link>
          </div>
        </div>
        <Footer paletteName={pallette.paletteName} emoji={pallette.emoji} />
      </div>
    );
  }
}

export default SingleColorPallette;
