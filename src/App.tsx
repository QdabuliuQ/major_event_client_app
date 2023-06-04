import React, { Suspense, useEffect, useState } from 'react';
import './App.css';
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import route from "@/router/index";
import ReportSheet from '@/components/reportSheet/reportSheet';
import LoadingView from "@/components/loadingView/loadingView";

function App() {
  const element = useRoutes(route)
  const router = useNavigate()
  const location = useLocation()

  const isMobile = () => {
    let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
  }

  // 监听路由变化
  useEffect(() => {
    // 如果不是移动设备则 跳转到错误页面
    console.log(location.pathname);
    
    if(location.pathname != '/error' && !isMobile()) {
      router('/error')
    }
  }, [location.pathname])

  return (
    <div id="App">
      <ReportSheet />
      <Suspense fallback={<LoadingView/ >}>
        { element }
      </Suspense>
    </div>
  );
}

export default App;
