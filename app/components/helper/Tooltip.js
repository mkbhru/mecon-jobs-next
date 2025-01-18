import React from "react";

const Tooltip = ({ message, position = "top", children }) => {
  // Define classes for tooltip positions
  const positionClasses = {
    top: "tooltip-top",
    bottom: "tooltip-bottom",
    left: "tooltip-left",
    right: "tooltip-right",
  };

  return (
    <div className={`tooltip ${positionClasses[position]}`} data-tip={message}>
      {children}
    </div>
  );
};

export default Tooltip;
