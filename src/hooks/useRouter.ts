import { useLocation, useNavigate } from "react-router-dom";

export function useRouter() {
  const router = useNavigate()
  const state = useLocation().state
  return {
    router,
    ...state
  }
}