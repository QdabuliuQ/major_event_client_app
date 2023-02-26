import { useRef, forwardRef, useImperativeHandle } from 'react'
import "./scrollList.less"

interface IProps {
  children?: any 
  sourceData?: any[],
  renderItem?: any,
  hasMore?: boolean,
  cb?: () => void
  height: number | string
}

const ScrollList = forwardRef((props: IProps, ref: any) => {
  let timer: any = null
  const scrollRef: any = useRef<HTMLDivElement>(null)
  useImperativeHandle(ref, () => ({
    toTop: () => {
      scrollRef.current.scrollTop = 0
    }
  }));

  const handleScroll = () => {
    // 没有更多的时候 滚动不需要计算高度加载更多。
    if (!props.hasMore) {
      return
    }
    const sr = scrollRef.current // scroll 最外层元素
    const sh = sr.scrollHeight
    const ch = sr.clientHeight
    const st = sr.scrollTop
    // 
    if (st != 0 && sh - (st + 10) <= ch) {
      
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        // 加载更多
        props.cb && props.cb()
      }, 200);
    }
  }

  return (
    <div style={{height: typeof props.height == 'number' ? props.height+'px' : props.height}} className='scroll-container' ref={scrollRef} onScroll={handleScroll}>
      {
        props.children != 0 ? props.children : ''
      }
      {
        props.sourceData && props.sourceData.map(props.renderItem)
      }
    </div>
  )
})


export default ScrollList