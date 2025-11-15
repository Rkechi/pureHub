import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/db";
import CleaningLog from "@/models/CleaningLog";
import { logToBlockchain } from "@/lib/blockchain";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    const blockchainData = await logToBlockchain(req.body);
    const newLog = await CleaningLog.create({
      ...req.body,
      blockchainHash: blockchainData.hash,
    });
    return res.status(201).json({ success: true, data: newLog });
  }

  if (req.method === "GET") {
    const logs = await CleaningLog.find({});
    return res.status(200).json({ success: true, data: logs });
  }

  res.status(405).end();
}

