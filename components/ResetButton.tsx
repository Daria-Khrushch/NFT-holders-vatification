/* eslint-disable @next/next/no-img-element */
import { FC } from "react";

const ResetButton:FC = () => {
  const handleClick = () => {
    localStorage.clear();

    window.location.reload();
  };

  return (
    <div onClick={handleClick} className="reset-buttom-container">
      <div>Reset</div>
      <img src="/icon-reset.png" alt="reset" width="20" height="20"></img>
    </div>
  );
};

export default ResetButton;
