import axios from "axios";
import "dotenv/config";

// Membuat interface untuk konfigurasi header yang diinginkan
interface AxiosServerConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

// Fungsi untuk membuat instance Axios dengan konfigurasi khusus
export const axiosServer = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});
