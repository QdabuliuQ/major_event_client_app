import { combineReducers } from "redux";
import socket from "./socket";

// 合并reducer
const rootRedux = combineReducers({
  socket
})

export default rootRedux