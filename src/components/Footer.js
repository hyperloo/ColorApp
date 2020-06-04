import React from "react";

const Footer = ({ paletteName, emoji }) => {
  return (
    <footer className="Palette-footer">
      <span style={{ display: "inline-block", margin: "auto" }}>
        Created by{" "}
        <a
          style={{
            backgroundColor: "inherit",
            textDecoration: "none",
            cursor: "pointer",
            zIndex: "100",
            position: "relative",
          }}
          href="https://tekhin3.netlify.app"
          target="_blank"
        >
          tekhin
        </a>
        , @ 2020
      </span>
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
};

export default Footer;
