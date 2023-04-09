import { useNavigate } from "react-router-dom";

export function useRouter() {
  const router = useNavigate()

  return {
    router
  }
}