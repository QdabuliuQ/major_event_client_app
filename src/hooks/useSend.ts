import { Toast } from "react-vant";
import { useSelector, useDispatch } from "react-redux";
import { add_message_info } from "@/reduxs/actions/message";

interface HookDataInt {
  type: string
  resource_info: any
}

function useSend(data: HookDataInt) {
  const dispatch = useDispatch()
  dispatch(add_message_info(data))
}

export {
  useSend
}