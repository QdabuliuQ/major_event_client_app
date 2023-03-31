import { useEffect, useState } from "react";

// 获取高度
function useGetHeight(els?: string[]) {
  const [height, setHeight] = useState(document.documentElement.clientHeight)

  useEffect(() => {
    let screenHeight = document.documentElement.clientHeight
    if(els) {
      for(let item of els) {
        screenHeight -= document.querySelector(item)?.clientHeight ?? 0
      }
      setHeight(screenHeight);
    }
  }, [])
  return height
}

export {
  useGetHeight
}