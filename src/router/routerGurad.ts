import { Toast } from "react-vant";
import { useEffect } from "react";
import {
  useLocation,
  useRoutes,
  Location,
  useNavigate,
  NavigateFunction,
} from "react-router-dom";

interface RouteObject {
  token: any;
  caseSensitive?: boolean;
  children?: RouteObject[];
  element?: React.ReactNode;
  index?: boolean;
  path?: string;
  auth?: boolean;
}

//递归查询对应的路由
export function searchroutedetail(
  paths: string[],
  idx: number,
  routes: RouteObject[]
): RouteObject | null {
  for (let item of routes) {
    if (item.path === paths[idx]) {
      if(item.children) {
        return searchroutedetail(paths, idx+1, item.children);
      } else {
        return item
      }
    }
  }
  return null;
}

// 判断是移动设备还是pc
function isMobile() {
  let flag = navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  return flag;
}

//全局路由守卫
function guard(
  location: Location,
  navigate: NavigateFunction,
  routes: RouteObject[]
) {
  
  if(!isMobile()) navigate("/error");
  const { pathname } = location;
  let paths = pathname.slice(1).split('/')
  paths[0] = '/' + paths[0]
  
  //找到对应的路由信息
  const routedetail = searchroutedetail(paths, 0, routes);
  
  //没有找到路由，跳转错误页面
  if (!routedetail) {
    navigate("/404");
    return false;
  }
  
  //如果需要权限验证
  if (!routedetail.token) {
    const token = localStorage.getItem("token");
    if (!token) {
      Toast.fail('请登录')
      navigate(-1);
      return false;
    }
  }
  return true;
}

export const RouterGurad = (routes: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    guard(location, navigate, routes);
  }, [location, navigate, routes]);
  // document.documentElement.scrollTo(0, 0);
  const Route = useRoutes(routes);
  return Route;
};