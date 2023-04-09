import { Toast } from "react-vant";
import { useSelector, useDispatch } from "react-redux";
import v from "@/utils/globarVar";
import { init_socket } from "@/reduxs/actions/socket";

function useSocket() {
  const dispatch = useDispatch()
  let id = localStorage.getItem('id')
  const socket = useSelector((state: any) => state.socket)
  if(socket) return socket
  
  const ws = new WebSocket(`ws://${v.domain}/socketServer/${id}`);
  ws.onerror = () => { // 错误
    Toast.fail('网络错误')
  };

  dispatch(init_socket(ws))
  return ws
}

export {
  useSocket
}