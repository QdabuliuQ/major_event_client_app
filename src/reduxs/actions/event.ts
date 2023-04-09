import { 
  ADD_EVENT_INFO, 
} from "../constants";

// 添加转发信息
export function add_event_info(data: any) {
  return {
    type: ADD_EVENT_INFO,
    data
  }
}
