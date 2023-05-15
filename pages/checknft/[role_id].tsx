/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { JsonRpcProvider } from "@mysten/sui.js";
import { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";

type WalletAndDiscord = {
  discord_id: string;
  wallet: string;
};

type PostData = {
  role_id: string;
  guild_id: string;
  user_id: string;
};

function RoleIdPage() {
  const router = useRouter();
  const [nftId, setNftId] = useState("");
  const [guild, setGuild] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [role, setRole] = useState("");
  const [postData, setPostData] = useState<PostData>({
    role_id: "",
    guild_id: "",
    user_id: "",
  });
  const [walletsAndDiscordCollection, setWalletsAndDiscordCollection] =
    useState<WalletAndDiscord[]>([]);

  let role_id = router.query["role_id"];

  async function getCollectionByRole(roleId: string | string[]) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}getcollectionbyrole/${roleId}`
      );
      const responseData = await response.json();
      //записываем айди роли и айди гильдии для отправки на бота для удаления роли
      setPostData((prevState) => ({
        ...prevState,
        role_id: responseData.role_id,
        guild_id: responseData.guild_id,
      }));
      setGuild(responseData.guild_id);
      setRole(responseData.role_id);

      setNftId(responseData.nft_id);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWallets(roleId: string | string[]) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}getallwalletby/${roleId}`
      );
      const responseData = await response.json();
      // записываем какие адреса кошельков и дискорд айди у которых есть эта роль
      setWalletsAndDiscordCollection(responseData);
      // console.log(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkWallet(address: string) {
    try {
      const provider = new JsonRpcProvider();
      // достаем айди объектов по адресу кошелька
      const objects = await provider.getOwnedObjects({
        owner: address,
      });
      const obj = objects.data;
      let objectsIds: string[] = [];
      let nftTypesArr: string[] = [];
      let result = "has not";
      // записываем в массив айди объектов проверяя на не совпадение
      obj.forEach((element) => {
        if (element.data && !objectsIds.includes(element.data.objectId)) {
          objectsIds.push(element.data.objectId);
        }
        // console.log(element.data?.objectId);
      });

      // console.log(objectsIds);
      // You can also fetch multiple objects in one batch request
      if (objectsIds.length > 0) {
        const txns = await provider.multiGetObjects({
          ids: [...objectsIds],
          // only fetch the object type
          options: { showType: true },
        });
        txns.forEach((element) => {
          if (element.data?.type && !nftTypesArr.includes(element.data.type)) {
            nftTypesArr.push(element.data.type);
          }

          // console.log(element.data?.objectId)
        });
        for (let i = 0; i < nftTypesArr.length; i++) {
          if (nftId.includes(nftTypesArr[i])) {
            result = "has";
            // console.log(result);
            return result;
          }
        }

        // console.log(txns)
      }

      // console.log("objects on wallet address", objects)
      // console.log(txn)
      // console.log(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    walletsAndDiscordCollection.forEach(async (item) => {
      let result = await checkWallet(item.wallet);
      if (result === "has not") {
        // console.log(item.discord_id);
        setPostData((prevState) => ({
          ...prevState,
          user_id: item.discord_id,
        }));
      }
      // console.log(result);
    });
  }, [walletsAndDiscordCollection]);

  useEffect(() => {
    const isDataComplete = Object.values(postData).every(
      (value) => value !== ""
    );
    const dellRole = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BOT_URL}dell_roles`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );
      } catch (error) {
        console.log(error);
      }
    };
    if (isDataComplete) {
      setUsers((prevUsers) => [...prevUsers, postData.user_id]);
      // console.log("guild", postData.guild_id);
      dellRole();
    }

    // console.log(postData);
    //   console.log(nftId)
  }, [postData]);

  useEffect(() => {
    if (role_id) {
      // если а URL присутствует айди роли отправляется запрос
      getCollectionByRole(role_id);
      // также получаем коллекцию всех кошельков и дискорд айди у кого есть єта роль
      getWallets(role_id);
    }
  }, [role_id, router]);

  return (
    <div className="checknft-container">
      <h2>
        ID role to delete:
        {role ? (
          <div>{role}</div>
        ) : (
          <div>
            <ColorRing />
          </div>
        )}
      </h2>
      <h2>
        In guild ID:
        {guild ? (
          <div>{guild}</div>
        ) : (
          <div>
            <ColorRing />
          </div>
        )}
      </h2>
      <h2>
        For Users with discord IDs:
        {users ? (
          users.map((u) => <div key={Math.random()}>{u}</div>)
        ) : (
          <div>
            <ColorRing />
          </div>
        )}
      </h2>
    </div>
  );
}

export default RoleIdPage;
