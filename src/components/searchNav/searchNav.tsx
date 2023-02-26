import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Search, ArrowLeft } from '@react-vant/icons'
import { useNavigate } from 'react-router-dom'
import "./searchNav.less"

interface IProps {
  back?: boolean

  onKeyup: (key: string) => void
}

const SearchNav = forwardRef((props: IProps, ref: any) => {
  const router = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    setKey: (key: string) => {
      (inputRef.current as HTMLInputElement).value = key
    }
  }));

  return (
    <div id='SearchNav'>
      {
        props.back && (
          <div onClick={() => router(-1)} className='backBtn'>
            <ArrowLeft color='#fff' fontSize={23} />
          </div>
        )
      }
      <div className='navInput'>
        <Search style={{ position: 'relative', top: '1px' }} fontSize='15px' />
        <input ref={inputRef} onKeyUp={(e) => e.keyCode === 13 && props.onKeyup((inputRef.current as HTMLInputElement).value)} type="text" placeholder='搜索相关文章内容' />
      </div>
      <div className='navBtn'>
        <div onClick={() => router('/pubArticle')} className='btnContent'>
          <img src={require('@/assets/images/plus.png')} alt="" />
          <span>发布</span>
        </div>
      </div>
    </div>
  )
})

export default SearchNav
