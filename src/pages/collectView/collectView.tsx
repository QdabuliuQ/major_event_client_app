import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, SwipeCell, Empty, Button, NavBar } from 'react-vant';
import ArticleItem from "@/components/articleItem/articleItem";
import ScrollList from "@/components/scrollList/scrollList";
import { getCollectList } from "@/network/collectView/collectView";
import { collectArticle } from "@/network/articleView/articleView";
import "./collectView.less"

export default function CollectView() {
  const router = useNavigate()

  let offset = 1
  const [collect, setCollect] = useState<any>([])
  const [height, setHeight] = useState<number>(0)
  const [more, setMore] = useState<boolean>(true)

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

  const getData = () => {
    getCollectList({
      offset
    }).then((res: any) => {
      setCollect([...collect, ...res.data])
      setMore(res.more)
    })
  }

  useEffect(() => {
    getData()
    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight)
  }, [])

  return (
    <div id='CollectView'>
      <NavBar
        fixed={true}
        placeholder={true}
        title="收藏"
        onClickLeft={() => router(-1)}
      />
      {
        collect.length ? (
          <ScrollList
            sourceData={collect}
            renderItem={(item: any, index: number) => (
              <div key={item.id} className='collectItem'>
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
            )}
            cb={() => {
              offset++
              getData()
            }}
            hasMore={more}
            height={height}
          />
        ) : <Empty description="暂无收藏文章" />
      }
    </div >
  )
}
