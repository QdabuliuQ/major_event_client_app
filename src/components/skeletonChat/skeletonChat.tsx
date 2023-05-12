import React, { memo, ReactNode } from 'react'
import { Skeleton } from 'react-vant';
import "./skeletonChat.less"

interface IProps {
  cnt?: number
}

export default memo(function SkeletonChat({
  cnt = 4
}: IProps) {
  return (
    <div id='SkeletonChat'>
      {
        function () {
          let doms: ReactNode[] = []
          for (let i = 0; i < cnt; i++) {
            doms.push(<div key={i} className='skeletonItem'>
              <Skeleton rowWidth={['50%', '30%']} avatarSize={'13.33333vw'} row={2} rowHeight={10} avatar />
            </div>)
          }
          return doms
        }()
      }
    </div>
  )
})
