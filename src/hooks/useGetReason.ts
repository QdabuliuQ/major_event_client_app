import { useEffect, useState } from "react";
import { getReportReason } from '@/network/reportView/reportView';

function useGetReason(type: string) {
  const [reason, setReason] = useState<{
    name: string
    type: string
  }[]>([])

  useEffect(() => {
    let _reason = JSON.parse(sessionStorage.getItem('reason') as string)

    if(_reason) setReason(_reason)
    else {
      getReportReason({
        type,
      }).then((res: any) => {
        setReason(res.data)
        sessionStorage.setItem('reason', JSON.stringify(res.data))
      })
    }
  }, [])

  return reason
}

export {
  useGetReason
}