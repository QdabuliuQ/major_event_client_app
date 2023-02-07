import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { MoreO } from '@react-vant/icons';
import { Image, Button, Tag, Typography } from 'react-vant';
import "./articleItem.less"

interface IProps {
  cover_img: string
  title: string
  content: string
  state: string
  art_id: string
  reason: string
  time: number
  desc: string
}

export default function ArticleItem(props: IProps) {
  
  const router = useNavigate()
  const [stateNow, setStateNow] = useState(0)

  useEffect(() => {
    if(props.state == '1') setStateNow(0)
    else setStateNow(1)
  }, [props.state])

  return (
    <div className='_ArticleItem'>
      <div className='infoItem'>
        <div className='itemLeft'>
          举报结果
        </div>
        <div className='itemRight'>
          {
            props.state == '1' ? <Tag size="medium" type="primary">审核中</Tag>
            : props.state == '2' ? <Tag size="medium" type="danger">封禁</Tag>
            : <Tag size="medium" type="success">正常</Tag>
          }
        </div>
      </div>
      <div onClick={() => router('/article/'+props.art_id)} className='articleInfo'>
        <div className='leftInfo'>
        <Typography.Text className='title' ellipsis={2}>{props.title}</Typography.Text>
        <Typography.Text ellipsis>{props.content}</Typography.Text>
        </div>
        <Image fit='cover' width='30vw' height='20vw' src={props.cover_img} />
      </div>
      <div className='infoItem'>
        <div className='itemLeft'>
          举报理由
        </div>
        <div className='itemRight'>
          {
            props.reason
          }
        </div>
      </div>
      <div className='infoItem'>
        <div className='itemLeft'>
          举报描述
        </div>
        <div className='itemRight'>
          <Typography.Text ellipsis>{props.desc}</Typography.Text>
        </div>
      </div>
      <div className='infoItem'>
        <div className='itemLeft'>
          提交时间
        </div>
        <div className='itemRight'>
          { (React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss') }
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Button icon={<MoreO  />} size='small' type='primary'>
          查看详情
        </Button>
      </div>
    </div>
  )
}
