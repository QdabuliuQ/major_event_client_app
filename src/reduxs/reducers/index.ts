import { combineReducers } from "redux";
import socket from "./socket";
import message from "./message";
import event from "./event";

// 合并reducer
const rootRedux = combineReducers({
  socket,
  message,
  event
})

export default rootRedux