import api from "./api";
import type { Factory } from "@/types";

export async function getFactories(): Promise<Factory[]> {
  const response = await api.get<Factory[]>("/factories");
  return response.data;
}
