import Heading from "./Heading";
import { FC, useContext } from "react";
import Context from "@/lib/Context";

const StepFour: FC = () => {
  const { handleStep4Click, messageStep4} = useContext(Context)

  return (
    <div className="step-wrapper">
      <Heading text="Step 4" tag="h2" />
      {messageStep4 ? (
        <div className="discord-info-container">
          <span>{messageStep4}</span>
        </div>
      ) : (
          <button className="button-85 button-step3" onClick={handleStep4Click}>
          Claim role
        </button>
      )}
    </div>
  );
};

export default StepFour;
