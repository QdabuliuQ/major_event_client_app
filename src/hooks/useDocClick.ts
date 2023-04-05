import { useEffect, useState } from "react";

function useDocClick(docClickCb: Function) {
  const cbFn: any = docClickCb

  useEffect(() => {
    document.addEventListener('click', cbFn)

    return () => {
      document.removeEventListener('click', cbFn)
    }
  }, [])
}

export {
  useDocClick
}