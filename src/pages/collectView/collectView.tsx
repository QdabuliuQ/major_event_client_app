import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Tabs, Toast, SwipeCell, Empty, Button, NavBar } from 'react-vant';
import ArticleItem from "@/components/articleItem/articleItem";
import VideoItem from "@/components/videoItem/videoItem";
import ScrollList from "@/components/scrollList/scrollList";
import SkeletonArticle from "@/components/skeletonArticle/skeletonArticle";
import SkeletonVideo from "@/components/skeletonVideo/skeletonVideo";
import { getCollectList, getCollectVideo } from "@/network/collectView/collectView";
import { collectArticle } from "@/network/articleView/articleView";
import "./collectView.less"

export default function CollectView() {
  const router = useNavigate()

  // let offset = 1
  const [offset, setOffset] = useState(1)
  const [type, setType] = useState(0)
  const [collect, setCollect] = useState<any>([])
  const [height, setHeight] = useState<number>(0)
  const [more, setMore] = useState<boolean>(true)
  const [loading, setLoading] = useState(true)

  const itemClick = (id: string) => {
    router('/article/' + id)
  }

  const cancelCollect = (id: string, index: number) => {
    collectArticle({
      id,
      is_collect: 0
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('操作失败')
      }
      let arr = [...collect]
      arr.splice(index, 1)
      setCollect(arr)
    })
  }

  const getData = (type: number = 0, _offset: number = 1) => {
    if(_offset == 1) setLoading(true)
    if (type == 0) {
      getCollectList({
        offset: _offset
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('网络错误')
        }
        if (_offset == 1) {
          setCollect(res.data)
        } else {
          setCollect([...collect, ...res.data])
        }
        setMore(res.more)
        setLoading(false)
      })
    } else if (type == 1) {
      getCollectVideo({
        offset: _offset as number,
        pageSize: 30
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('网络错误')
        }
        if (_offset == 1) {
          setCollect(res.data)
        } else {
          setCollect([...collect, ...res.data])
        }
        setMore(res.more)
        setLoading(false)
      })
    }
  }

  const collectCb = (i: number) => {  // 取消收藏回调
    collect.splice(i, 1)
    setCollect([...collect])
  }

  useEffect(() => {
    getData()
    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight - document.getElementsByClassName('rv-tabs')[0].clientHeight)
  }, [])

  return (
    <div id='CollectView'>
      <NavBar
        fixed={true}
        placeholder={true}
        title="收藏"
        onClickLeft={() => router(-1)}
      />
      <Tabs onChange={(e: any) => {
        setOffset(1)
        setMore(true)
        setType(e)
        getData(e, 1)
      }}>
        <Tabs.TabPane title='文章' />
        <Tabs.TabPane title='视频' />
      </Tabs>
      {
        collect.length ? (
          <ScrollList
            cb={() => {
              setOffset(offset + 1)
              getData(type, offset + 1)
            }}
            hasMore={more}
            height={height}>
            {
              type == 0 ? (loading ? <SkeletonArticle cnt={5} /> : !loading && collect[0].art_id && collect.map((item: any, index: number) => {
                return <div key={item.id} className='collectItem'>
                <SwipeCell
                  rightAction={
                    <Button onClick={() => cancelCollect(item.id, index)} style={{ height: '100%' }} square type="danger">
                      取消收藏
                    </Button>
                  }
                >
                  <ArticleItem browse_count={item.browse_count} id={item.art_id} clickEvent={itemClick} title={item.title} content={item.content} cover={item.cover_img} time={item.pub_date}></ArticleItem>
                </SwipeCell>
              </div>
              })) : (
                loading ? <SkeletonVideo /> : collect[0].video_id &&
                <div className='collectVideoContainer'>
                  {
                    collect.map((item: any, index: number) => <VideoItem
                      key={item.video_id}
                      cover_img={item.cover_img}
                      id={item.video_id}
                      title={item.title}
                      time={item.pub_date}
                      nickname={item.nickname}
                      user_pic={item.user_pic}
                      user_id={item.user_id}
                      collect={true}
                      index={index}
                      collectCb={collectCb}
                    />)
                  }
                </div>
              )
            }
            
            
          </ScrollList>

        ) : <Empty description="暂无收藏文章" />
      }
    </div >
  )
}

// {
            //   type == 1 && collect[0].video_id && (
            //     <div className='collectVideoContainer'>
            //       {
            //         collect.map((item: any, index: number) => <VideoItem
            //           key={item.video_id}
            //           cover_img={item.cover_img}
            //           id={item.video_id}
            //           title={item.title}
            //           time={item.pub_date}
            //           nickname={item.nickname}
            //           user_pic={item.user_pic}
            //           user_id={item.user_id}
            //           collect={true}
            //           index={index}
            //           collectCb={collectCb}
            //         />)
            //       }
            //     </div>
            //   )
            // }
