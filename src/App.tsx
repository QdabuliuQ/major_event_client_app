import React, { Suspense } from 'react';
import './App.css';
import { useRoutes } from "react-router-dom";
import route from "@/router/index";
import LoadingView from "@/components/loadingView/loadingView";

function App() {
  const element = useRoutes(route)
  
  return (
    <div id="App">
      
      <Suspense fallback={<LoadingView/ >}>
        { element }
      </Suspense>
    </div>
  );
}

export default App;
