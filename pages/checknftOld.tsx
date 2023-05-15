import { JsonRpcProvider } from "@mysten/sui.js";

import { useState } from "react";

const Checknft = () => {
  const [guild, setGuild] = useState("");
  const [nft, setNft] = useState("");
  const [role, setRole] = useState("");

  const roleId = process.env.NEXT_PUBLIC_ROLE_ID;
  // const postData = async (url: RequestInfo | URL, data: string) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       mode: "no-cors",
  //       cache: "no-cache",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async function getNftId() {
    const response = await fetch(
      `http://holderbot.cryto.men/api/getcollectionbyrole/${roleId}`
    );
    const responseData = await response.json();

    setGuild(responseData.guild_id);
    setNft(responseData.nft_id);
    setRole(responseData.role_id);
  }

  getNftId();

  async function checkWallets() {
    const response = await fetch(
      `http://holderbot.cryto.men/api/getallwalletby/${roleId}`
    );
    const responseData = await response.json();
    let wallets: string[] = []; // записываем массив с адресами кошельков из ответа сервера
    responseData.forEach((element: { wallet: string }) => {
      wallets.push(element.wallet);
    });
    // const data = {
    //   guild_id: responseData.guild_id,
    //   role_id: responseData.role_id,
    //   user_id: responseData.user_id,
    // };

    const nftType = nft; // тип NFT, который нужно проверить в кошельках
    let foundNFT = false; // флаг, указывающий, найден ли нужный тип NFT
  
   return foundNFT
    // for (const wallet of wallets) {
    //   const provider = new JsonRpcProvider();
    //   const nfts = await provider.getObjectsOwnedByAddress(wallet); // получаем список NFT, находящихся в кошельке
    //   // console.log(nfts);
    //   for (const nft of nfts) {
    //     if (nft.type === nftType) {
    //       // если нашли нужный тип NFT
    //       console.log("user has this type of nft");
    //       console.log(wallets)
    //       foundNFT = true;
    //       break;
    //     }
    //   }

    //   if (foundNFT) {
    //     console.log(wallets)
    //     // если уже найден нужный тип NFT, завершаем цикл
    //     break;
    //   }
    // }

    // if (!foundNFT) {
    //   console.log(wallets)
    //   // если нужный тип NFT не найден, отправляем запрос на "dell/role"
    //   console.log("the role deleted");
    //   // postData(`${process.env.NEXT_PUBLIC_BOT_URL}dell_roles`, data);
    //   // обработка результата запроса на "dell/role"
    // }
  }

  checkWallets();

  return <div>NFT</div>;
};

export default Checknft;
