import { FC, ReactNode } from "react";

type StepsProps = {
  children: ReactNode,
}

const StepsContainer:FC<StepsProps> = ({ children }) => {
  return (
      <div className="steps-container">
      {children}
    </div>
  );
}

export default StepsContainer;