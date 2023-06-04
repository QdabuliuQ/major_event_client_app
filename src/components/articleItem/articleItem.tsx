import React from 'react'
import { EyeO, ClockO } from '@react-vant/icons';
import { Typography, Image } from 'react-vant';
import "./articleItem.less"

interface IProps {
  id: string
  title: string
  time: number
  cover: string
  content: string
  browse_count?: number
  clickEvent?: (id: any) => void
}

export default function ArticleItem(props: IProps) {
  return (
    <div onClick={() => props.clickEvent ? props.clickEvent(props.id) : ''} className='ArticleItem'>
      <div className='articleInfo'>
        <div className='articleTitle'>
          <Typography.Text ellipsis={2}>
            {props.title}
          </Typography.Text>
        </div>
        <div className='articleContent'>
          <Typography.Text ellipsis>
            {props.content}
          </Typography.Text>
        </div>
        <div className='articleTime'>
          {
            props.browse_count != null && (
              <div>
                <EyeO /> <span style={{ marginLeft: '4px' }}>{props.browse_count ?? 0}</span>
              </div>
            )
          }
          <div style={{ position: 'relative' }}><ClockO fontSize={13} /> <span style={{ marginLeft: '4px' }}>{(React as any).$moment(props.time).fromNow()}</span></div>
        </div>
      </div>
      <div className='articleCover'>
        <Image lazyload fit='cover' width='100%' height='100%' src={props.cover} />
      </div>
    </div>
  )
}
