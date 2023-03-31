import { 
  ADD_MESSAGE_INFO, 
  DELETE_MESSAGE_INFO 
} from "../constants";

// 添加发送信息
export function add_message_info(data: any) {
  return {
    type: ADD_MESSAGE_INFO,
    data
  }
}

// 删除发送信息
export function delete_message_info() {
  return {
    type: DELETE_MESSAGE_INFO,
    data: null
  }
}