import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    id: 1,
    nft_name: "Capy NFT ",
    nft_id: "0x8521368cac606257ce902ccf1735ac41d9acc709::capy::Capy",
    guild_name: "guild test",
    guild_id: "1054833212603510785",
    role_name: "test",
    role_id: "1073645849743212626",
    created_at: null,
    updated_at: null,
  });
}
