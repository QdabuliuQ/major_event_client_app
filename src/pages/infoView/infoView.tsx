import { useEffect, useState, useRef } from 'react'
import { Plus, ArrowLeft } from '@react-vant/icons'
import { Sticky, Tag, Tabs, Typography, Image, Toast, Empty, NavBar } from 'react-vant';
import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import city from '@/utils/city'
import { getUserInfoById, updateFollowUser } from "@/network/infoView/infoView";
import { addChatObject } from "@/network/messageView/messageView";
import ScrollList from "@/components/scrollList/scrollList";
import { InfoArticle } from "./infoArticle/infoArticle";
import { InfoCollect } from "./infoCollect/infoCollect";
import { InfoEvent } from "./infoEvent/infoEvent";
import InfoVideo from './infoVideo/infoVideo';
import "./infoView.less"

export default function InfoView() {
  const { id } = useParams()
  const router = useNavigate()
  const location = useLocation()
  
  const comRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]
  const [more, setMore] = useState(true)
  const [idx, setIdx] = useState(0)
  const [status, setStatus] = useState<string | number>('')
  const [info, setInfo] = useState<any>()

  const toggleEvent = () => {
    setMore(true)
  }

  let tabsList = [
    {
      name: '动态',
      component: <InfoEvent ref={comRefs[0]} />
    },
    {
      name: '文章',
      component: <InfoArticle ref={comRefs[1]} />
    },
    {
      name: '视频',
      component: <InfoVideo ref={comRefs[2]} />
    },
    {
      name: '收藏',
      component: <InfoCollect toggleEvent={toggleEvent} ref={comRefs[3]} />
    },
  ]


  const followUser = () => {
    updateFollowUser({
      follow_id: id as string,
      is_follow: info.is_follow ? 0 : 1
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail(res.msg)
      }
      let cpInfo = {
        ...info
      }
      cpInfo.is_follow = info.is_follow ? 0 : 1
      setInfo(cpInfo)
    })
  }
  const getCity = (codes: string[]) => {
    let res = findCity(codes, 0, city)
    return res
  }
  const findCity = (code: string[], i: number, list: any): string => {
    if (i > code.length || !list) return ''
    for (let item of list) {
      if (item.value == code[i]) {
        i++
        return item.text + ' ' + findCity(code, i, item.children)
      }
    }
    return ''
  }
  const chatUser = () => {
    addChatObject({
      to_id: id as string
    }).then((res: any) => {
      if (res.status) return Toast.fail(res.msg)
      router(`/chat/${id}/${res.room_id}`)
    })
  }
  // 加载数据
  const loadData = () => {
    if (!(comRefs[idx].current as any).loading) {
      if (idx == 3) {
        (comRefs[idx].current as any).getData((comRefs[idx].current as any).getType())
      } else {
        (comRefs[idx].current as any).getData()
      }
      setTimeout(() => {
        setMore((comRefs[idx].current as any).more)
      }, 100);
    }
  }

  useEffect(() => {
    setStatus('')
    setMore(true)

    getUserInfoById({
      id: id as string,
    }).then((res: any) => {
      if (res.status) {
        setStatus(res.status)
        return Toast.fail('获取信息失败')
      }
      if (res.msg == '账号被封禁') {
        return setStatus(-1)
      }
      setInfo(res.data)
    })

    setTimeout(() => {
      setMore((comRefs[idx].current as any).more)
    }, 200);

  }, [location.pathname])

  return (
    <div id='InfoView'>
      {
        status == 1 ? (
          <div>
            <NavBar
              title='用户信息'
              fixed={true}
              placeholder={true}
              onClickLeft={() => router(-1)}
            />
            <Empty image="network" description="获取信息失败" />
          </div>
        )
          : status == -1 ? (
            <div>
              <NavBar
                title='用户信息'
                fixed={true}
                placeholder={true}
                onClickLeft={() => router(-1)}
              />
              <Empty image="error" description="账号被封禁" />
            </div>
          )
            : (
              info && <ScrollList
                cb={loadData}
                hasMore={more}
                height={'100vh'}>
                <div className='userInfoContainer'>
                  <div className='topButtom'>
                    <ArrowLeft onClick={() => {
                      router(-1)
                    }} color='#fff' fontSize={'24px'} />
                  </div>
                  <div className='user_bg_image'>
                    <img src={info.bg_image} alt="" />
                  </div>
                  <div className='user_data'>
                    <div className='user_basic_info'>
                      <div className='top_info info_item'>
                        <Image round fit='cover' src={info.user_pic} />
                        <div style={{ marginLeft: '10px' }}>
                          <div className='info_nickname'>{info.nickname}</div>
                          <div className='info_follow'>
                            <div onClick={() => {
                              router('/follow/' + id)
                            }} className='followItem'>
                              <span>{info.followCount}</span>
                              关注
                            </div>
                            <div onClick={() => {
                              router('/fans/' + id)
                            }} className='followItem'>
                              <span>{info.fanCount}</span>
                              粉丝
                            </div>
                          </div>
                          {info.status == 3 && <div style={{ marginTop: '2vw' }}><Tag type="warning">禁言中</Tag></div>}
                        </div>
                      </div>
                      {
                        info.intro && (
                          <div className='info_intro info_item'>
                            <Typography.Text ellipsis>
                              {info.intro}
                            </Typography.Text>
                          </div>
                        )
                      }
                      {
                        (info.birthday || info.province) && (
                          <div className='info_other info_item'>
                            {
                              info.birthday && <div className='target_item'>
                                {
                                  moment(info.birthday).format('YYYY-MM-DD')
                                }
                              </div>
                            }
                            {
                              info.province && <div style={{ zoom: '.7' }} className='target_item'>
                                {
                                  getCity([info.province, info.city, info.area])
                                }
                              </div>
                            }
                          </div>
                        )
                      }
                      <div className='info_btn_list info_item'>
                        {
                          localStorage.getItem('id') != id ? (
                            <button onClick={chatUser} className='btnItem chatBtn'>
                              私聊
                            </button>
                          ) : ''
                        }
                        {
                          localStorage.getItem('id') != id ? (
                            info.is_follow ? (
                              <button onClick={followUser} className='followBtn btnItem'>
                                已关注
                              </button>
                            ) : (
                              <button onClick={followUser} className='unFollowBtn btnItem'>
                                <Plus fontSize={14} /> <span style={{ marginLeft: '3px' }}>关注</span>
                              </button>
                            )
                          ) : ''
                        }

                      </div>
                    </div>
                  </div>
                </div>
                <Sticky>
                  <Tabs onChange={(name) => {
                    setIdx(name as number);
                    setTimeout(() => {
                      setMore((comRefs[name as number].current as any).more)
                    }, 200);
                  }}>
                    {tabsList.map(item => (
                      <Tabs.TabPane key={item.name} title={item.name}>
                      </Tabs.TabPane>
                    ))}
                  </Tabs>
                </Sticky>
                <div className='routerContainer'>
                  {tabsList[idx].component}
                </div>
              </ScrollList>
            )
      }
    </div>
  )
}
