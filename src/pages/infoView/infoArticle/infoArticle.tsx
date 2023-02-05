import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { Toast, Empty } from 'react-vant';
import { getUserArticleById } from "@/network/infoView/infoView";
import ArticleItem from "@/components/articleItem/articleItem";
import "./infoArticle.less"

let infoArticle_offset = 1

export const InfoArticle = forwardRef(({ }, ref) => {
  const { id } = useLocation().state
  const router = useNavigate()
  useImperativeHandle(ref, () => ({
    getData,
    more,
    setOffset
  }))

  const [more, setMore] = useState(true)
  const [list, setList] = useState<any>([])
  
  const setOffset = () => {
    infoArticle_offset = 1
  }
  const getData = () => {
    getUserArticleById({
      id: id as string,
      offset: infoArticle_offset
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('网络错误')
      }
      setMore(res.more)
      setList([...list, ...res.data])
      infoArticle_offset ++
    })
  }

  useEffect(() => {
    infoArticle_offset = 1
    getData()
  }, [])

  return (
    <div id='InfoArticle'>
      {
        list.length ? (
          list.map((item: any) => (
            <ArticleItem key={item.id} browse_count={item.browse_count} id={item.art_id} clickEvent={() => router('/article/' + item.id)} title={item.title} content={item.content} cover={item.cover_img} time={item.pub_date} />
          ))
        ) : <Empty description="暂无发布文章" />
      }
    </div>
  )
})
