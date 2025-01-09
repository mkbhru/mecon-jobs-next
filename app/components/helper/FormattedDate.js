import React from "react";

const FormattedDate = ({ date, label }) => {
  if (!date) return null; // Handle undefined or null dates

  const formattedDate = new Date(date)
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "")
    .replace(" ", "-")
    .replace(" ", "-")
    .replace("at", " ");

  return (
    <div className="flex justify-end mt-4">
      {label && <h1 className="font-bold">{label}:&nbsp;</h1>}
      {formattedDate}
    </div>
  );
};

export default FormattedDate;
