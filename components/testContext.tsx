import React, { useState, useEffect, createContext, ReactNode } from "react";
import colorFunction from "../js/select";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

type contextType = {
  optionsData: string[] | null;
  handleChange: (newValue: string) => void;
  optionValue: string;
  setOptionsData: React.Dispatch<React.SetStateAction<string[] | null>>;
  userDiscordAvatar: string | null;
  discriminator: string | null;
  userDiscordName: string | null;
  userDiscordId: string | null;
  handleStep4Click: () => void;
  messageStep4: string;
  collectionData: CollectionDataType[];
};

type CollectionDataType = {
  id: number;
  nft_name: string;
  nft_id: string;
  guild_name: string;
  guild_id: string;
  role_name: string;
  role_id: string;
  created_at: null | string;
  updated_at: null | string;
};

type Props = {
  children: ReactNode;
};

const Context = createContext<contextType>({
  optionsData: [],
  handleChange: () => {},
  optionValue: "",
  setOptionsData: () => {},
  userDiscordAvatar: "",
  discriminator: "",
  userDiscordName: "",
  userDiscordId: "",
  handleStep4Click: () => {},
  messageStep4: "",
  collectionData: [],
});

export const DataProvider = ({ children }: Props) => {
  const router = useRouter();
  const [optionsData, setOptionsData] = useState<string[] | null>(null);
  const [optionValue, setOptionValue] = useState("");
  const [collectionData, setCollectionData] = useState<CollectionDataType[]>(
    []
  );
  const [messageStep4, setMessageStep4] = useState("");
  const [userDiscordAvatar, setUserDiscordAvatar] = useState<string | null>(
    null
  );
  const [discriminator, setDiscriminator] = useState<string | null>(null);
  const [userDiscordName, setUserDiscordName] = useState<string | null>(null);
  const [userDiscordId, setUserDiscordId] = useState<string | null>(null);

  // Get NFT collection from server on first page load

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}getallcollection`)
      .then((response) => {
        const data = response.data;
        setCollectionData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Check is there selected NFT on Step 3 on first load page
  useEffect(() => {
    let selectedNft = localStorage.getItem("selectedNft");
    if (selectedNft) {
      setOptionValue(selectedNft);
      colorFunction();
    }
  }, []);

  // Step 2
  // Get the code from url after user connect discord
 const postDataStep2 = async (
    url: string,
    data: ParsedUrlQuery
  ) => {
    const code = data.code;
    const token = localStorage.getItem("token");
    const suiwallet = localStorage.getItem("suiwallet");

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        params: {
          code: code,
          suiwallet: suiwallet
        }
      });

      setUserDiscordAvatar(response.data.avatar);
      setDiscriminator(response.data.discriminator);
      setUserDiscordId(response.data.discord_id);
      setUserDiscordName(response.data.username);
      localStorage.setItem("discord_username", response.data.username);
      localStorage.setItem("discord_discriminator", response.data.discriminator);
      localStorage.setItem("discord_avatar", response.data.avatar);
      localStorage.setItem("discord_userId", response.data.discord_id);
    } catch (error) {
      console.log(error);
    }
  };

  let code = router.query["code"];

  useEffect(() => {
    let suiwallet = localStorage.getItem("suiwallet");
    let username = localStorage.getItem("discord_username");
    let dis = localStorage.getItem("discord_discriminator");
    let avatar = localStorage.getItem("discord_avatar");
    let id = localStorage.getItem("discord_userId");
    const codeToSend = router.query;
    if (username) {
      setUserDiscordAvatar(avatar);
      setDiscriminator(dis);
      setUserDiscordName(username);
      setUserDiscordId(id);
      return;
    } else if (code) {
      if (!suiwallet) {
        router.push("/");
        return;
      }
      postDataStep2(`${process.env.NEXT_PUBLIC_BASE_URL}callback2`, codeToSend);
    }
  }, [code, router]);
  // let code = router.query["code"];

  // const postDataStep2 = async (
  //   _url: RequestInfo | URL,
  //   data: ParsedUrlQuery
  // ) => {
  //   const code = data.code;
  //   const token = localStorage.getItem("token");
  //   const suiwallet = localStorage.getItem("suiwallet");

  //   try {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_BASE_URL}callback2?code=${code}&suiwallet=${suiwallet}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //     const responseData = await response.json();
  //     setUserDiscordAvatar(responseData.avatar);
  //     setDiscriminator(responseData.discriminator);
  //     setUserDiscordId(responseData.discord_id);
  //     setUserDiscordName(responseData.username);
  //     localStorage.setItem("discord_username", responseData.username);
  //     localStorage.setItem("discord_discriminator", responseData.discriminator);
  //     localStorage.setItem("discord_avatar", responseData.avatar);
  //     localStorage.setItem("discord_userId", responseData.discord_id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   let suiwallet = localStorage.getItem("suiwallet");
  //   let username = localStorage.getItem("discord_username");
  //   let dis = localStorage.getItem("discord_discriminator");
  //   let avatar = localStorage.getItem("discord_avatar");
  //   let id = localStorage.getItem("discord_userId");
  //   const codeToSend = router.query;
  //   if (username) {
  //     setUserDiscordAvatar(avatar);
  //     setDiscriminator(dis);
  //     setUserDiscordName(username);
  //     setUserDiscordId(id);
  //     return;
  //   } else if (code) {
  //     if (!suiwallet) {
  //       router.push("/");
  //       return;
  //     }
  //     postDataStep2(`${process.env.NEXT_PUBLIC_BASE_URL}callback2`, codeToSend);
  //   }
  // }, [code, router]);

  //Step 3

  // Set selected value
  const handleChange = (newValue: string) => {
    if (!userDiscordId) {
      toast.warn("Connect your Discord, please!", {
        theme: "dark",
      });
      return;
    }
    setOptionValue(newValue);
    localStorage.setItem("selectedNft", newValue);
    colorFunction();
  };
 
  // Set options values from allcollection data
  useEffect(() => {
    const getAllCollection = () => {
      const data = collectionData;
      let optionsArr: string[] = [];
      data.forEach((element: { nft_name: string }) => {
        optionsArr?.push(element.nft_name);
      });
      setOptionsData(optionsArr);
    };
    getAllCollection();
  }, [collectionData]);

  // Step 4
  // choice of role and guild in accordance with the selected type of NFT in step 3
  // send the post req to claim the role
  const handleStep4Click = async () => {
    const token = localStorage.getItem("token");
    const suiwallet = localStorage.getItem("suiwallet");
    const postData = {
      guild_id: "",
      role_id: "",
      user_id: userDiscordId,
    };
    for (let i = 0; i < collectionData.length; i++) {
      const item = collectionData[i];
      if (item.nft_name.trimEnd() === optionValue) {
        postData.guild_id = item.guild_id;
        postData.role_id = item.role_id;
      }
    }

    if (!optionValue) {
      toast.warn("Select NFT type, please!", {
        theme: "dark",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BOT_URL}set_roles`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      const result = response.data.status;
      if (result === "200") {
        setMessageStep4("Role added successfully");
        const response2 = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}setregister`,
          {
            wallet: suiwallet,
            role_id: postData.role_id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
      } else {
        toast.error("Error! Try again later", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error! Try again later", {
        theme: "dark",
      });
    }
  };

  // const handleStep4Click = async () => {
  //   let token = localStorage.getItem("token");
  //   let suiwallet = localStorage.getItem("suiwallet");
  //   const postData = {
  //     guild_id: "",
  //     role_id: "",
  //     user_id: userDiscordId,
  //   };
  //   for (let i = 0; i < collectionData.length; i++) {
  //     const item = collectionData[i];
  //     if (item.nft_name.trimEnd() === optionValue) {
  //       postData.guild_id = item.guild_id;
  //       postData.role_id = item.role_id;
  //     }
  //   }

  //   if (!optionValue) {
  //     toast.warn("Select NFT type, please!", {
  //       theme: "dark",
  //     });
  //     return;
  //   } else {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_BOT_URL}set_roles`,
  //         // `http://localhost:3001/api/set_roles`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + token,
  //           },
  //           body: JSON.stringify(postData),
  //         }
  //       );
  //       const data = await response.json();
  //       const result = data.status;
  //       if (result === "200") {
  //         setMessageStep4("Role added successfully");
  //         try {
  //           const response = await fetch(
  //             `${process.env.NEXT_PUBLIC_BASE_URL}setregister`,
  //             {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type": "application/json",
  //                 Authorization: "Bearer " + token,
  //               },
  //               body: JSON.stringify({
  //                 wallet: suiwallet,
  //                 role_id: postData.role_id,
  //               }),
  //             }
  //           );
  //         } catch (error) {
  //           console.log(error);
  //         }
  //       } else {
  //         toast.error("Error! Try again later", {
  //           theme: "dark",
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const handleStep4Click = async () => {
  //   let token = localStorage.getItem("token");
  //   let suiwallet = localStorage.getItem("suiwallet");

  //   const postData = {
  //     guild_id: "1054833212603510785",
  //     role_id: "1073645849743212626",
  //     user_id: "1042439479094427648",
  //   };
  //   try {
  //     const response = await fetch(
  //       // `${process.env.NEXT_PUBLIC_BOT_URL}set_roles`,
  //       `http://localhost:3001/api/set_roles`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token,
  //         },
  //         body: JSON.stringify(postData),
  //       }
  //     );
  //     const data = await response.json();
  //     const result = data.status;
  //     console.log(data);
  //     if (result === "200") {
  //       setMessageStep4("Role added successfully");
  //       try {
  //         const response = await fetch(
  //           `${process.env.NEXT_PUBLIC_BASE_URL}setregister`,
  //           {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: "Bearer " + token,
  //             },
  //             body: JSON.stringify({
  //               wallet: suiwallet,
  //               role_id: postData.role_id,
  //             }),
  //           }
  //         );
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     } else {
  //       toast.error("Error! Try again later", {
  //         theme: "dark",
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // console.log(optionValue);
  //   // console.log(collectionData);
  //   // console.log(postData);
  // };

  // Step 2

  const contextValues = {
    optionsData,
    handleChange,
    optionValue,
    setOptionsData,
    discriminator,
    userDiscordAvatar,
    userDiscordId,
    userDiscordName,
    handleStep4Click,
    messageStep4,
    collectionData,
  };

  return <Context.Provider value={contextValues}>{children}</Context.Provider>;
};

export default Context;
