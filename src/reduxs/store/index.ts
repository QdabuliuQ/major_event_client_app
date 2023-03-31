import { legacy_createStore as createStore } from "redux";
import rootRedux from "../reducers";

// 初始化仓库
export default createStore(rootRedux)