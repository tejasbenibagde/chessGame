import React from "react";

function Tile({ color, image }) {
  return (
    <div className="w-[10vh] h-[10vh]" style={{ backgroundColor: color }}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`${
            image && "piece"
          } w-[10vh] h-[10vh] bg-no-repeat hover:cursor-grab active:cursor-grabbing`}
        ></div>
      )}
    </div>
  );
}

export default Tile;
