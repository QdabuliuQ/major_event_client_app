import React, { useEffect, useState } from 'react'
import { getVideoPraiseList } from '@/network/praiseView/praiseView';
import { useGetHeight } from '@/hooks/useGetHeight';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollList from '@/components/scrollList/scrollList';
import { Empty } from 'react-vant';
import SkeletonVideo from "@/components/skeletonVideo/skeletonVideo";
import VideoItem from "@/components/videoItem/videoItem";
import "./praiseVideo.less"

export default function PraiseVideo() {
  const router = useNavigate()
  const location = useLocation()
  let path = location.pathname

  const [list, setList] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const [more, setMore] = useState(true)
  const [offset, setOffset] = useState(1)

  let height = useGetHeight([
    '.rv-nav-bar',
    '.rv-tabs__wrap'
  ])

  const getData = (offset: number) => {
    if(offset == 1) setLoading(true)
    if (path == '/praise/video') {
      getVideoPraiseList({
        offset
      }).then((res: any) => {
        if (offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
        setLoading(false)
      })
    } else {

    }
  }

  useEffect(() => {
    getData(1)
  }, [])

  return (
    <div id='PraiseVideo'>
      <ScrollList cb={() => {
        setOffset(offset + 1)
        getData(offset + 1)
      }} hasMore={more} height={height}>
        {
          loading ? <SkeletonVideo /> : !loading && list && list.length ? (
            <div className='listContainer'>
              {
                list.map((item: any) => (
                  <VideoItem
                    key={item.id}
                    cover_img={item.cover_img}
                    id={item.id}
                    title={item.title}
                    time={item.pub_date}
                    nickname={item.nickname}
                    user_pic={item.user_pic}
                    user_id={item.user_id}
                    collect={true}
                  ></VideoItem>
                ))
              }
            </div>
          ) : <Empty description="暂无点赞视频" />
        }
        
      </ScrollList>
    </div>
  )
}
