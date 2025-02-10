import axios from "axios";
import {Address} from "./../types/AddressTypes";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const sendSaveAddress = async (address: Address): Promise<Address[]> =>
  await axios.put(`${baseUrl}addresses/${address.id}`, {address: address.address, country: address.country, zip: address.zip});
