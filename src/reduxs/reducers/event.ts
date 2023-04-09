import { ActionInt } from "@/interface/global";
import { 
  ADD_EVENT_INFO, 
} from "../constants";

export default function event(state: any, action: ActionInt) {
  const {
    type,
    data
  } = action

  switch (type) {
    case ADD_EVENT_INFO:
      return data
    default:
      return null
  }
}