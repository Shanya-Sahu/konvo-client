// context/functions/verifyToken.ts
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE!;

export default async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;
  try {
    await axios.get(`${API_BASE}/auth/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    return false;
  }
}
