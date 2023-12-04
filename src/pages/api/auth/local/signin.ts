import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ name: "Method not allowed" });
  }

  const response = await fetch(`${process.env.SERVER_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(req.body),
  });
  if (response.status === 401) {
    return res.status(401).json({ error: "Unauthorized" });
  } else if (response.ok) {
    return res.status(200).json({ status: "success" });
  }
  return res.status(500).json({ error: "Internal server error" });
}
