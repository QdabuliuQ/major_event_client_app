import React from 'react'
import { useNavigate } from "react-router-dom";
import { Live } from '@react-vant/icons';
import { Toast, Button, Input, Uploader, Form, NavBar } from 'react-vant';
import { pubVideo } from "@/network/pubVideoView/pubVideoView";
import { updateImage } from "@/network/editProfileView/editProfileView";
import './pubVideoView.less'

export default function PubVideoView() {
  const router = useNavigate()

  let videoInfo: any = null
  const [form] = Form.useForm()

  // 点击按钮
  const onFinish = (values: any) => {
    // 信息验证
    if (!videoInfo) Toast.fail('请上传视频')
    let title = values.title.trim()
    if (title.length == 0 || title.length > 40) Toast.fail('输入标题有误')
    // 加载动画
    Toast.loading({
      message: '上传中...',
      forbidClick: true,
      duration: 0,
    })
    // 保存信息
    let uploadData = {
      cover_img: '',
      video_url: '',
      title,
      duration: 0
    }
    let coverFormData = new FormData()
    coverFormData.append('videoCover', values.cover_img[0].file)
    // 上传封面
    updateImage('videoCover', coverFormData).then((res: any) => {
      if (res.status) {
        Toast.clear()
        Toast.fail(res.msg)
      } else {
        uploadData.cover_img = res.url

        let videoFormData = new FormData()
        videoFormData.append('video', videoInfo)
        // 获取视频时长
        let url = URL.createObjectURL(videoInfo);//获取录音时长
        let audioElement = new Audio(url);//audio也可获取视频的时长
        audioElement.addEventListener("loadedmetadata", function (_event) {
          uploadData.duration = audioElement.duration;
          // 上传视频
          updateImage('video', videoFormData).then((res: any) => {
            if (res.status) {
              Toast.clear()
              Toast.fail(res.msg)
            } else {
              uploadData.video_url = res.url
              // 插入数据
              pubVideo({
                title: uploadData.title,
                cover_img: uploadData.cover_img,
                video_url: uploadData.video_url,
                duration: uploadData.duration,
              }).then((res: any) => {
                if (res.status) {
                  Toast.clear()
                  Toast.fail(res.msg)
                } else {
                  Toast.success('上传成功')
                  setTimeout(() => {
                    router(-1)
                  }, 2000);
                }
              })
            }
          })
        });

      }

    })
  }

  return (
    <div id='PubVideoView'>
      <NavBar
        title="发布视频"
        onClickLeft={() => router(-1)}
      />
      <div style={{ padding: ' 1.5vw 3vw' }}>
        <Form
          colon
          form={form}
          onFinish={onFinish}
          footer={
            <div style={{ margin: '5vw 5vw 0' }}>
              <Button round nativeType='submit' type='primary' block>
                提交
              </Button>
            </div>
          }
        >
          <Form.Item
            labelWidth='20vw'
            name='title'
            label='标题'
            rules={[{ required: true, message: '请输入视频标题' }]}>
            <Input.TextArea placeholder='请输入视频标题，长度不能超过40个字符' rows={3} autoSize maxLength={40} showWordLimit />
          </Form.Item>
          <Form.Item
            labelWidth='20vw'
            name='cover_img'
            label='封面'
            rules={[{ required: true, message: '请选择视频封面' }]}
          >
            <Uploader
              maxSize={1000 * 1024}
              onOversize={() => Toast.info('图片大小不能超过1MB')}
              maxCount={1} />
          </Form.Item>
          <Form.Item
            labelWidth='20vw'
            name='video'
            label='视频'
          >
            <div className='videoUploadClass'>
              <Uploader
                uploadIcon={<Live />}
                maxSize={10000 * 1024}
                accept='.mp4,.avi'
                maxCount={1}
                onChange={(e: any) => videoInfo = e[0].file}
                onOversize={() => Toast.info('视频大小不能超过10MB')}
                previewCoverRender={(
                  item // 自定义预览内容
                ) => <video controls className='previewVideo' src={item.url}></video>}
              />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
