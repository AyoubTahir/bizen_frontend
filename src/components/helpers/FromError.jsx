import React from "react";

const FromError = ({ isError, error, field }) => {
  if (!isError || !error.data.validationErrors) return;

  const errors = error.data.validationErrors;
  if (!errors[field]?.length) return;
  return (
    <>
      {errors[field].map((errItem, index) => (
        <p key={index} className="mt-1 text-sm text-[red]">
          {errItem}
        </p>
      ))}
    </>
  );
};

export default FromError;
