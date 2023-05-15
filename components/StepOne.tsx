import Heading from "./Heading";
import { FC, SetStateAction, useContext, useEffect, useState } from "react";
import { ethos } from "ethos-connect";
import { toast } from "react-toastify";
import Context from "@/lib/Context";
import axios from "axios";

const StepOne: FC = () => {
  const { wallet } = ethos.useWallet();
  const { setOptionsData, collectionData, setNftUrl, nftUrl } =
    useContext(Context);
  const [message, setMessage] = useState<string | null>(null);
  const [fetchedData, setFetchedData] = useState(false);

  const postData = async (url: string, data: string) => {
    const tokenFromLocalStorage = localStorage.getItem("token");
    if (tokenFromLocalStorage) {
      return;
    }
    try {
      const response = await axios.post(url, {
        suiwallet: data,
      });
      const token = response.data.data.token;

      if (token) {
        localStorage.setItem("token", token);
      } else {
        toast.warn("Try again later!", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchNfts = async () => {

  if (!wallet?.address) return;

  const { address: suiwallet } = wallet;
  localStorage.setItem("suiwallet", suiwallet);
  postData(`${process.env.NEXT_PUBLIC_BASE_URL}authuser`, suiwallet);

    const allNftsOnWallet = wallet?.contents?.nfts;


  if (!allNftsOnWallet) {
    setMessage("You don't have NFT on your wallet");
    setOptionsData([]);
  } else {
    const nftNames = allNftsOnWallet
      .map((nft) => nft.type)
      .filter((type) => type != null);

    if (nftNames.length === 0) {
      setMessage("You don't have NFT on your wallet");
      setOptionsData([]);
    } else {
      let matchingValues: SetStateAction<string[] | null> = [];
      for (const item of collectionData) {

        for (const nft of allNftsOnWallet) {
          if (
            item.nft_id === nft.type &&
            !matchingValues.includes(item.nft_name)
          ) {

            matchingValues.push(item.nft_name);
          }
        }
      }
      setOptionsData(matchingValues);

      if (matchingValues.length === 0) {
        setMessage("Sorry, there is no necessary NFT on your wallet");
      } else {
        const userMessage = matchingValues.join(", ");
        setMessage(`You have ${userMessage} on your wallet`);
      }
    }
  }

  setFetchedData(true);
};

  useEffect(() => {
    if (!wallet?.address) return;
    fetchNfts();
    if (nftUrl) return;
    if (wallet.contents) {
      const allNfts = wallet.contents.nfts;
      let urls: string[] | null = [];
      allNfts.map((nft) => {
        if (!nft.imageUrl) return;
        // console.log(nft.imageUri)
        if (nft.imageUrl.includes("ipfs///")) {

          const ipfsURL = nft.imageUrl;
          console.log(ipfsURL)
          const trimmedUrl = ipfsURL.substring(ipfsURL.indexOf("ipfs///") + 7);
          console.log(trimmedUrl)
           urls?.push(`https://ipfs.io/ipfs/${trimmedUrl}`);
        } else {
           urls?.push(nft.imageUrl);
        }
       
      });
      setNftUrl(urls);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, fetchedData]);

  const handleConnectWalletClick = () => {
    ethos.showSignInModal();
  };

  return (
    <div className="step-wrapper">
      <Heading text="Step 1" tag="h2" />

      <div>
        {!wallet ? (
          <button
            className="button-85 button-step2"
            onClick={handleConnectWalletClick}
          >
            Connect Wallet
          </button>
        ) : (
          <div>
            <div className="widget">
              <ethos.components.AddressWidget includeMenu={false} />
            </div>
            {message ? <p>{message}</p> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default StepOne;
