import React, { Component } from "react";
import ColorBox from "./ColorBox";
import NavBar from "./Navbar";
import Footer from "./Footer";

import "rc-slider/assets/index.css";
import "./Pallette.css";

class Pallette extends Component {
  state = {
    level: 500,
    format: "hex",
  };

  changeLevel = (level) => {
    this.setState({ level });
  };

  changeFormat = (val) => {
    this.setState({ format: val });
  };

  render() {
    const { level, format } = this.state;
    const { colors, paletteName, emoji, id } = this.props.pallette;
    const colorBoxes = colors[level].map((color, i) => (
      <ColorBox
        bgClr={color[format]}
        name={color.name}
        key={i}
        moreUrl={`/palette/${id}/${color.id}`}
        showLink={true}
      />
    ));
    return (
      <div className="Palette">
        <NavBar
          level={level}
          changeLevel={this.changeLevel}
          handleChange={this.changeFormat}
          showSlider={true}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <Footer paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default Pallette;
