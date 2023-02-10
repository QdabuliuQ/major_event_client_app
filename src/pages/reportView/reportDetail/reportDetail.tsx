import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { Empty, ImagePreview, Image, Steps, Toast, NavBar } from 'react-vant';
import ArticleItem from "@/components/articleItem/articleItem";
import { getArticleReportDetail } from "@/network/reportView/reportDetail";
import "./reportDetail.less"

export default function ReportDetail() {
  const router = useNavigate()
  const { id } = useParams()

  const [info, setInfo] = useState<any>(null)
  const [state, setState] = useState(0)

  useEffect(() => {
    getArticleReportDetail({
      id: id as string
    }).then((res: any) => {
      if (res.status) {
        return Toast.fail('获取数据失败')
      }
      if (res.data.state == '2' || res.data.state == '3') {
        setState(1)
      }
      setInfo(res.data)
    })
  }, [])

  return (
    <div id='ReportDetail'>
      <NavBar
        title="举报详情"
        onClickLeft={() => router(-1)}
      />
      {
        info ? (
          <div className='detailContainer'>
            <div className='detailItem'>
              <div className='detailTitle'>
                审核进度
              </div>
              <div className='detailInfo'>
                <Steps active={state}>
                  <Steps.Item>审核中</Steps.Item>
                  <Steps.Item>{
                    info.state == '1' ? '审核结果' : info.state == '2' ? '封禁' : '正常'
                  }</Steps.Item>
                </Steps>
              </div>
            </div>
            <div className='detailItem'>
              <div className='detailTitle'>
                举报文章
              </div>
              <div className='detailInfo'>
                <ArticleItem
                  id={info.art_id}
                  title={info.title}
                  time={info.pub_date}
                  cover={info.cover_img}
                  content={info.content}
                  clickEvent={(id: string) => router('/article/'+id)}
                />
              </div>
            </div>
            <div className='detailItem item'>
              <div className='detailTitle'>
                举报描述
              </div>
              <div className='detailInfo'>
                {info.desc}
              </div>
            </div>
            {
              info.proof.length ? (
                <div className='detailItem item'>
                  <div className='detailTitle'>
                    证明材料
                  </div>
                  <div className='detailInfo picInfo'>
                    {
                      info.proof.map((item: any) => (
                        <Image onClick={() => {
                          ImagePreview.open({
                            images: [item.link]
                          });
                        }} key={item.link} fit='cover' width='21vw' height='21vw' src={item.link} />
                      ))
                    }
                  </div>
                </div>
              ) : ''
            }
            <div className='detailItem item'>
              <div className='otherInfo'>
                <div className='leftInfo'>
                  举报编号
                </div>
                <div className='rightInfo'>
                  { info.id }
                </div>
              </div>
              <div className='otherInfo'>
                <div className='leftInfo'>
                  举报理由
                </div>
                <div className='rightInfo'>
                  { info.reason }
                </div>
              </div>
              <div className='otherInfo'>
                <div className='leftInfo'>
                  提交时间
                </div>
                <div className='rightInfo'>
                  { (React as any).$moment(info.time).format('YYYY-MM-DD HH:mm:ss') }
                </div>
              </div>
            </div>
          </div>
        ) : <Empty image="error" description="获取数据失败" />
      }

    </div>
  )
}
