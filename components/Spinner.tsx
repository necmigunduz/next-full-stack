import React from "react";

const Spinner = () => {
  return (
    <div
      className="h-4 w-4 animate-spin rounded-full border"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border">
        ...
      </span>
    </div>
  );
};

export default Spinner;
