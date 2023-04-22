import { useEffect, useState, useRef } from 'react'
import { Empty, Tabs } from 'react-vant'
import { useNavigate } from "react-router-dom";
import ReportSheet from '@/components/reportSheet/reportSheet';
import { getArticleList } from "@/network/indexView/indexView"
import { getArticleCate } from "@/network/pubArticleView/pubArticleView";
import ArticleItem from "@/components/articleItem/articleItem";
import SearchNav from "@/components/searchNav/searchNav";
import ScrollList from "@/components/scrollList/scrollList";
import "./indexView.less"

export default function IndexView() {

  const router = useNavigate()

  const [cate, setCate] = useState<any>([{
    cate_name: '全部',
    cate_id: '0'
  }])
  const [cateId, setCateId] = useState('0')
  const [show, setShow] = useState(true)
  const [height, setHeight] = useState(0)
  const [more, setMore] = useState(false)
  const [offset, setOffset] = useState(1)
  const [artList, setArtList] = useState<{
    content: string
    id: string
    cover_img: string
    title: string
  }[]>([])

  let timer: any;

  const tabsRef = useRef(null)

  // 获取数据
  const getData = (id: string, _offset: number) => {
    if (id == '0') {
      getArticleList({
        offset: _offset,
        limit: 15
      }).then((res: any) => {
        if (_offset == 1) {
          setArtList(res.data)
        } else {
          setArtList([...artList, ...res.data])
        }
        setMore(res.more)
      })
    } else {
      getArticleList({
        id,
        offset: _offset,
        limit: 15
      }).then((res: any) => {
        if (_offset == 1) {
          setArtList(res.data)
        } else {
          setArtList([...artList, ...res.data])
        }
        setMore(res.more)
      })
    }
  }

  // tab切换回调
  const tabClick = (id: string | number) => {
    setOffset(1)
    // 清空数组
    setArtList(artList.splice(0, artList.length))
    setMore(true)
    setCateId(id.toString())
    getData(id.toString(), 1)
  }

  const onKeyup = (key: string) => {
    let _key = key.trim()
    if (_key.length) {
      sessionStorage.setItem('key', _key)
      router('/search')
    }
  }

  const itemClick = (id: string) => {
    router('/article/' + id)
  }

  useEffect(() => {
    getArticleCate().then((res: any) => {
      setCate([...cate, ...res.data])
      setShow(false)
      setTimeout(() => {
        setShow(true)
      }, 50);
      getData('0', 1)
    })

    setHeight(document.documentElement.clientHeight - (document.getElementById('SearchNav') as HTMLDivElement).clientHeight - document.getElementsByClassName('cateNavBar')[0].clientHeight - document.getElementsByClassName('rv-tabbar')[0].clientHeight)

  }, [])

  return (
    <div id='IndexView'>
      <ReportSheet/>
      <SearchNav onKeyup={onKeyup} />
      <div className='cateNavBar'>
        {
          show && <Tabs align='start' onChange={tabClick} ref={tabsRef}>
            {
              cate.length && cate.map((item: any) => (
                <Tabs.TabPane name={item.cate_id} key={item.cate_id} title={item.cate_name}>
                </Tabs.TabPane>
              ))
            }
          </Tabs>
        }
      </div>
      <div>
        {
          artList.length ? (
            <ScrollList
              cb={() => {
                getData(cateId, offset + 1)
                setOffset(offset + 1)
              }}
              height={height}
              hasMore={more}
            >
              <div className='articleContainer'>
                {
                  artList.map((item: any) => (
                    <ArticleItem browse_count={item.browse_count} key={item.id} id={item.id} clickEvent={itemClick} title={item.title} content={item.content} cover={item.cover_img} time={item.pub_date} />
                  ))
                }
              </div>
            </ScrollList>
          ) : <Empty description="暂无内容" />
        }
      </div>
    </div>
  )
}
