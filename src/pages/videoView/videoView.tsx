import React from 'react'
import { Swiper } from 'react-vant';
import VideoNav from "./videoNav/videoNav";
import VideoContent from "./videoContent/videoContent";
import "./videoView.less"

export default function VideoView() {
  return (
    <div id='VideoView'>
      <VideoNav />
      <Swiper indicator={false} loop={false} vertical style={{ height: '100%' }}>
        <Swiper.Item>
          <VideoContent 
            length={30.5}
            nickname={'喵喵喵'}
            title={'视频标题~~~'}
            time={1675604402401}
            avatar={'http://127.0.0.1:8080/avatars/1674183958198.jpg'}
            praise_count={1241}
            comment_count={532}
            collect_count={612}
            video_url={'http://vjs.zencdn.net/v/oceans.mp4'} />
        </Swiper.Item>
        <Swiper.Item>
          <VideoContent 
            length={30.5}
            nickname={'喵喵喵'}
            title={'视频标题~~~'}
            time={1675604402401}
            avatar={'http://127.0.0.1:8080/avatars/1674183958198.jpg'}
            praise_count={241}
            comment_count={132}
            collect_count={62}
            video_url={'http://vjs.zencdn.net/v/oceans.mp4'} />
        </Swiper.Item>
      </Swiper>
    </div>
  )
}
