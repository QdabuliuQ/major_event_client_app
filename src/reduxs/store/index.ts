import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootRedux from "../reducers";

// 初始化仓库
export default createStore(rootRedux, composeWithDevTools())