import React, { memo } from 'react'
import { Skeleton } from 'react-vant';
import "./skeletonArticle.less"

interface IProps {
  cnt?: number
}

export default memo(function SkeletonArticle({
  cnt = 1
}: IProps) {
  return (
    <div id='SkeletonArticle'>
      {
        function () {
          let doms = [];
          for (let i = 0; i < cnt; i++) {
            doms.push((<div key={i} className='skeletonItem'>
              <div className='leftSkeleton'>
                <Skeleton rowWidth={['100%', '100%', '40%']} rowHeight={12} row={3} />
              </div>
              <div className='rightSkeleton'>
                <Skeleton round={false} rowWidth='100%' rowHeight='100%' row={1} />
              </div>
            </div>))
          }
          return doms
        }()
      }
    </div>
  )
})
