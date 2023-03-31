
import { 
  INIT_SOCKET ,
  DELETE_SOCKET
} from "../constants";

interface ActionInt {
  type: string
  data: any
}

// reducer函数
export default function socket(state: WebSocket | null = null, action: ActionInt) {
  const {
    type,
    data
  } = action

  switch (type) {
    case INIT_SOCKET:
      return data
    case DELETE_SOCKET:
      return null
    default:
      return state;  
  }
}