import chroma from "chroma-js";
const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function generatePallette(starterPallette) {
  let newPallette = {
    paletteName: starterPallette.paletteName,
    id: starterPallette.id,
    emoji: starterPallette.emoji,
    colors: {},
  };

  for (let level of levels) {
    newPallette.colors[level] = [];
  }
  for (let color of starterPallette.colors) {
    let scale = generateScale(color.color, 10).reverse();
    for (let i in scale) {
      newPallette.colors[levels[i]].push({
        name: `${color.name} ${levels[i]}`,
        id: color.name.toLowerCase().replace(/ /g, "-"),
        hex: scale[i],
        rgb: chroma(scale[i]).css(),
        rgba: chroma(scale[i])
          .css()
          .replace("rgb", "rgba")
          .replace(")", ",1.0)"),
      });
    }
  }
  return newPallette;
}

function generateSinglePallette(pallette, colorId) {
  let newPallette = {
    paletteName: pallette.paletteName,
    id: pallette.id,
    emoji: pallette.emoji,
    color: colorId,
    colors: [],
  };

  const color = pallette.colors.find(
    (color) => color.name.toLowerCase() === colorId
  );

  let scale = generateScale(color.color, 10).reverse();
  for (let i in scale) {
    newPallette.colors.push({
      name: `${color.name} ${levels[i]}`,
      id: color.name.toLowerCase().replace(/ /g, "-"),
      hex: scale[i],
      rgb: chroma(scale[i]).css(),
      rgba: chroma(scale[i]).css().replace("rgb", "rgba").replace(")", ",1.0)"),
    });
  }
  newPallette.colors = newPallette.colors.slice(1);
  return newPallette;
}

function getRange(hexColor) {
  const end = "#fff";
  return [chroma(hexColor).darken(1.4).hex(), hexColor, end];
}

function generateScale(hexColor, numberOfColors) {
  return chroma.scale(getRange(hexColor)).mode("lab").colors(numberOfColors);
}

function generateRandom(arr) {
  return Math.floor(Math.random() * arr.length);
}

export { generatePallette, generateSinglePallette, generateRandom };
