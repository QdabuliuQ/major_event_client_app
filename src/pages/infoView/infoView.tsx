import { useEffect, useState, useRef } from 'react'
import { Plus, ArrowLeft } from '@react-vant/icons'
import { Sticky, Tabs, Typography, Image, Toast, Empty } from 'react-vant';
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import city from '@/utils/city'
import { getUserInfoById, updateFollowUser } from "@/network/infoView/infoView";
import ScrollList from "@/components/scrollList/scrollList";
import { InfoArticle } from "./infoArticle/infoArticle";
import { InfoCollect } from "./infoCollect/infoCollect";
import "./infoView.less"

export default function InfoView() {
  const { id } = useLocation().state
  const router = useNavigate()

  const comRefs = [
    useRef(null),
    useRef(null)
  ]
  const [more, setMore] = useState(true)
  const [idx, setIdx] = useState(0)
  const [status, setStatus] = useState<string | number>('')
  const [info, setInfo] = useState<any>()
  let tabsList = [
    {
      name: '文章',
      component: <InfoArticle ref={comRefs[0]} />
    },
    {
      name: '收藏',
      component: <InfoCollect ref={comRefs[1]} />
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
  // 加载数据
  const loadData = () => {
    (comRefs[idx].current as any).getData()
    setTimeout(() => {
      setMore((comRefs[idx].current as any).more)
    }, 100);
  }

  useEffect(() => {
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
    
  }, [])
  
  return (
    <div id='InfoView'>
      {
        status == 1 ? <Empty image="network" description="获取信息失败" />
          : status == -1 ? <Empty image="error" description="账号被封禁" />
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
                        <Image width='1.875rem' height='1.875rem' round fit='cover' src={info.user_pic} />
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
                      {
                        localStorage.getItem('id') != id ? (
                          <div className='info_item'>
                            {
                              info.is_follow ? (
                                <button onClick={followUser} className='followBtn btnItem'>
                                  已关注
                                </button>
                              ) : (
                                <button onClick={followUser} className='unFollowBtn btnItem'>
                                  <Plus fontSize={14} /> <span style={{ marginLeft: '3px' }}>关注</span>
                                </button>
                              )
                            }
                          </div>
                        ) : ''
                      }
                    </div>
                  </div>
                </div>
                <Sticky>
                  <Tabs onChange={(name) => {
                    setIdx(name as number);
                    // (comRefs[name as number].current as any).setOffset()
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
