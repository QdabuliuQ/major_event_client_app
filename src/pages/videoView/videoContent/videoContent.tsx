import React, { useEffect, useRef, useState } from 'react'
import { Slider } from 'react-vant';
import { Play } from '@react-vant/icons';
import VideoRightInfo from "../videoRightInfo/videoRightInfo";
import VideoLeftBtn from "../videoLeftBtn/videoLeftBtn"
import "./videoContent.less"

interface IProps {
  video_url: string
  user_id?: string
  avatar: string
  praise_count: number
  comment_count: number
  collect_count: number
  title: string
  nickname: string
  time: number
  length: number
  isPlay: boolean
}

export default function VideoContent(props: IProps) {
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
    // console.log(videoRef.current?.currentTime);
    setValue(tRace * (videoRef.current as HTMLVideoElement).currentTime)
    
  }

  useEffect(() => {
    setAllLength(getTimes(props.length))

    setRace(props.length / 100)
    setTRace(100 / props.length)
    if (props.isPlay) {
      videoRef.current?.play()
    } else {
      (videoRef.current as HTMLVideoElement).currentTime = 0
      videoRef.current?.play()
    }

  }, [props.length, props.isPlay])

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
      <VideoRightInfo
        visible={visible}
        nickname={props.nickname}
        title={props.title}
        time={props.time}
      />
      <VideoLeftBtn
        visible={visible}
        avatar={props.avatar}
        praise_count={props.praise_count}
        comment_count={props.comment_count}
        collect_count={props.collect_count} />
      <video onTimeUpdate={onTimeUpdate} muted loop ref={videoRef} autoPlay src={props.video_url}></video>
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
