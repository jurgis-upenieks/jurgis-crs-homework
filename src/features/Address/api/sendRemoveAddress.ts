import axios from "axios";
import {Address} from "./../types/AddressTypes";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sendRemoveAddress = async (id: number): Promise<Address[]> =>
  await axios.delete(`${baseUrl}addresses/${id}`);
