// components/MessageCard.jsx
import React from "react";

const MessageCard = ({ children }) => {
  return (
    <div className=" m-4 mt-16 card h-40 bg-base-100 shadow-md p-22 mb-8 flex justify-center items-center">
      <div className="text-center text-3xl font-medium">{children}</div>
    </div>
  );
};

export default MessageCard;
