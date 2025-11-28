import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/db";
import CleaningLog from "@/models/CleaningLog";
import { logToBlockchain } from "@/lib/blockchain";
import { requireAuth } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Require authentication
  const user = await requireAuth(req, res);
  if (!user) return; // Response already sent by requireAuth

  await connectDB();

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

