import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { Toast, Empty } from 'react-vant';
import { getUserCollectById } from "@/network/infoView/infoView";
import ArticleItem from "@/components/articleItem/articleItem";

let infoCollect_offset = 1

export const InfoCollect = forwardRef(({ }, ref) => {
  const { id } = useLocation().state
  const router = useNavigate()
  useImperativeHandle(ref, () => ({
    getData,
    more,
    setOffset
  }))

  const [list, setList] = useState<any>([])
  const [more, setMore] = useState(true)

  const setOffset = () => {
    infoCollect_offset = 1
  }
  const getData = () => {
    getUserCollectById({
      id: id as string,
      offset: infoCollect_offset
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail('网络错误')
      }
      setMore(res.more)
      setList([...list, ...res.data])
      infoCollect_offset ++
    })
  }

  useEffect(() => {
    infoCollect_offset = 1
    getData()
  }, [])

  return (
    <div id="InfoCollect">
      {
        list.length ? (
          list.map((item: any) => (
            <ArticleItem key={item.id} browse_count={item.browse_count} id={item.art_id} clickEvent={() => router('/article/'+item.id)} title={item.title} content={item.content} cover={item.cover_img} time={item.pub_date} />
          ))
        ) : <Empty description="暂无收藏文章" />
      }
    </div>
  )
})
