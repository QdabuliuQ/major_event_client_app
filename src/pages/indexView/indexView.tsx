import { useEffect, useState, useRef } from 'react'
import { Empty, Tabs, Sticky } from 'react-vant'
import { useNavigate } from "react-router-dom";
import { Plus, Search } from '@react-vant/icons';
import { getArticleList } from "@/network/indexView/indexView"
import { getArticleCate } from "@/network/pubArticleView/pubArticleView";
import ArticleItem from "@/components/articleItem/articleItem";
import "./indexView.less"

export default function IndexView() {
  let offset = 1, more = true

  const router = useNavigate()

  const [cate, setCate] = useState<any>([{
    cate_name: '全部',
    cate_id: '0'
  }])
  const [cateId, setCateId] = useState('0')
  const [show, setShow] = useState(true)
  
  // const [offset, setOffset] = useState(1)
  const [artList, setArtList] = useState<{
    content: string
    id: string
    cover_img: string
    title: string
  }[]>([])

  let timer: any;

  const tabsRef = useRef(null)

  // 获取数据
  const getData = (id: string) => {
    if (id == '0') {
      getArticleList({
        offset,
        limit: 15
      }).then((res: any) => {
        setArtList([...artList, ...res.data])
        more = res.more
      })
    } else {
      getArticleList({
        id,
        offset,
        limit: 15
      }).then((res: any) => {
        setArtList([...artList, ...res.data])
        more = res.more
      })
    }
  }

  // tab切换回调
  const tabClick = (id: string | number) => {
    offset = 1
    // 清空数组
    setArtList(artList.splice(0, artList.length))
    more = true
    setCateId(id.toString())
    getData(id.toString())
  }

  const scrollEvent = () => {
    if (more) {
      //获取网页的总高度
      let htmlHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
      //clientHeight是网页在浏览器中的可视高度
      let clientHeight = document.body.clientHeight || document.documentElement.clientHeight;
      //scrollTop是浏览器滚动条的top位置
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      
      //判断到底部了,为了避免一些问题，设置距离底部50px时就执行代码
      if (scrollTop != 0 && scrollTop + clientHeight > htmlHeight - 50) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          offset ++
          getData(cateId)
          
        }, 200);
      }
    }
  }

  const itemClick = (id: string) => {
    router('/article/'+id)
  }

  useEffect(() => {
    getArticleCate().then((res: any) => {
      setCate([...cate, ...res.data])
      setShow(false)
      setTimeout(() => {
        setShow(true)
      }, 50);
      getData('0')
    })

    window.addEventListener('scroll', scrollEvent)
    
    return () => {
      window.removeEventListener('scroll', scrollEvent)
    }
  }, [])

  return (
    <div id='IndexView'>
      <div className='topNavBar'>
        <div className='navInput'>
          <Search style={{ position: 'relative', top: '1px' }} fontSize='15px' />
          <input type="text" placeholder='搜索相关文章内容' />
        </div>
        <div className='navBtn'>
          <div className='btnContent'>
            <img src={require('@/assets/images/plus.png')} alt="" />
            <span>发布</span>
          </div>
        </div>
      </div>
      <Sticky>
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
      </Sticky>
      <div className='articleContainer'>
        {
          artList.length ? artList.map((item: any) => (
            <ArticleItem browse_count={item.browse_count} key={item.id}  id={item.id} clickEvent={itemClick} title={item.title} content={item.content} cover={item.cover_img} time={item.pub_date} />
          )) : <Empty description="暂无内容" />
        }
      </div>
    </div>
  )
}
