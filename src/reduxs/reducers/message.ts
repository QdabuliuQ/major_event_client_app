import { ActionInt } from "@/interface/global";
import { 
  ADD_MESSAGE_INFO, 
  DELETE_MESSAGE_INFO 
} from "../constants";

export default function message(state: any, action: ActionInt) {
  const {
    type,
    data
  } = action

  switch (type) {
    case ADD_MESSAGE_INFO:
      return data
    case DELETE_MESSAGE_INFO:
      return null
    default:
      return null
  }
}