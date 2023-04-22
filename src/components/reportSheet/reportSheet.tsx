import React, { useEffect, useState } from 'react'
import { ActionSheet } from 'react-vant'
import PubSub from 'pubsub-js'
import { useGetReason } from '@/hooks/useGetReason'

let clickCB: Function | null = null
export default function ReportSheet() {
  const [visible, setVisible] = useState(false)
  const reason = useGetReason('2')

  const selectEvent = (e: any) => {
    clickCB && clickCB(e);
    setVisible(false)
  }

  useEffect(() => {
    PubSub.subscribe('reportSheet', (_, info: {
      cb: Function
    }) => {
      setVisible(true)
      clickCB = info.cb
    })
  }, [])

  return (
    <div className='ReportSheet'>
      <ActionSheet 
        closeOnClickOverlay={true} 
        onSelect={(e) => selectEvent(e)}
        actions={reason} 
        visible={visible}
        onCancel={() => setVisible(false)}>
      </ActionSheet>
    </div>
  )
}
