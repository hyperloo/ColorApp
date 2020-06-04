import React from "react";

const Footer = ({ paletteName, emoji }) => {
  return (
    <footer className="Palette-footer">
      {paletteName}
      <span className="emoji">{emoji}</span>
    </footer>
  );
};

export default Footer;
