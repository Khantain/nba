import { Conference } from "./conference.interface";
import { Option } from "./option.interface";

export interface Division extends Option {
  conference: Conference['value'];
}
