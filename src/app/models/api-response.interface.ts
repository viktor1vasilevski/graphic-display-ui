import { Item } from "./item.interface";
import { ServerResponse } from "./server-response.interface";

export interface ApiResponse extends ServerResponse {
    success: boolean;
    data: Item[];
    message: string;
  }