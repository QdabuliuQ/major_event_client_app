import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Toast, Slider } from 'react-vant';
import { Play, WarnO } from '@react-vant/icons';
import VideoInfo from "../videoInfo/videoInfo";
import VideoBtn from "../videoBtn/videoBtn"
import "./videoContent.less"

interface IProps {
  id: string
  video_url: string
  user_id: string
  user_pic: string
  praise_count: number
  comment_count: number
  collect_count: number
  title: string
  nickname: string
  time: number
  duration: number
  isPlay: boolean
  is_praise: number
  is_collect: number
}

export default function VideoContent(props: IProps) {
  const router = useNavigate()

  // let race = 0
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playState, setPlayState] = useState(true)
  const [race, setRace] = useState(0)
  const [tRace, setTRace] = useState(0)
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(true)
  const [allLength, setAllLength] = useState('')
  const [nowLength, setNowLength] = useState('00:00')
  

  function getTimes(t: number) {
    let m: any = parseInt(t / 60 % 60 as any)
    let s: any = parseInt(t % 60 as any)
    //三元表达式 补零 如果小于10 则在前边进行补零 如果大于10 则不需要补零
    m = m < 10 ? '0' + m : m
    s = s < 10 ? '0' + s : s
    return `${m}:${s}`
  }
  const onChangeAfter = (e: number) => {
    (videoRef.current as HTMLVideoElement).currentTime = e * race
  }
  const onChange = (e: number) => {
    // console.log(e);
    setValue(e)
    setNowLength(getTimes(e * race))
    
  }
  // 开始拖动进度条
  const onDragStart = () => {
    setVisible(false)
  }
  // 结束拖动进度条
  const onDragEnd = () => {
    setVisible(true)
  }
  // 监听视频播放
  const onTimeUpdate = () => {
    if(videoRef && visible) {
      setValue(tRace * (videoRef.current as HTMLVideoElement).currentTime)
    }
  }
  // 监听视频缓存加载
  const onWaiting = () => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'ball',
    })
  }
  // 监听视频缓存加载
  const onCanPlay = () => {
    Toast.clear()
  }

  useEffect(() => {
    setAllLength(getTimes(props.duration))

    setRace(props.duration / 100)
    setTRace(100 / props.duration)
    if (props.isPlay) {
      setPlayState(true)
      videoRef.current?.play()
    } else {
      (videoRef.current as HTMLVideoElement).currentTime = 0
      videoRef.current?.pause()
    }

    return () => {
      videoRef.current?.removeEventListener('timeupdate', onTimeUpdate)
    }
  }, [props.duration, props.isPlay])

  return (
    
    <div onClick={() => {
      let p = !playState
      if(p) {
        videoRef.current?.play()
      } else {
        videoRef.current?.pause()
      }
      setPlayState(!playState)
    }} id='VideoContent'>
      
      <div style={{opacity: playState ? '0' : '1'}} className='icon'>
        <Play fontSize={80} />
      </div>
      <VideoInfo
        user_id={props.user_id}
        visible={visible}
        nickname={props.nickname}
        title={props.title}
        time={props.time}
      />
      <VideoBtn
        video_id={props.id}
        is_praise={props.is_praise}
        is_collect={props.is_collect}
        visible={visible}
        user_id={props.user_id}
        avatar={props.user_pic}
        praise_count={props.praise_count}
        comment_count={props.comment_count}
        collect_count={props.collect_count} />
      <div className='videoContainer'>
        <video onWaiting={onWaiting} onCanPlay={onCanPlay} onTimeUpdate={onTimeUpdate} muted loop ref={videoRef} autoPlay src={props.video_url}></video>
      </div>
      <div style={{opacity: visible ? 0 : 1}} className='timeMask'>
        <span style={{color: '#409eff'}}>{nowLength} </span> <label style={{margin: '0 4px'}}>/</label> <span>{allLength}</span>
      </div>
      <div className='sliderContainer'>
        <Slider
          button={<div className='sliderBtn'></div>}
          value={value}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onChange={(e: any) => onChange(e)}
          onChangeAfter={onChangeAfter} />
      </div>
    </div>
  )
}
