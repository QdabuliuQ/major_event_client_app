import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Empty, Toast, Tabs, NavBar } from 'react-vant';
import { getArticleById, deleteArticleById } from "@/network/myArticleList/myArticleList";
import ArticleItem from "./articleItem/articleItem";
import ScrollList from "@/components/scrollList/scrollList";
import "./myArticleList.less"

export default function MyArticleList() {
  const router = useNavigate()

  const [type, setType] = useState('0')
  const [more, setMore] = useState(true)
  const [height, setHeight] = useState(0)
  const [offset, setOffset] = useState(1)
  const [list, setList] = useState<any>([])

  const getData = (type: string = '0', _offset: number = 1) => {
    getArticleById({
      offset: _offset,
      type
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('网络错误')
      }
      if (_offset == 1) {
        setList(res.data)
      } else {
        setList([...list, ...res.data])
      }
      setMore(res.more)
    })
  }

  const deleteEvent = (id: string, i: number) => {
    if(list[i].state != '1') return
    deleteArticleById({
      id
    }).then((res: any) => {
      if(res.status) {
        return Toast.fail('删除失败')
      }
      list.splice(i, 1)
      setList([...list])
      Toast.success('删除成功')
    })
  }

  useEffect(() => {
    getData()

    setHeight(document.documentElement.clientHeight - document.getElementsByClassName('rv-nav-bar')[0].clientHeight - document.getElementsByClassName('rv-tabs')[0].clientHeight)
  }, [])

  return (
    <div id='MyArticleList'>
      <NavBar
        title="文章管理"
        fixed={true}
        placeholder={true}
        onClickLeft={() => router(-1)}
      />
      <Tabs onChange={(e: any) => {
        setOffset(1)
        setType(e)
        setMore(true)
        
        getData(e.toString(), 1)
      }}>
        <Tabs.TabPane title='全部' />
        <Tabs.TabPane title='正常' />
        <Tabs.TabPane title='封禁' />
        <Tabs.TabPane title='删除' />
      </Tabs>
      {
        list.length ? (
          <ScrollList
            cb={() => {
              setOffset(offset + 1)
              getData(type, offset + 1)
            }}
            hasMore={more}
            height={height}
          >
            <div className='listContainer'>
              {
                list.map((item: any, index: number) => (
                  <ArticleItem
                    key={item.id}
                    deleteEvent={deleteEvent}
                    index={index}
                    {
                      ...item
                    }
                  />
                ))
              }
            </div>
          </ScrollList>
        ) : <Empty description="暂无发表评论" />
      }
    </div>
  )
}
