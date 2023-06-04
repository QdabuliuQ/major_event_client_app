import React, { memo } from 'react'
import { useNavigate } from "react-router-dom";
import { Image, Typography } from 'react-vant';
import "./articleItem.less"

interface IProps {
  cover_img: string
  title: string
  content: string
  art_id: string
}

export default memo(function ArticleItem(props: IProps) {

  const router = useNavigate()

  return (
    <div onClick={() => router('/article/' + props.art_id)} className='_ArticleItem'>
      <div className='leftInfo'>
        <Typography.Text className='title' ellipsis={1}>{props.title}</Typography.Text>
        <Typography.Text className='content' ellipsis>{props.content}</Typography.Text>
      </div>
      <Image fit='cover' width='30vw' height='20vw' src={props.cover_img} />
    </div>
  )
}) 
