import axios from "axios";
import {Address} from "./../types/AddressTypes";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sendAddAddress = async (address: Address): Promise<Address[]> =>
  await axios.post(`${baseUrl}addresses`, {address: address.address, country: address.country, zip: address.zip});
