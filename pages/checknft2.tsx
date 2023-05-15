import { JsonRpcProvider } from "@mysten/sui.js";
import { FC, useEffect, useState } from "react";
import { ColorRing } from 'react-loader-spinner';
import { IRoleData, IWalletsAndDiscord } from "@/types/types";


const Test: FC = () => {
  //   const [guild, setGuild] = useState("");
  //   const [nftType, setNftType] = useState("");
  //   const [role, setRole] = useState("");
  //   const [wallets, setWallets] = useState([]);
  //   const [nftsOnWallet, setNftsOnWallet] = useState([]);
  //   const [walletsAndDiscord, setWalletsAndDiscord] = useState([]);

  const [m1, setM1] = useState('')
  const [m2, setM2] = useState('')
  const [m3, setM3] = useState('')
  const [m4, setM4] = useState('')

  
  const roleId: string | undefined = process.env.NEXT_PUBLIC_ROLE_ID;
  let nftType: string = "";
  let usersWallets: string[] = [];
  let walletAndDiscord: IWalletsAndDiscord[] = [];
  let data: IRoleData | any = {
    guild_id: "",
    role_id: roleId,
    user_id: "",
  };


  const postData = async (url: RequestInfo | URL, data: string) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function getNftId() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}getcollectionbyrole/${roleId}`
    );

    // const response = await fetch(
    //   `http://localhost:3000/api/discord`
    // );
    const responseData = await response.json();

    nftType = responseData.nft_id;
    data.guild_id = responseData.guild_id;

    console.log("function 1");
    setM1(`Done`)

  }

  async function getWallets() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}getallwalletby/${roleId}`
      );

    // const response = await fetch(`http://localhost:3000/api/allwallets`);
    const responseData = await response.json();
    responseData.forEach((element: { wallet: string }) => {
      usersWallets.push(element.wallet);
      walletAndDiscord.push(element);
    });
    console.log("function 2");
    setM2(`Done`)
  }

  // async function checkWallet(address: string) {
  //   const provider = new JsonRpcProvider();
  //   // const nfts = await provider.getObjectsOwnedByAddress(address);
  //   if (nfts.length === 0) {
  //     //   console.log("no nft");
  //     return false;
  //   } else {
  //     let nftTypes: string[] = [];
  //     nfts.forEach((n) => {
  //       nftTypes.push(n.type);
  //     });
  //     //   console.log(nftTypes.some((item) => item === nftType));
  //     setM3(`Done`)
  //     return nftTypes.some((item) => item === nftType);
  //   }
   
  // }

  // async function dellRole() {
  //   usersWallets.forEach(async (wallet) => {
  //     const result = await checkWallet(wallet);
  //     let walletToFind = "";
  //     if (result) {
  //       // console.log("true", wallet)
  //       return;
  //     } else {
  //       // console.log("false", wallet)
  //       walletToFind = wallet;
  //     }

  //     if (walletToFind !== "") {
  //       walletAndDiscord.forEach((object) => {
  //         if (object.wallet === walletToFind) {
  //           data.user_id = object.discord_id;
  //           postData(`${process.env.NEXT_PUBLIC_BOT_URL}dell_roles`, data);
  //           setM4(`Done`)
  //           console.log("role deleted");
  //         } else {
  //           return;
  //         }
  //       });
  //     }
  //   });
  // }

  async function go() {
    await getNftId();

    await getWallets();

    // await dellRole();
  }
  useEffect(() => {
    go();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>
    <ol className="checknft-list">
      <li>
        <span>Get collection by role id</span>
        {m1 ? <div>{m1} <span>&#x2705;</span></div> : <div><ColorRing /></div>}
      </li>

      <li>
        <span>Get wallets by role id</span>
        {m2 ? <div>{m2} <span>&#x2705;</span></div> : <div><ColorRing /></div>}
      </li>

      <li>
        <span>Check wallets for the required type of nft</span>
        {m3 ? <div>{m3} <span>&#x2705;</span></div> : <div><ColorRing /></div>}
      </li>

      <li>
        <span>Delete the role for a user who doesn`t have the required nft </span>
        {m4 ? <div>{m4} <span>&#x2705;</span></div> : <div><ColorRing /></div>}
      </li>
    </ol>
    
    
  </>;
};

export default Test;
