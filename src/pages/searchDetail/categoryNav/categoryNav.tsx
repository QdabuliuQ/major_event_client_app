import React from 'react'
import "./categoryNav.less"

interface IProps {
  title: string
  bottom?: string
}

export default function CategoryNav(props: IProps) {
  return (
    <div style={{marginBottom: props.bottom}} className='CategoryNav'>
      <span>{ props.title }</span>
    </div>
  )
}
