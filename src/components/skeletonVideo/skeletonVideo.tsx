import React, { memo, ReactNode } from 'react'
import { Skeleton } from 'react-vant';
import "./skeletonVideo.less"

interface IProps {
  cnt?: number
}

export default memo(function SkeletonVideo({
  cnt = 4
}: IProps) {
  return (
    <div id='skeletonVideo'>
      {
        function () {
          let doms: ReactNode[] = []
          for (let i = 0; i < cnt; i++) {
            doms.push(<div key={i} className='skeletonItem'>
              <div className='cover'>
                <Skeleton round={false} row={1} />
              </div>
              <div className='info'>
                <Skeleton rowWidth={['50%', '70%', '70%']} rowHeight={10} row={3} />
              </div>
            </div>)
          }
          return doms
        }()
      }
    </div>
  )
})
