import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(
   [
  {
    "wallet": "0x1a43d111d1d7073c25dcfef814260a00ed94d6c9",
    "discord_id": "1042439479094427641"
  },
  {
    "wallet": "0x10a6be715f283748f942752077585da99e5b5e35",
    "discord_id": "1042439479094427648"
  }
]
  );
}
