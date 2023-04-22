import React, { useRef } from 'react'
import { useRouter } from '@/hooks/useRouter'
import { Input, NavBar, Toast, Uploader } from 'react-vant'
import { fileType } from '@/utils/tools'
import { updateImage } from '@/network/editProfileView/editProfileView'
import { pubEvent } from '@/network/pubEventView/pubEventView'
import { useSelector } from 'react-redux'
import ArticleItem from "@/components/replyCom/articleItem/articleItem";
import VideoItem from "@/components/replyCom/videoItem/videoItem";
import ReplyItem from '@/components/replyCom/replyItem/replyItem'
import "./pubEventView.less"


export default function PubEventView() {
  const info = useSelector((state: any) => state.event)
  const { router } = useRouter()
  
  let images: any = [], eventType = info ? info.type : '1', input = ''
  let resourceData = eventType == '4' ? info.resource_info.type == '4' ? info.resource_info.resource_info : info.resource_info : null
  
  let timer: any = null, flag = true
  // 上传监听回调
  const uploadEvent = (e: any) => {
    images = e
  }
  // 输入回调
  const onChange = (e: any) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      input = e
    }, 200);
  }

  // 检测图片类型
  const checkFileType = () => {
    for (let item of images) {
      if (fileType(item.file.name) != 'image') return false
    }
    return true
  }

  // 转为FormData格式
  const getImageFormData = () => {
    let files = new FormData()
    for (let item of images) {
      files.append('event', item.file)
    }
    return files
  }

  const uploadImage = (): any => {
    return new Promise((resolve, reject) => {
      if (images.length) {
        updateImage('eventImage', getImageFormData()).then(res => {
          resolve(JSON.stringify(res.data.url))
        }).catch(err => {
          reject(err)
        })
      } else {
        resolve('')
      }
    })
  }
  const uploadInfo = (content: string, images: string, resource_id: string) => {
    pubEvent({
      type: eventType,
      content,
      images,
      resource_id
    }).then((res: any) => {
      if (res.status) return Toast.fail('提交失败')
      Toast.success('提交成功')
      setTimeout(() => {
        router(-1)
      }, 1500);
    })
  }

  // 提交信息
  const submitInfo = async () => {
    if (flag) {
      flag = false
      let val = input.trim()
      // 检测图片类型
      if (checkFileType()) {
        let imagUrl = await uploadImage()
        // 文本类型  文本和图片不能都为空
        if (eventType == '1') {
          if (imagUrl == '' && !val.length) {
            return Toast.fail('请输入内容')
          }
          uploadInfo(val, imagUrl, '')
        } else if(eventType != '4') {
          uploadInfo(val, imagUrl, info.resource_info.id)
        } else {
          uploadInfo(val, imagUrl, resourceData.ev_id)
        }
      } else {
        Toast.fail('图片格式错误')
        flag = true
      }
    }

  }

  return (
    <div id='PubEventView'>
      <NavBar
        title="发布动态"
        fixed
        placeholder
        rightText="提交"
        onClickLeft={() => router(-1)}
        onClickRight={submitInfo}
      />
      <div className='eventContainer'>
        <Input.TextArea
          onChange={onChange}
          placeholder="说点什么吧~"
          maxLength={200}
          showWordLimit />
        <div className='imageContainer'>
          <Uploader
            multiple
            onChange={uploadEvent}
            maxCount={9}
            maxSize={500 * 1024}
            onOversize={() => Toast.info('图片大小不能超过500kb')}
          />
        </div>
        {
          eventType == '2' ? (
            <ArticleItem
              cover_img={info.resource_info.cover_img}
              title={info.resource_info.title}
              pub_date={info.resource_info.pub_date}
              content={info.resource_info.content}
              id={info.resource_info.id}
            />
          ) : eventType == '3' ? <VideoItem
            cover_img={info.resource_info.cover_img}
            title={info.resource_info.title}
            time={info.resource_info.time}
            id={info.resource_info.id}
          /> : eventType == '4' ? <ReplyItem
            {...resourceData}
          /> : ''
        }
      </div>
    </div>
  )
}
