import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react'
import { Empty, NavBar } from 'react-vant'
import { getReceNoticeDetail } from "@/network/profileView/profileView";
import "./noticeView.less"

export default function NoticeView() {
  const router = useNavigate()
  const [info, setInfo] = useState<any>(null)
  const { id } = useParams()
  useEffect(() => {
    getReceNoticeDetail({
      id: id as string,
    }).then((res: any) => {
      setInfo(res.data)
    })
  }, [])

  return (

    <div id='NoticeView'>
      <NavBar
        title="公告内容"
        fixed={true}
        placeholder={true}
        onClickLeft={() => router(-1)}
      />
      {
        info ? (
          <div className="noticeBox">
            <div className="noticeTitle">
              {info.title}
            </div>
            <div className="noticeDetail">
              <div className="pubAdmin">
                {info.pub_name}
              </div>
              <div className="pubTime">{(React as any).$moment(info.time).format('YYYY-MM-DD HH:mm:ss')}</div>
            </div>
            <div className="noticeText" dangerouslySetInnerHTML={{ __html: info.content }}>
            </div>
          </div>
        ) : <Empty image="error" description="获取数据失败" />
      }
    </div>
  )
}
