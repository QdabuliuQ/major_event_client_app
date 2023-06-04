import React, { useEffect, useState } from 'react'
import { ActionSheet } from 'react-vant'
import PubSub from 'pubsub-js'
import { useGetReason } from '@/hooks/useGetReason'

let clickCB: Function | null = null
export default function ReportSheet() {
  const [type, setType] = useState('1')
  const [visible, setVisible] = useState(false)
  let reason1 = useGetReason('1')[0]
  let reason2 = useGetReason('2')[1]
  
  const selectEvent = (e: any) => {
    clickCB && clickCB(e);
    setVisible(false)
  }

  useEffect(() => {
    PubSub.subscribe('reportSheet', (_, info: {
      cb: Function
      type: string
    }) => {
      setType(info.type)
      setVisible(true)
      clickCB = info.cb
    })
  }, [])

  return (
    <div className='ReportSheet'>
      <ActionSheet 
        closeOnClickOverlay={true} 
        onSelect={(e) => selectEvent(e)}
        actions={type == '1' ? reason1 : reason2} 
        visible={visible}
        onCancel={() => setVisible(false)}>
      </ActionSheet>
    </div>
  )
}
