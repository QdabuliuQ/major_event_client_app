import React, { memo, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Image, ImagePreview } from 'react-vant';
import ArticleItem from '../articleItem/articleItem';
import VideoItem from '../videoItem/videoItem';
import "./replyItem.less";

interface IProps {
  content: string
  ev_id: string
  images: { link: string }[]
  nickname: string
  resource_id: string
  resource_info: any
  time: number
  type: string
  user_id: string
}

export default memo(function ReplyItem(props: IProps) {
  const router = useNavigate()
  let { id } = useParams()
  let images: string[] = []
  const imgClick = (e: any, idx: number) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    ImagePreview.open({ images, startPosition: idx  })
  }

  const itemClick = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    sessionStorage.setItem('event', JSON.stringify(props))
    router('/eventDetail/'+props.ev_id)
  }

  const userClick = (e: any) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    if (id != props.user_id) {
      router('/info/' + props.user_id)
    }
    
  }

  useEffect(() => {
    if (props.images) {
      for (let item of props.images) {
        images.push(item.link)
      }
    }
  }, [props.images])

  return (
    <div onClick={(e) => itemClick(e)} className='ReplyItem'>
      <div className='reply_userInfo'>
        <div className='reply_userData'>
          <div className='nickname'>
            <span onClick={(e) => userClick(e)} className='name'>{props.nickname}</span>
            <span className='type'>
              {
                props.type == '1' ? '发布动态'
                  : props.type == '2' ? '分享文章'
                    : props.type == '3' ? '分享视频'
                      : '转发动态'
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
          props.content ? <div style={{marginBottom: '1vw'}} className='eventContent'>
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
              props.images.map((item, index) => (
                <Image key={item.link} onClick={(e) => imgClick(e, index)} fit='cover' src={item.link} />
              ))
            }
          </div> : ''
        }
        {
          props.resource_info == -1 ? (
            <div className='emptyContent'>内容以删除</div>
          ) : props.resource_info && props.type == '2' ?
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
      </div>
    </div>
  )
}) 
