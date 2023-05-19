import React, { ReactNode } from 'react'
import { Skeleton } from 'react-vant'
import "./skeletonEvent.less"

interface IProps {
  cnt?: number
}

export default function SkeletonEvent({
  cnt = 2
}: IProps) {
  return (
    <div id='SkeletonEvent'>
      {
        function() {
          let doms: ReactNode[] = []
          for(let i = 0; i < cnt; i ++) {
            doms.push(<Skeleton key={i} rowWidth={['30%', '100%', '100%', '100%']} rowHeight={['2.5vh','2.5vh','2.5vh', '25vh', '2.5vh']} row={5} avatar />)
          }
          return doms
        }()
      }
    </div>
  )
}
