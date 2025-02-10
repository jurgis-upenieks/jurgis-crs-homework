import axios from "axios";
import {Address} from "./../types/AddressTypes";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAddresses = async (): Promise<Address[]> =>
  (await axios.get(`${baseUrl}addresses`)).data
    .map((it: Address) => ({...it, uniqueKey: it.id}));
