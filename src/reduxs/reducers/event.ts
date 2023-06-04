import { ActionInt } from "@/interface/global";
import { 
  ADD_EVENT_INFO, 
} from "../constants";

export default function event(state: any = null, action: ActionInt) {
  const {
    type,
    data
  } = action
  console.log(type, data, '执行');
  
  switch (type) {
    case ADD_EVENT_INFO:
      // state.event = data
      return data
    default:
      return state
  }
}