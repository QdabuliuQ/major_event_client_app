import React, { ReactNode } from 'react'
import { Skeleton } from 'react-vant';
import "./skeletonComment.less"

interface IProps {
  cnt?: number
}

export default function SkeletonComment({
  cnt = 3
}: IProps) {
  return (
    <div id='skeletonComment'>
      {
        function() {
          let doms: ReactNode[] = []
          for(let i = 0; i < cnt; i ++) {
            doms.push(<Skeleton key={i} rowWidth={['20%', '100%', '80%', '50%']} rowHeight={'2vh'} row={4} avatar />)
          }
          return doms
        }()
      }
    </div>
  )
}
