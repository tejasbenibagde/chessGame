import React from "react";

function Tile({ color, image }) {
  return (
    <div className="w-[80px] h-[80px]" style={{ backgroundColor: color }}>
      {image && (
        <div
          style={{ backgroundImage: `url(${image})` }}
          className={`${
            image && "piece"
          } w-[80px] h-[80px] bg-no-repeat hover:cursor-grab active:cursor-grabbing`}
        ></div>
      )}
    </div>
  );
}

export default Tile;
