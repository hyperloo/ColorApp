import React, { Component } from "react";
import "./ColorBox.css";
import { Link, withRouter } from "react-router-dom";
import chroma from "chroma-js";
import { withStyles } from "@material-ui/styles";

const styles = {
  copyText: {
    color: (props) =>
      chroma(props.bgClr).luminance() >= 0.08 ? "black" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.bgClr).luminance() >= 0.08 ? "black" : "white",
  },
};

class ColorBox extends Component {
  state = {
    copied: false,
  };

  copyHandler = async () => {
    this.setState({ copied: true });
    await navigator.clipboard.writeText(this.props.bgClr);
    await setTimeout(() => this.setState({ copied: false }), 1000);
  };

  render() {
    const { name, bgClr, moreUrl, showLink, classes } = this.props;
    const isDark = chroma(bgClr).luminance() <= 0.07;
    const isLight = chroma(bgClr).luminance() >= 0.07;
    return (
      <div
        className="ColorBox"
        style={{ backgroundColor: `${bgClr}` }}
        onClick={this.copyHandler}
      >
        <div
          className={`copy-overlay ${this.state.copied && "show"}`}
          style={{ backgroundColor: `${bgClr}` }}
        />
        <div className={`copy-msg ${this.state.copied && "show-msg"}`}>
          <h1>Copied!</h1>
          <p className={classes.copyText}>{bgClr}</p>
        </div>
        <div className="copy-container">
          <div className="box-content">
            <span className={classes.colorName}>{name}</span>
          </div>
          <button
            className={`copy-button ${isLight && "dark-text"}`}
            onClick={this.copyHandler}
          >
            Copy
          </button>
        </div>
        {showLink && (
          <Link
            to={moreUrl ? moreUrl : ""}
            onClick={(e) => e.stopPropagation()}
          >
            <span className={`see-more ${isLight && "dark-text"}`}>More</span>
          </Link>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(ColorBox);
