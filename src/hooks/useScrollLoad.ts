import { useEffect } from "react";



const scrollLoad = () => {

  const scrollEvent = () => {
  
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollEvent)
  }, [])

  return () => {
    window.removeEventListener('scroll', scrollEvent)
  }
}

export default scrollLoad