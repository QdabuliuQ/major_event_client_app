import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { WarningO, ClockO, Records, StarO, GoodJobO, Description } from '@react-vant/icons';
import moment from "moment";
import { Cell, Grid, Typography, Image, Toast } from 'react-vant'
import city from '@/utils/city'
import { getUserInfo } from "@/network/profileView/profileView";
import "./profileView.less"

export default function ProfileView() {
  const router = useNavigate()

  const [funList, setFunList] = useState<{
    name: string
    icon: any
    index: string
  }[]>([{
    name: '发布文章',
    icon: <Records fontSize='20px' />,
    index: '/pubArticle'
  }, {
    name: '文章管理',
    icon: <Description fontSize='20px' />,
    index: '/management'
  }, {
    name: '收藏',
    icon: <StarO fontSize='20px' />,
    index: '/collect'
  }, {
    name: '点赞',
    icon: <GoodJobO fontSize='20px' />,
    index: '/praise'
  }, {
    name: '浏览记录',
    icon: <ClockO fontSize='20px' />,
    index: '/browse'
  }, {
    name: '举报结果',
    icon: <WarningO fontSize='20px' />,
    index: '/reportResult'
  }])
  const [info, setInfo] = useState<any>({})

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

  const loginOut = () => {
    localStorage.removeItem('info')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    Toast.success('以退出登录')
    router('/login', {
      replace: true
    })
  }

  useEffect(() => {
    let info = localStorage.getItem('info')
    if(!info) {
      getUserInfo().then((res: any) => {
        localStorage.setItem('info', JSON.stringify(res.data))
        setInfo(res.data)
      })
    } else {
      setInfo(JSON.parse(info))
    }
    
  }, [])

  return (
    <div id='ProfileView'>
      {
        info && <div className='userInfoContainer'>
          <div className='user_bg_image'>
            <img src={info.bg_image} alt="" />
          </div>
          <div className='user_data'>
            <div className='user_basic_info'>
              <div className='top_info'>
                <Image width='1.875rem' height='1.875rem' round fit='cover' src={info.user_pic} />
                <div style={{ marginLeft: '10px' }}>
                  <div className='info_nickname'>{info.nickname}</div>
                </div>
              </div>
              <div className='info_intro'>
                <Typography.Text ellipsis>
                  {info.intro ? info.intro : '添加简介更容易获得大家的关注'}
                </Typography.Text>
              </div>
              <div className='info_other'>
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
              <div className='info_operation'>
                <div onClick={() => {
                  router('/editProfile')
                }} className='ope_item'>
                  编辑资料
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className='functionListContainer'>
        {
          <Grid columnNum={4}>
            {
              funList.map(item => (
                <Grid.Item onClick={() => router(item.index)} key={item.index} icon={item.icon} text={item.name} />
              ))
            }
          </Grid>
        }
        <div className='cellList'>
          <Cell onClick={loginOut} title='退出登录' isLink />
        </div>
      </div>
    </div>
  )
}
