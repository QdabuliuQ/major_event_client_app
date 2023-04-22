import React, { Suspense } from 'react';
import './App.css';
import { useRoutes } from "react-router-dom";
import { RouterGurad } from "@/router/routerGurad";
import route from "@/router/index";
import LoadingView from "@/components/loadingView/loadingView";
import ReportSheet from "@/components/reportSheet/reportSheet";

function App() {
  // const element = useRoutes(route)
  
  return (
    <div id="App">
      <Suspense fallback={<LoadingView/ >}>
        { RouterGurad(route) }
      </Suspense>
      <ReportSheet/>
    </div>
  );
}

export default App;
