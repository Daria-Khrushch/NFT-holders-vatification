import Heading from "./Heading";
import { FC, useContext } from "react";
import Context from "@/lib/Context";

type StepThreeType = {
  handleSelectChange: (event: string) => void;
}

const StepThree:FC<StepThreeType> = () => {
  const { optionsData, handleChange, optionValue } = useContext(Context)

  const handleSelectChange = (event: { target: { value: string; }; }) => {
    handleChange(event.target.value);
  };

  return (
    <div>
      <Heading text="Step 3" tag="h2"/>
      <div className="select-nft-container">
      <select value={optionValue} name="pets" id="select1" className="select-nft" onChange={handleSelectChange}>
        <option className="select-nft default-option-nft">-Please choose an option-</option>
        {optionsData && optionsData.map((nft) => {
          return (
            <option key={`${Math.random()}${nft}`} value={nft} className="select-nft option-nft">
              {nft}
            </option>
          );
        })}
              </select>
              </div>
    </div>
  );
};

export default StepThree;
