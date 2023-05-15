/* eslint-disable @next/next/no-img-element */
import Context from "@/lib/Context";
import { useContext } from "react";
import { Scrollbar } from "react-scrollbars-custom";

const NftImages = () => {
  const { nftUrl } = useContext(Context);
  
  return (
    <div className="data-container">
      <div>
        {nftUrl ? (
        
          <ul className="nft-list">
              <Scrollbar noScrollX={true} style={{ height: 578, width: 90 }}>
              {nftUrl.map((nft) => {
                return (
                  <li key={`${Math.random()}${nft}`}>
                    <img
                      className="nft-image animate"
                      height="70"
                      src={nft}
                      alt="nft image"
                    ></img>
                  </li>
                );
              })}
              </Scrollbar>
            </ul>
        
        ) : null}
      </div>
    </div>
  );
};

export default NftImages;
