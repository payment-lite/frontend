import { axiosServer } from "@/utils/axios/axiosInstance";
import axios from "axios";
import "dotenv/config";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ name: "Method not allowed" });
  }

  try {
    const response = await axiosServer.post("/signup", req.body);
    if (response.status === 200) {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.status);
      if (error.response) {
        return res
          .status(error.response.status)
          .json({ error: error.response.data.message });
      }
    }
    return res.status(500).json({ error: error });
  }
}
