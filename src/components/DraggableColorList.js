import React from "react";
import DraggableColorBox from "./DraggableColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DraggableColorList = SortableContainer(({ colors, removeColor }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((clr, i) => (
        <DraggableColorBox
          key={clr.name}
          index={i}
          clr={clr.color}
          name={clr.name}
          removeColor={() => removeColor(clr)}
        />
      ))}
    </div>
  );
});

export default DraggableColorList;
