import React from 'react'
import { useNavigate } from "react-router-dom";
import { ChatO, DeleteO, EyeO, GoodJobO, OrdersO, StarO } from '@react-vant/icons';
import { Button ,Tag } from 'react-vant';
import ArticleItem from "@/components/articleItem/articleItem";
import "./articleItem.less"

interface IProps {
  author_id: string
  content: string
  cover_img: string
  id: string
  is_delete: string
  praise_count: number
  browse_count: number
  comment_count: number
  collect_count: number
  pub_date: number
  state: string
  title: string
  index: number
  deleteEvent: (id: string, index: number) => void
}

export default function MyArticleItem(props: IProps) {
  const router = useNavigate()

  const clickEvent = () => {
    router('/article/' + props.id)
  }

  return (
    <div className='myArticleItem'>
      <div className='infoItem'>
        <div className='itemLeft'>
          文章状态
        </div>
        <div className='itemRight'>
          {
            props.state == '2' ? <Tag type="danger">封禁</Tag>
              : props.state == '3' ? <Tag type="warning">删除</Tag>
                : <Tag type="success">正常</Tag>
          }
        </div>
      </div>
      <ArticleItem
        id={props.id}
        title={props.title}
        time={props.pub_date}
        cover={props.cover_img}
        content={props.content}
      />
      <div className='dataItem'>
        <div className='item'>
          <EyeO fontSize={16} />
          <div>{props.browse_count ? props.browse_count : '浏览'}</div>
        </div>
        <div className='item'>
          <GoodJobO fontSize={16} />
          <div>{props.praise_count ? props.praise_count : '点赞'}</div>
        </div>
        <div className='item'>
          <ChatO fontSize={16} />
          <div>{props.comment_count ? props.comment_count : '评论'}</div>
        </div>
        <div className='item'>
          <StarO fontSize={16} />
          <div>{props.collect_count ? props.collect_count : '收藏'}</div>
        </div>
      </div>
      <div className='btnList'>
        <Button onClick={clickEvent} style={{marginRight: '2vw'}} size='small' icon={<OrdersO/>} disabled={props.state != '1'} type='primary'>查看文章</Button>
        <Button onClick={() => props.deleteEvent && props.deleteEvent(props.id, props.index)} size='small' icon={<DeleteO/>} disabled={props.state != '1'} type='danger'>删除文章</Button>
      </div>
    </div>
  )
}
