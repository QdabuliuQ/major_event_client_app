import React, { memo, useEffect } from 'react'
import { Image, ImagePreview, Typography } from 'react-vant'
import ArticleItem from "@/components/replyCom/articleItem/articleItem";
import VideoItem from "@/components/replyCom/videoItem/videoItem";
import ReplyData from "@/components/replyCom/replyData/replyData";
import "./eventItem.less"

interface IProps {
  user_id: string
  nickname: string
  user_pic: string
  time: number
  type: string
  content: string
  images: { link: string }[]
  resource_id: string
  resource_info: any
}

export default memo(function EventItem(props: IProps) {
  let images: string[] = []
  useEffect(() => {
    if (props.images) {
      for (let item of props.images) {
        images.push(item.link)
      }
    }
  }, [props.images])

  return (
    <div className='EventItem'>
      <div className='userInfo'>
        <Image round fit='cover' src={props.user_pic} />
        <div className='userData'>
          <div className='nickname'>
            {props.nickname}
            <span className='type'>
              {
                props.type == '1' ? '发布动态'
                  : props.type == '2' ? '分享文章'
                    : props.type == '3' ? '分享视频'
                      : ''
              }
            </span>
          </div>
          <div className='pubTime'>
            {(React as any).$moment(props.time).format('YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>
      </div>
      <div className='eventInfo'>
        {
          props.content ? <div className='eventContent'>
            <Typography.Text
              ellipsis={{
                rows: 4,
                collapseText: '收起',
                expandText: '展开',
              }}
            >
              {props.content}
            </Typography.Text>
          </div> : ''
        }
        {
          props.images ? <div className='eventImages'>
            {
              props.images.map(item => (
                <Image key={item.link} onClick={() => ImagePreview.open({ images })} fit='cover' src={item.link} />
              ))
            }
          </div> : ''
        }
        {
          props.resource_info && props.type == '2' ?
            <ArticleItem
              cover_img={props.resource_info.cover_img}
              title={props.resource_info.title}
              pub_date={props.resource_info.pub_date}
              content={props.resource_info.content}
              id={props.resource_info.id}
              toDetail={true}
            />
            : props.resource_info && props.type == '3' ? <VideoItem
              id={props.resource_info.id}
              cover_img={props.resource_info.cover_img}
              time={props.resource_info.time}
              title={props.resource_info.title}
              toDetail={true}
            /> : ''
        }
        <ReplyData 
          praiseCount={0}
          isPraise={0}
          commentCount={0}
          replyCount={0}
        />
      </div>
    </div>
  )
}) 
