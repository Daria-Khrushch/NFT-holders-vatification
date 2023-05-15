/* eslint-disable @next/next/no-img-element */
import Heading from "./Heading";
import { FC, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "@/lib/Context";

const StepTwo: FC = () => {
  const { discriminator, userDiscordAvatar, userDiscordId, userDiscordName } =
    useContext(Context);

  const handleClick = () => {
    let suiwallet = localStorage.getItem("suiwallet");

    if (!suiwallet) {
      toast.warn("Connect your SUI wallet, please", {
        theme: "dark",
      });
    } else {
      window.location.replace(
        `https://discord.com/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code&scope=identify%20email%20guilds&prompt=none`
      );
    }
    return;
  };

  return (
    <div className="step-wrapper">
      <Heading text="Step 2" tag="h2" />
      {!userDiscordName ? (
        <button className="button-85 button-step2" onClick={handleClick}>
          Login with Discord
        </button>
      ) : (
        <div className="discord-info-container">
          <img
            src={`https://cdn.discordapp.com/avatars/${userDiscordId}/${userDiscordAvatar}?size=32`}
            alt="user avatar"
            width="32"
            height="32"
          />
          <div className="discord-name-container">
            <span>{userDiscordName} </span>
            <span>{`#${discriminator}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepTwo;
