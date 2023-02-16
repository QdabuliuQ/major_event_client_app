import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Empty, NavBar, Tabs, Toast } from 'react-vant';
import { getVideoById, deleteVideoById } from "@/network/myVideoList/myVideoList";
import VideoItem from "./videoItem/videoItem";
import ScrollList from "@/components/scrollList/scrollList";
import "./myVideoList.less"

export default function MyVideoList() {

  const [offset, setOffset] = useState(1)
  const [list, setList] = useState<any>([])
  const [more, setMore] = useState(true)
  const [height, setHeight] = useState(0)
  const [state, setState] = useState('0')

  const router = useNavigate()

  const getData = (state: string = '0', offset: number = 1) => {
    getVideoById({
      state,
      offset
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('网络错误')
      }
      if (offset == 1) {
        setList(res.data)
      } else {
        setList([...list, ...res.data])
      }
      setMore(res.more)
    })
  }

  const deleteEvent = (id: string, i: number) => {
    deleteVideoById({
      id
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail('删除失败')
      }
      Toast.fail('删除成功')
      list[i].state = '4'
      setList([...list])
    })
  }

  useEffect(() => {
    getData()
    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight - document.getElementsByClassName('rv-tabs')[0].clientHeight)
  }, [])

  return (
    <div id='MyVideoList'>
      <NavBar
        title="视频管理"
        onClickLeft={() => router(-1)}
      />
      <Tabs onChange={(e: any) => {
        setOffset(1)
        setState(e)
        setMore(true)

        getData(e.toString(), 1)
      }}>
        <Tabs.TabPane title='全部' />
        <Tabs.TabPane title='审核中' />
        <Tabs.TabPane title='正常' />
        <Tabs.TabPane title='封禁' />
        <Tabs.TabPane title='删除' />
      </Tabs>
      {
        list.length ? (
          <ScrollList
            cb={() => {
              setOffset(offset + 1)
              getData(state, offset + 1)
            }}
            hasMore={more}
            height={height}
          >
            <div className='listContainer'>
              {
                list.map((item: any, index: number) => (
                  <VideoItem
                    key={item.id}
                    index={index}
                    deleteEvent={deleteEvent}
                    collect_count={item.collect_count}
                    comment_count={item.comment_count}
                    cover_img={item.cover_img}
                    duration={item.duration}
                    id={item.id}
                    praise_count={item.praise_count}
                    state={item.state}
                    time={item.time}
                    title={item.title}
                    user_id={item.user_id}
                    video_url={item.video_url}
                  />
                ))
              }
            </div>
          </ScrollList>
        ) : <Empty description="暂无相关视频" />
      }
    </div>
  )
}
