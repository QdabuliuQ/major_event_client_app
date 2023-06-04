import { useEffect, useState } from "react";
import { getReportReason } from '@/network/reportView/reportView';

function useGetReason(type: string) {
  // const [reasons, setReasons] = useState<{
  //   type: {
  //     name: string
  //     type: string
  //   }[]
  // } | null>(null)
  const [reason1, setReason1] = useState<{
    name: string
    type: string
  }[]>([])
  const [reason2, setReason2] = useState<{
    name: string
    type: string
  }[]>([])

  useEffect(() => {
    let token = localStorage.getItem('token')
    
    if (token) {
      let _reason1 = JSON.parse(sessionStorage.getItem('reason1') as string)
      if (_reason1) setReason1(_reason1)
      else {
        getReportReason({
          type: '1',
        }).then((res: any) => {
          setReason1(res.data)
          sessionStorage.setItem('reason1', JSON.stringify(res.data))
        })
      }

      let _reason2 = JSON.parse(sessionStorage.getItem('reason2') as string)
      if (_reason2) setReason2(_reason2)
      else {
        getReportReason({
          type: '2',
        }).then((res: any) => {
          setReason2(res.data)
          sessionStorage.setItem('reason2', JSON.stringify(res.data))
        })
      }
    }
  }, [])
  
  return [reason1, reason2]
}

export {
  useGetReason
}