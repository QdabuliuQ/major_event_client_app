import { combineReducers } from "redux";
import socket from "./socket";
import message from "./message";

// 合并reducer
const rootRedux = combineReducers({
  socket,
  message
})

export default rootRedux