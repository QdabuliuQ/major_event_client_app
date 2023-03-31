import { INIT_SOCKET, DELETE_SOCKET } from "../constants";

// 初始化socket
export function init_socket(data: WebSocket) {
  return {
    type: INIT_SOCKET,
    data
  }
}