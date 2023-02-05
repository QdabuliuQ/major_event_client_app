import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import moment from "moment";
import 'lib-flexible'; 
import './index.css';
import App from './App';

moment.defineLocale('zh-cn', {
  relativeTime: {
      future: '%s内',
      past: '%s前',
      s: '几秒',
      m: '1分钟',
      mm: '%d分钟',
      h: '1小时',
      hh: '%d小时',
      d: '1天',
      dd: '%d天',
      M: '1个月',
      MM: '%d个月',
      y: '1年',
      yy: '%d年'
  },
});
(React as any).$moment = moment

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
