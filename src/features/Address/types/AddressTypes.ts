import {BaseRow} from "@/widgets";

export type Address = BaseRow & {
  id: number;
  address: string;
  country: string;
  zip: string;
}
