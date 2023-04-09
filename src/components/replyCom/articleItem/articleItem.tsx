import React, { memo } from 'react'
import { useRouter } from '@/hooks/useRouter'
import { Image, Typography } from 'react-vant'
import "./articleItem.less"

interface IProps {
  cover_img: string
  title: string
  pub_date: number
  content: string
  id: string
  toDetail?: boolean
}

export default memo(function ArticleItem(props: IProps) {
  const { router } = useRouter()
  const toPage = (e: any) => {
    // 阻止合成事件的冒泡
    e.stopPropagation();
    // 阻止与原生事件的冒泡
    e.nativeEvent.stopImmediatePropagation();
    router('/article/'+props.id)
  }

  return (
    <div onClick={(e) => props.toDetail && toPage(e)} className='Event_ArticleItem'>
      <div className='leftCover'>
        <Image fit='cover' src={props.cover_img} />
      </div>
      <div className='rightInfo'>
        <Typography.Text ellipsis={2}>{props.title}</Typography.Text>
        <Typography.Text className='context' ellipsis={1}>{props.content.replace(/<[^>]+>/ig, '')}</Typography.Text>
        <span className='context'>发布时间：{(React as any).$moment(props.pub_date).format('YYYY-MM-DD HH:mm:ss')}</span>
      </div> 
    </div>
  )
}) 