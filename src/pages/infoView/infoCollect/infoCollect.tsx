import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Toast, Empty } from 'react-vant';
import { getUserCollectById, getUserCollectVideoById } from "@/network/infoView/infoView";
import ArticleItem from "@/components/articleItem/articleItem";
import VideoItem from "@/components/videoItem/videoItem";
import "./infoCollect.less"

let infoCollect_offset = 1

interface IProps {
  toggleEvent: () => void
}

export const InfoCollect = forwardRef((props: IProps, ref) => {
  const { id } = useLocation().state
  const router = useNavigate()
  useImperativeHandle(ref, () => ({
    getData,
    more,
    setOffset,
    getType,
    getMore
  }))

  const [type, setType] = useState(0)
  const [list, setList] = useState<any>([])
  const [more, setMore] = useState(true)

  const getType = () => {
    return type
  }
  const toggleType = (type: number) => {
    setOffset()
    props.toggleEvent()
    getData(type)
    setMore(true)
    setType(type)
  }
  const getMore = () => more
  const setOffset = () => {
    infoCollect_offset = 1
  }
  const getData = (type: number) => {
    if(type == 0) {
      getUserCollectById({
        id: id as string,
        offset: infoCollect_offset
      }).then((res: any) => {
        if(res.status) {
          return Toast.fail('网络错误')
        }
        if (infoCollect_offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
        infoCollect_offset ++
      })
    } else {
      getUserCollectVideoById({
        id: id as string,
        offset: infoCollect_offset
      }).then((res: any) => {
        if(res.status) {
          return Toast.fail('网络错误')
        }
        if (infoCollect_offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
        infoCollect_offset ++
      })
    }
  }

  useEffect(() => {
    infoCollect_offset = 1
    getData(0)
  }, [])

  return (
    <div id="InfoCollect">
      <div className='typeToggle'>
        <div onClick={() => toggleType(0)} className={`typeItem ${type == 0 ? 'activeItem' :'' }`}>文章</div>
        <div onClick={() => toggleType(1)} className={`typeItem ${type == 1 ? 'activeItem' :'' }`}>视频</div>
      </div>
      {
        list.length ? (
          type == 0 ? (
            list.map((item: any) => (
              <ArticleItem key={item.id} browse_count={item.browse_count} id={item.art_id} clickEvent={() => router('/article/'+item.id)} title={item.title} content={item.content} cover={item.cover_img} time={item.pub_date} />
            ))
          ) : (
            <div className='collectVideoList'>
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
                  />
                ))
              }
            </div>
          )
        ) : <Empty description={`暂无收藏${type == 0 ? '文章' : '视频'}`} />
      }
    </div>
  )
})
