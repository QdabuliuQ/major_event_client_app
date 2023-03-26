import React, { useEffect, useRef, useState } from 'react'
import { Empty, Tabs, Toast } from 'react-vant'
import { useNavigate } from 'react-router-dom';
import SearchNav from "@/components/searchNav/searchNav";
import ArticleItem from "@/components/articleItem/articleItem";
import VideoItem from "@/components/videoItem/videoItem";
import UserItem from "@/components/userItem/userItem";
import ScrollList from "@/components/scrollList/scrollList";
import CategoryNav from "./categoryNav/categoryNav";
import MoreBtn from "./moreBtn/moreBtn";
import { getAllSearch, getArticleSearch, getVideoSearch, getUserSearch } from "@/network/searchDetail/searchDetail";
import "./searchDetail.less"

export default function SearchDetail() {
  const router = useNavigate()

  let key: string = sessionStorage.getItem('key') as string
  
  const SearchNavRef = useRef()
  const ScrollListRef = useRef()
  const [offset, setOffset] = useState(1)
  const [more, setMore] = useState(false)
  const [type, setType] = useState(0)
  const [list, setList] = useState<any>(null)
  const [height, setHeight] = useState(0);

  const getKey = (): string => {
    return sessionStorage.getItem('key') as string
  }

  const onChange = (e: string | number) => {
    setType(e as number)
    setOffset(1)
    setMore(true)
    getData(e as number, 1, getKey());
    (ScrollListRef.current as any).toTop()
  }

  const getData = (type: number, _offset: number, _key: string) => {

    if (type == 0) {
      getAllSearch({
        key: _key,
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('搜索失败')
        }
        setList(res.data)
      })
    } else if (type == 1) {
      getArticleSearch({
        offset: _offset,
        key: _key,
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('搜索失败')
        }
        if (_offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
      })
    } else if (type == 2) {
      getVideoSearch({
        offset: _offset,
        key: _key,
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('搜索失败')
        }
        if (_offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
      })
    } else if (type == 3) {
      getUserSearch({
        offset: _offset,
        key: _key,
      }).then((res: any) => {
        if (res.status) {
          return Toast.fail('搜索失败')
        }
        if (_offset == 1) {
          setList(res.data)
        } else {
          setList([...list, ...res.data])
        }
        setMore(res.more)
      })
    }
  }

  const onKeyup = (_key: string) => {
    sessionStorage.setItem('key', _key)
    setType(0)
    getData(0, 1, _key)
  }

  useEffect(() => {
    setHeight(document.documentElement.clientHeight - (document.getElementById('SearchNav') as HTMLDivElement).clientHeight - document.getElementsByClassName('rv-tabs')[0].clientHeight);
    (SearchNavRef.current as any).setKey(key)
    getData(0, 1, getKey())
  }, [])

  return (
    <div id='SearchDetail'>
      <SearchNav ref={SearchNavRef} onKeyup={onKeyup} back={true} />
      <Tabs onChange={onChange} active={type}>
        <Tabs.TabPane title='全部' />
        <Tabs.TabPane title='文章' />
        <Tabs.TabPane title='视频' />
        <Tabs.TabPane title='用户' />
      </Tabs>
      <div className='resultContainer'>
        {
          list != null ? (
            <ScrollList
              ref={ScrollListRef}
              cb={() => {
                if (type != 0) {
                  getData(type, offset + 1, getKey())
                  setOffset(offset + 1)
                }
              }}
              height={height}
              hasMore={more}
            >
              <div className='listContainer'>
                {
                  type == 0 ? (
                    (list.users && list.users.length) || 
                    (list.articles && list.articles.length) || 
                    (list.videos && list.videos.length) ? (
                      <div>
                        {
                          list.articles && list.articles.length ? (
                            <div>
                              <CategoryNav title='文章' />
                              {
                                list.articles.map((item: any) => (
                                  <ArticleItem clickEvent={() => router('/article/' + item.id)} key={item.id} browse_count={item.browse_count} id={item.art_id} title={item.title} content={item.desc} cover={item.cover_img} time={item.pub_date} />
                                ))
                              }
                              <MoreBtn clickEvent={() => onChange(1)} />
                            </div>
                          ) : ''
                        }
                        {
                          list.videos && list.videos.length ? (
                            <div>
                              <CategoryNav bottom={'10px'} title='视频' />
                              {
                                <div className='videoContainer'>
                                  {
                                    list.videos.map((item: any) => <VideoItem
                                      key={item.id}
                                      id={item.id}
                                      cover_img={item.cover_img}
                                      title={item.title}
                                      time={item.pub_date}
                                      nickname={item.nickname}
                                      user_pic={item.user_pic}
                                      user_id={item.user_id}
                                    />)
                                  }
                                </div>
                              }
                              <MoreBtn clickEvent={() => onChange(2)} />
                            </div>
                          ) : ''
                        }
                        {
                          list.users && list.users.length ? (
                            <div>
                              <CategoryNav bottom={'10px'} title='用户' />
                              {
                                list.users.map((item: any) => <UserItem
                                  key={item.id}
                                  id={item.id}
                                  nickname={item.nickname}
                                  user_pic={item.user_pic}
                                  intro={item.intro}
                                  is_follow={item.is_follow}
                                />)
                              }
                              <MoreBtn clickEvent={() => onChange(3)} />
                            </div>
                          ) : ''
                        }
                      </div>
                    ) : <Empty description="暂无搜索内容" />
                  ) : type == 1 ? (
                    list.length ? list.map((item: any) => (
                      <ArticleItem
                        clickEvent={() => router('/article/' + item.id)}
                        key={item.id}
                        browse_count={item.browse_count}
                        id={item.art_id}
                        title={item.title}
                        content={item.desc}
                        cover={item.cover_img}
                        time={item.pub_date} />
                    )) : <Empty description="暂无搜索内容" />
                  ) : type == 2 ? (
                    list.length ? (
                      <div style={{ margin: '4vw 0' }} className='videoContainer'>
                        {
                          list.map((item: any) => <VideoItem
                            key={item.id}
                            id={item.id}
                            cover_img={item.cover_img}
                            title={item.title}
                            time={item.pub_date}
                            nickname={item.nickname}
                            user_pic={item.user_pic}
                            user_id={item.user_id}
                          />)
                        }
                      </div>
                    ) : <Empty description="暂无搜索内容" />
                  ) : (
                    <div>
                      {
                        list.length ? list.map((item: any) => <UserItem
                          key={item.id}
                          id={item.id}
                          nickname={item.nickname}
                          user_pic={item.user_pic}
                          intro={item.intro}
                          is_follow={item.is_follow}
                        />) : <Empty description="暂无搜索内容" />
                      }
                    </div>
                  )
                }
              </div>
            </ScrollList>
          ) : (
            <Empty description="暂无搜索内容" />
          )
        }

      </div>
    </div>
  )
}
